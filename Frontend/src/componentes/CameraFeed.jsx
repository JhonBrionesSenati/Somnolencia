"use client"

import { useRef, useState, useEffect } from "react"

const CameraFeed = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [eventos, setEventos] = useState([])
  const [lastEventTime, setLastEventTime] = useState({})

  // Función para reproducir sonido único para todos los eventos
  const playAlertSound = (evento) => {
    // Evitar spam de sonidos (mínimo 2 segundos entre eventos)
    const now = Date.now()
    if (lastEventTime[evento] && now - lastEventTime[evento] < 2000) {
      return
    }

    setLastEventTime((prev) => ({ ...prev, [evento]: now }))

    // Un solo sonido para todos los eventos
    const audio = new Audio("/sounds/alert.mp3")
    audio.volume = 0.8
    audio.play().catch((err) => {
      console.log("Error al reproducir sonido:", err)
    })
  }

  // Encender cámara
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraOn(true)
      }
    } catch (err) {
      console.error("Error al encender la cámara:", err)
    }
  }

  // Apagar cámara
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsCameraOn(false)
    }
  }

  // Capturar frame de video como base64
  const captureFrame = () => {
    const video = videoRef.current
    if (!video || video.videoWidth === 0) return null

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL("image/jpeg")
  }

  // Enviar frame al backend
  const sendFrameToBackend = async () => {
    const frame = captureFrame()
    if (!frame) return

    const base64Clean = frame.replace(/^data:image\/\w+;base64,/, "")

    try {
      const res = await fetch("https://somnolencia.onrender.com/api/deteccion/fatiga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Clean }),
      })

      const data = await res.json()
      if (data.status === "ok") {
        // Mostrar imagen procesada en el canvas
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
        }
        img.src = `data:image/jpeg;base64,${data.image}`

        // Guardar eventos y reproducir sonidos
        if (data.eventos) {
          const eventosConTiempo = data.eventos.map((e) => ({
            nombre_evento: e,
            timestamp: new Date().toLocaleTimeString(),
          }))
          setEventos(eventosConTiempo)

          // 🔊 REPRODUCIR SONIDO ÚNICO PARA CADA EVENTO
          data.eventos.forEach((evento) => {
            playAlertSound(evento)
          })
        }
      }
    } catch (err) {
      console.error("Error al enviar frame al backend:", err)
    }
  }

  // Intervalo para enviar frames cada 500ms
  useEffect(() => {
    let intervalId
    if (isCameraOn) {
      intervalId = setInterval(sendFrameToBackend, 500)
    }
    return () => clearInterval(intervalId)
  }, [isCameraOn])

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-slate-600">
      {/* Header simplificado */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Monitor de Fatiga en Vivo
        </h2>
        <p className="text-slate-400">Sistema de detección inteligente activado</p>
      </div>

      {/* Video oculto para capturar frames */}
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

      {/* Canvas principal con diseño mejorado */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-96 bg-gradient-to-br from-slate-900 to-black border-2 border-slate-600 rounded-xl shadow-inner"
        />

        {/* Overlay de estado */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isCameraOn ? "bg-green-400 animate-pulse" : "bg-red-400"}`}></div>
          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            {isCameraOn ? "EN VIVO" : "DESCONECTADO"}
          </span>
        </div>

        {/* Indicador de audio */}
        <div className="absolute top-4 right-4">
          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full flex items-center space-x-2">
            <span className="text-green-400">🔊</span>
            <span>Audio Activo</span>
          </span>
        </div>
      </div>

      {/* Controles principales */}
      <div className="flex justify-center items-center mb-6">
        {!isCameraOn ? (
          <button
            onClick={startCamera}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-xl hover:shadow-green-500/25 hover:scale-105 transform"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-700 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Encender Cámara</span>
            </span>
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-rose-600 rounded-full shadow-xl hover:shadow-red-500/25 hover:scale-105 transform"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700 to-rose-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              <span>Apagar Cámara</span>
            </span>
          </button>
        )}
      </div>

      {/* Panel de eventos */}
      <div className="bg-gradient-to-br from-slate-900 to-black p-6 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>Eventos Detectados</span>
        </h3>

        {eventos.length > 0 ? (
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {eventos.map((evento, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-lg border-l-4 ${
                  evento.nombre_evento === "OJOS CERRADOS"
                    ? "bg-red-900/30 border-red-400 text-red-100"
                    : evento.nombre_evento === "BOCA ABIERTA"
                      ? "bg-yellow-900/30 border-yellow-400 text-yellow-100"
                      : evento.nombre_evento === "MANO A LA BOCA"
                        ? "bg-orange-900/30 border-orange-400 text-orange-100"
                        : "bg-gray-900/30 border-gray-400 text-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{evento.nombre_evento}</span>
                  <span className="text-sm opacity-75">{evento.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-slate-500 text-6xl mb-4">😴</div>
            <p className="text-slate-400">No hay eventos detectados aún</p>
            <p className="text-slate-500 text-sm mt-2">El sistema está monitoreando...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CameraFeed
