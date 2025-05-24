# routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.detection_service import procesar_imagen_base64
import time

router = APIRouter()

class ImagenEntrada(BaseModel):
    image: str

@router.post("/deteccion/fatiga")
def detectar_fatiga(payload: ImagenEntrada):
    try:
        inicio = time.time()
        imagen_resultado, eventos = procesar_imagen_base64(payload.image)
        fin = time.time()
        print(f"Procesamiento total: {fin - inicio:.2f} segundos")

        return {
            "status": "ok",
            "image": imagen_resultado,
            "eventos": eventos
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
