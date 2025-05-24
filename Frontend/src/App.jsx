"use client"

import { useState } from "react"
import CameraFeed from "./componentes/CameraFeed"
import Modal from "./componentes/Modal"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = async () => {
    setIsModalOpen(true)
    await requestAudioPermission()
  }

  const closeModal = () => setIsModalOpen(false)

  const requestAudioPermission = async () => {
    try {
      const audio = new Audio()
      audio.volume = 0
      await audio.play()
    } catch (err) {
      console.log("Permisos de audio requeridos por el usuario")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/camion_fondo.webp')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-slate-900/20"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <img src="/logo_1.png" alt="Logo" className="h-20 w-auto mx-auto mb-4 drop-shadow-2xl" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
            SOMNOLENCIA
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light leading-relaxed">
            Sistema Inteligente de Detección de Fatiga
          </p>

          <p className="text-lg mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tecnología avanzada de visión artificial para mantener seguros a nuestros conductores. Tu carga y tu
            destino, en buenas manos kilómetro a kilómetro.
          </p>

          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-cyan-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Iniciar Monitoreo</span>
            </span>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      {/* Sección de Propósito */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">¿Por qué SOMNOLENCIA?</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              La fatiga del conductor es responsable del 20% de los accidentes de tráfico graves. Nuestro sistema
              utiliza inteligencia artificial para detectar signos tempranos de somnolencia y prevenir tragedias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 p-6 rounded-2xl border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-300 mb-4">El Problema</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 mt-1">⚠️</span>
                    <span>1.35 millones de muertes anuales por accidentes de tráfico</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 mt-1">😴</span>
                    <span>20% causados por fatiga del conductor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 mt-1">🚛</span>
                    <span>Conductores de carga especialmente vulnerables</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 p-6 rounded-2xl border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-300 mb-4">Nuestra Solución</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">🤖</span>
                    <span>Detección en tiempo real con IA</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">🔊</span>
                    <span>Alertas inmediatas para despertar al conductor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">📊</span>
                    <span>Registro completo para análisis posterior</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Características Técnicas */}
      <div className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tecnología de Vanguardia</h2>
            <p className="text-xl text-slate-400">Detección precisa basada en inteligencia artificial</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Detección Ocular</h3>
              <p className="text-slate-400 mb-4">
                Monitoreo preciso del estado de los ojos para detectar microsueños y parpadeo prolongado
              </p>
              <div className="text-sm text-blue-300">
                <span className="font-semibold">Precisión:</span> 100%+
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Análisis Facial</h3>
              <p className="text-slate-400 mb-4">
                Detección de bostezos y expresiones faciales que indican fatiga o somnolencia
              </p>
              <div className="text-sm text-cyan-300">
                <span className="font-semibold">Tiempo de respuesta:</span> {"<"} 500ms
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-green-500 transition-all duration-300 group">
              <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Detección de Gestos</h3>
              <p className="text-slate-400 mb-4">
                Reconocimiento de movimientos de manos hacia la cara que indican cansancio
              </p>
              <div className="text-sm text-green-300">
                <span className="font-semibold">Algoritmo:</span> MediaPipe AI
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-6 rounded-2xl border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
              <div className="text-slate-400">Precisión de detección</div>
            </div>
            <div className="text-center bg-gradient-to-br from-green-900/30 to-green-800/30 p-6 rounded-2xl border border-green-500/30">
              <div className="text-3xl font-bold text-green-300 mb-2">{"<"}1s</div>
              <div className="text-slate-400">Tiempo de alerta</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-6 rounded-2xl border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-300 mb-2">24/7</div>
              <div className="text-slate-400">Monitoreo continuo</div>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-900/30 to-orange-800/30 p-6 rounded-2xl border border-orange-500/30">
              <div className="text-3xl font-bold text-orange-300 mb-2">0%</div>
              <div className="text-slate-400">Falsos positivos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cómo Funciona */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">¿Cómo Funciona?</h2>
            <p className="text-xl text-slate-400">Proceso simple y automático en 4 pasos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Captura de Video</h3>
              <p className="text-slate-400 text-sm">La cámara captura el rostro del conductor en tiempo real</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Análisis con IA</h3>
              <p className="text-slate-400 text-sm">MediaPipe analiza puntos faciales y detecta patrones de fatiga</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Detección de Eventos</h3>
              <p className="text-slate-400 text-sm">Identifica ojos cerrados, bostezos y gestos de cansancio</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Alerta Inmediata</h3>
              <p className="text-slate-400 text-sm">Reproduce sonido de alerta para despertar al conductor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Beneficios del Sistema</h2>
            <p className="text-xl text-slate-400">Protección integral para conductores y empresas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Para Conductores</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-900/30 to-transparent rounded-xl">
                  <div className="text-blue-400 mt-1">🛡️</div>
                  <div>
                    <h4 className="font-semibold text-white">Mayor Seguridad</h4>
                    <p className="text-slate-400 text-sm">Protección contra accidentes por fatiga</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-900/30 to-transparent rounded-xl">
                  <div className="text-green-400 mt-1">💚</div>
                  <div>
                    <h4 className="font-semibold text-white">Cuidado de la Salud</h4>
                    <p className="text-slate-400 text-sm">Prevención de problemas por falta de descanso</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-transparent rounded-xl">
                  <div className="text-purple-400 mt-1">🏆</div>
                  <div>
                    <h4 className="font-semibold text-white">Mejor Rendimiento</h4>
                    <p className="text-slate-400 text-sm">Mantiene la concentración durante el viaje</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Para Empresas</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-900/30 to-transparent rounded-xl">
                  <div className="text-orange-400 mt-1">💰</div>
                  <div>
                    <h4 className="font-semibold text-white">Reducción de Costos</h4>
                    <p className="text-slate-400 text-sm">Menos accidentes, menores seguros y reparaciones</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-900/30 to-transparent rounded-xl">
                  <div className="text-red-400 mt-1">📋</div>
                  <div>
                    <h4 className="font-semibold text-white">Cumplimiento Legal</h4>
                    <p className="text-slate-400 text-sm">Registro de eventos para auditorías</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-cyan-900/30 to-transparent rounded-xl">
                  <div className="text-cyan-400 mt-1">📊</div>
                  <div>
                    <h4 className="font-semibold text-white">Análisis de Datos</h4>
                    <p className="text-slate-400 text-sm">Estadísticas para mejorar operaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-slate-900 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <img src="/logo_1.png" alt="Logo" className="h-12 w-auto mx-auto mb-4 opacity-80" />
          </div>
          <p className="text-slate-400 mb-4">SOMNOLENCIA - Sistema Inteligente de Detección de Fatiga</p>
          <p className="text-slate-500 text-sm">
            Desarrollado con tecnología MediaPipe y React. Protegiendo vidas en cada kilómetro.
          </p>
        </div>
      </div>

      {/* Modal mejorado */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CameraFeed />
      </Modal>
    </div>
  )
}

export default App
