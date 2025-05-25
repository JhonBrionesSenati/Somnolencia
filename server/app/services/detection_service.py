import cv2
import mediapipe as mp
import numpy as np
import base64
from app.utils.image_utils import decode_base64_to_image, encode_image_to_base64
from app.models.evento_model import registrar_evento
from mediapipe.python.solutions.drawing_utils import draw_landmarks, DrawingSpec
from mediapipe.python.solutions.drawing_styles import get_default_face_mesh_tesselation_style, get_default_hand_connections_style

mp_face_mesh = mp.solutions.face_mesh.FaceMesh(refine_landmarks=True)
mp_hands = mp.solutions.hands.Hands()

# ÍNDICES de landmarks relevantes
OJOS = [159, 145]  # superior e inferior ojo izquierdo
BOCA = [13, 14]    # superior e inferior boca
MANO = [8, 0]      # dedo índice y muñeca

# NUEVOS ÍNDICES para inclinación de cabeza
SIEN_IZQUIERDA_REF = 454
SIEN_DERECHA_REF = 234  


def calcular_distancia(p1, p2):
    return np.linalg.norm(np.array(p1) - np.array(p2))

def procesar_imagen_base64(base64_str):
    eventos = []
    frame = decode_base64_to_image(base64_str)
    if frame is None:
        raise ValueError("No se pudo decodificar la imagen.")

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_results = mp_face_mesh.process(rgb)
    hand_results = mp_hands.process(rgb)

    height, width = frame.shape[:2]

    face_landmarks_detected = None

    if face_results.multi_face_landmarks:
        for face_landmarks in face_results.multi_face_landmarks:
            face_landmarks_detected = face_landmarks 
            # Dibuja puntos en el rostro
            draw_landmarks(
                image=frame,
                landmark_list=face_landmarks,
                connections=mp.solutions.face_mesh.FACEMESH_TESSELATION,
                landmark_drawing_spec=None,
                connection_drawing_spec=get_default_face_mesh_tesselation_style()
            )

            landmarks = face_landmarks.landmark
            ojo_sup = (int(landmarks[OJOS[0]].x * width), int(landmarks[OJOS[0]].y * height))
            ojo_inf = (int(landmarks[OJOS[1]].x * width), int(landmarks[OJOS[1]].y * height))
            boca_sup = (int(landmarks[BOCA[0]].x * width), int(landmarks[BOCA[0]].y * height))
            boca_inf = (int(landmarks[BOCA[1]].x * width), int(landmarks[BOCA[1]].y * height))

            d_ojo = calcular_distancia(ojo_sup, ojo_inf)
            d_boca = calcular_distancia(boca_sup, boca_inf)


            if d_ojo < 10:
                eventos.append("OJOS CERRADOS")
                registrar_evento("OJOS CERRADOS")

            if d_boca > 18:
                eventos.append("BOCA ABIERTA")
                registrar_evento("BOCA ABIERTA")

            # NUEVO Evento: BOSTEZO
            if d_boca > 30:
                eventos.append("BOSTEZO")
                registrar_evento("BOSTEZO")

            # NUEVO Evento: INCLINACION DE CABEZA
            sien_izquierda_y = landmarks[SIEN_IZQUIERDA_REF].y * height
            sien_derecha_y = landmarks[SIEN_DERECHA_REF].y * height
            
            diferencia_altura_sienes = abs(sien_izquierda_y - sien_derecha_y)
            
            if diferencia_altura_sienes > 25: 
                eventos.append("INCLINACION DE CABEZA")
                registrar_evento("INCLINACION DE CABEZA")

    if hand_results.multi_hand_landmarks:
        for hand_landmarks in hand_results.multi_hand_landmarks:
            draw_landmarks(
                image=frame,
                landmark_list=hand_landmarks,
                connections=mp.solutions.hands.HAND_CONNECTIONS,
                landmark_drawing_spec=DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                connection_drawing_spec=get_default_hand_connections_style()
            )
            
            if face_landmarks_detected:
                facial_landmarks_for_hands = face_landmarks_detected.landmark 
                
                idx_punta_dedo = (int(hand_landmarks.landmark[MANO[0]].x * width), int(hand_landmarks.landmark[MANO[0]].y * height))
                punto_referencia_boca = (int(facial_landmarks_for_hands[BOCA[0]].x * width), int(facial_landmarks_for_hands[BOCA[0]].y * height))
                
                d_mano_boca = calcular_distancia(idx_punta_dedo, punto_referencia_boca)
                if d_mano_boca < 40:
                    eventos.append("MANO A LA BOCA")
                    registrar_evento("MANO A LA BOCA")

    imagen_resultado = encode_image_to_base64(frame)
    return imagen_resultado, eventos
