"use client"

import { useRef, useState, useEffect } from "react"

const CameraFeed = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [eventos, setEventos] = useState([])
  const [lastEventTime, setLastEventTime] = useState({})
  const [ojosState, setOjosState] = useState({
    cerrados: false,
    tiempoInicio: null,
    duracion: 0,
  })

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
      // Resetear estado de ojos al apagar cámara
      setOjosState({
        cerrados: false,
        tiempoInicio: null,
        duracion: 0,
      })
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
      const res = await fetch("http://localhost:8000/api/deteccion/fatiga", {
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

        // Procesar eventos con lógica de tiempo para ojos cerrados
        if (data.eventos) {
          const now = Date.now()
          const eventosParaMostrar = []

          data.eventos.forEach((evento) => {
            if (evento === "OJOS CERRADOS") {
              // Lógica especial para ojos cerrados
              if (!ojosState.cerrados) {
                // Primera vez que detectamos ojos cerrados
                setOjosState({
                  cerrados: true,
                  tiempoInicio: now,
                  duracion: 0,
                })
              } else {
                // Ojos siguen cerrados, calcular duración
                const duracion = now - ojosState.tiempoInicio
                setOjosState((prev) => ({
                  ...prev,
                  duracion: duracion,
                }))

                // Solo agregar evento si han pasado 5 segundos (5000ms)
                if (duracion >= 5000) {
                  eventosParaMostrar.push(evento)
                  playAlertSound(evento)
                }
              }
            } else {
              // Para otros eventos, agregar normalmente
              eventosParaMostrar.push(evento)
              playAlertSound(evento)
            }
          })

          // Si no se detectaron ojos cerrados, resetear estado
          if (!data.eventos.includes("OJOS CERRADOS")) {
            setOjosState({
              cerrados: false,
              tiempoInicio: null,
              duracion: 0,
            })
          }

          // Solo mostrar eventos que pasaron la validación
          if (eventosParaMostrar.length > 0) {
            const eventosConTiempo = eventosParaMostrar.map((e) => ({
              nombre_evento: e,
              timestamp: new Date().toLocaleTimeString(),
            }))
            setEventos((prev) => [...eventosConTiempo, ...prev].slice(0, 10)) // Mantener solo los últimos 10
          }
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
  }, [isCameraOn, ojosState])

  // Función para obtener el estilo del evento
  const getEventStyle = (evento) => {
    switch (evento) {
      case "OJOS CERRADOS":
        return "bg-gradient-to-r from-red-50 to-red-25 border-red-500 text-red-900"
      case "BOCA ABIERTA":
        return "bg-gradient-to-r from-orange-50 to-orange-25 border-orange-500 text-orange-900"
      case "BOSTEZO":
        return "bg-gradient-to-r from-yellow-50 to-yellow-25 border-yellow-500 text-yellow-900"
      case "INCLINACION DE CABEZA":
        return "bg-gradient-to-r from-purple-50 to-purple-25 border-purple-500 text-purple-900"
      case "MANO A LA BOCA":
        return "bg-gradient-to-r from-teal-50 to-teal-25 border-teal-500 text-teal-900"
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-25 border-gray-500 text-gray-900"
    }
  }

  // Función para obtener el emoji del evento
  const getEventEmoji = (evento) => {
    switch (evento) {
      case "OJOS CERRADOS":
        return "👁️"
      case "BOCA ABIERTA":
        return "😮"
      case "BOSTEZO":
        return "🥱"
      case "INCLINACION DE CABEZA":
        return "🔄"
      case "MANO A LA BOCA":
        return "✋"
      default:
        return "⚠️"
    }
  }

  return (
    <div className="bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 p-4 md:p-6 rounded-3xl shadow-2xl w-full border-2 border-emerald-200">
      {/* Header más compacto */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2 tracking-tight">
          <span className="bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
            Monitor de Fatiga en Vivo
          </span>
        </h2>
        <p className="text-emerald-700 text-base md:text-lg font-semibold">
          Sistema de detección inteligente - 5 tipos de eventos
        </p>
      </div>

      {/* Video oculto para capturar frames */}
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

      {/* Canvas principal con diseño mejorado */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-48 md:h-80 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-50 border-3 border-emerald-300 rounded-2xl shadow-2xl"
          style={{
            boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.25), inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)",
          }}
        />

        {/* Overlay de estado más compacto */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex items-center space-x-2">
          <div
            className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${
              isCameraOn ? "bg-emerald-500 animate-pulse shadow-lg" : "bg-red-500 shadow-lg"
            }`}
          ></div>
          <span className="text-emerald-900 text-xs md:text-sm font-bold bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-emerald-200 shadow-lg">
            {isCameraOn ? "🟢 EN VIVO" : "🔴 DESCONECTADO"}
          </span>
        </div>

        {/* Indicador de audio más compacto */}
        <div className="absolute top-3 md:top-4 right-3 md:right-4">
          <span className="text-emerald-900 text-xs md:text-sm font-bold bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 border-2 border-emerald-200 shadow-lg">
            <span className="text-emerald-600 text-sm">🔊</span>
            <span className="hidden md:inline">Audio</span>
          </span>
        </div>

        {/* Indicador de estado de ojos más compacto */}
        {ojosState.cerrados && (
          <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4">
            <span className="text-red-900 text-xs md:text-sm font-bold bg-red-100/90 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-red-300 shadow-lg animate-pulse">
              👁️ {Math.floor(ojosState.duracion / 1000)}s
            </span>
          </div>
        )}

        {/* Contador de eventos más compacto */}
        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
          <span className="text-emerald-900 text-xs md:text-sm font-bold bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-emerald-200 shadow-lg">
            📊 {eventos.length}
          </span>
        </div>
      </div>

      {/* Controles principales más pequeños */}
      <div className="flex justify-center items-center mb-6">
        {!isCameraOn ? (
          <button
            onClick={startCamera}
            className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-500 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 rounded-full shadow-2xl hover:shadow-emerald-400/40 hover:scale-105 transform border-2 border-emerald-400/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center space-x-2 md:space-x-3">
              <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="tracking-wide">Encender Cámara</span>
            </span>
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full shadow-2xl hover:shadow-red-400/40 hover:scale-105 transform border-2 border-red-400/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center space-x-2 md:space-x-3">
              <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              <span className="tracking-wide">Apagar Cámara</span>
            </span>
          </button>
        )}
      </div>

      {/* Panel de eventos más compacto */}
      <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border-2 border-emerald-200 shadow-xl">
        <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-4 flex items-center space-x-2">
          <div className="bg-amber-100 p-2 rounded-full">
            <svg className="w-4 md:w-5 h-4 md:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <span>Eventos Detectados</span>
        </h3>

        {eventos.length > 0 ? (
          <div className="space-y-3 max-h-40 md:max-h-48 overflow-y-auto">
            {eventos.map((evento, index) => (
              <div
                key={index}
                className={`p-3 md:p-4 rounded-2xl shadow-xl border-l-4 transition-all duration-300 hover:scale-102 ${getEventStyle(
                  evento.nombre_evento,
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getEventEmoji(evento.nombre_evento)}</span>
                    <span className="font-bold text-sm md:text-base">{evento.nombre_evento}</span>
                  </div>
                  <span className="text-xs md:text-sm opacity-80 font-semibold bg-white/50 px-2 py-1 rounded-full">
                    {evento.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <p className="text-emerald-700 text-lg md:text-xl font-bold mb-2">No hay eventos detectados aún</p>
            <p className="text-emerald-600 text-base md:text-lg font-medium mb-3">El sistema está monitoreando...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CameraFeed
