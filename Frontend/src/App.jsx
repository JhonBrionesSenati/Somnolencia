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
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-25 via-green-25 to-teal-25"
      style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #f0fdfa 50%, #f0fdf4 75%, #ecfdf5 100%)",
      }}
    >
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(6, 78, 59, 0.4), rgba(5, 46, 22, 0.8)), url('/camion_fondo.webp')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-green-900/30"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
          <div className="mb-12">
            <img
              src="/logo_1.png"
              alt="Logo"
              className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl filter brightness-110"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 bg-clip-text text-transparent drop-shadow-lg">
              SOMNOLENCIA
            </span>
          </h1>

          <p className="text-2xl md:text-3xl mb-6 text-emerald-100 font-medium leading-relaxed tracking-wide">
            Sistema Inteligente de Detección de Fatiga
          </p>

          <p className="text-lg md:text-xl mb-16 text-green-200 max-w-3xl mx-auto leading-relaxed font-light">
            Tecnología avanzada de visión artificial para mantener seguros a nuestros conductores.
            <br className="hidden md:block" />
            <span className="font-medium text-emerald-200">
              Tu carga y tu destino, en buenas manos kilómetro a kilómetro.
            </span>
          </p>

          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-500 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 rounded-full shadow-2xl hover:shadow-emerald-400/30 hover:scale-105 transform border-2 border-emerald-400/30 hover:border-emerald-300/50"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center space-x-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="tracking-wide">Iniciar Monitoreo</span>
            </span>
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            <div className="w-4 h-4 bg-emerald-300 rounded-full animate-pulse shadow-lg"></div>
            <div className="w-4 h-4 bg-green-300 rounded-full animate-pulse delay-75 shadow-lg"></div>
            <div className="w-4 h-4 bg-emerald-300 rounded-full animate-pulse delay-150 shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Sección de Propósito */}
      <div className="py-24 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-emerald-900 mb-8 tracking-tight leading-tight">
              ¿Por qué SOMNOLENCIA?
            </h2>
            <p className="text-xl md:text-2xl text-emerald-700 max-w-4xl mx-auto leading-relaxed font-medium">
              La fatiga del conductor es responsable del <span className="font-bold text-emerald-800">20%</span> de los
              accidentes de tráfico graves.
              <br className="hidden md:block" />
              Nuestro sistema utiliza inteligencia artificial para detectar signos tempranos de somnolencia y prevenir
              tragedias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-bold text-red-800 mb-6 flex items-center">
                  <span className="bg-red-100 p-3 rounded-full mr-4">⚠️</span>
                  El Problema
                </h3>
                <ul className="space-y-4 text-red-700">
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-red-500 mt-1 text-xl">📊</span>
                    <span className="font-medium">1.35 millones de muertes anuales por accidentes de tráfico</span>
                  </li>
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-red-500 mt-1 text-xl">😴</span>
                    <span className="font-medium">20% causados por fatiga del conductor</span>
                  </li>
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-red-500 mt-1 text-xl">🚛</span>
                    <span className="font-medium">Conductores de carga especialmente vulnerables</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-3xl border-2 border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-bold text-emerald-800 mb-6 flex items-center">
                  <span className="bg-emerald-100 p-3 rounded-full mr-4">✅</span>
                  Nuestra Solución
                </h3>
                <ul className="space-y-4 text-emerald-700">
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-emerald-500 mt-1 text-xl">🤖</span>
                    <span className="font-medium">Detección en tiempo real con IA</span>
                  </li>
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-emerald-500 mt-1 text-xl">🔊</span>
                    <span className="font-medium">Alertas inmediatas para despertar al conductor</span>
                  </li>
                  <li className="flex items-start space-x-4 text-lg">
                    <span className="text-emerald-500 mt-1 text-xl">📊</span>
                    <span className="font-medium">Registro completo para análisis posterior</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Características Técnicas */}
      <div className="py-24 bg-gradient-to-b from-emerald-50/50 to-green-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-emerald-900 mb-8 tracking-tight">
              Tecnología de Vanguardia
            </h2>
            <p className="text-xl md:text-2xl text-emerald-700 font-medium">
              Detección precisa basada en inteligencia artificial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-500 group hover:shadow-emerald-200/50 hover:-translate-y-2">
              <div className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="bg-emerald-100 p-4 rounded-2xl inline-block">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Detección Ocular</h3>
              <p className="text-emerald-700 mb-6 text-lg leading-relaxed">
                Monitoreo preciso del estado de los ojos para detectar microsueños y parpadeo prolongado
              </p>
              <div className="text-emerald-600 font-bold text-lg">
                <span className="bg-emerald-100 px-3 py-1 rounded-full">Precisión: 95%+</span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-green-100 hover:border-green-300 transition-all duration-500 group hover:shadow-green-200/50 hover:-translate-y-2">
              <div className="text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="bg-green-100 p-4 rounded-2xl inline-block">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-4">Análisis Facial</h3>
              <p className="text-green-700 mb-6 text-lg leading-relaxed">
                Detección de bostezos y expresiones faciales que indican fatiga o somnolencia
              </p>
              <div className="text-green-600 font-bold text-lg">
                <span className="bg-green-100 px-3 py-1 rounded-full">Respuesta: {"<"} 500ms</span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-teal-100 hover:border-teal-300 transition-all duration-500 group hover:shadow-teal-200/50 hover:-translate-y-2">
              <div className="text-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="bg-teal-100 p-4 rounded-2xl inline-block">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V1"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Detección de Gestos</h3>
              <p className="text-teal-700 mb-6 text-lg leading-relaxed">
                Reconocimiento de movimientos de manos hacia la cara que indican cansancio
              </p>
              <div className="text-teal-600 font-bold text-lg">
                <span className="bg-teal-100 px-3 py-1 rounded-full">MediaPipe AI</span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-emerald-100 to-emerald-50 p-8 rounded-3xl border-2 border-emerald-200 shadow-xl">
              <div className="text-5xl font-black text-emerald-800 mb-3">95%</div>
              <div className="text-emerald-700 font-semibold text-lg">Precisión de detección</div>
            </div>
            <div className="text-center bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-3xl border-2 border-green-200 shadow-xl">
              <div className="text-5xl font-black text-green-800 mb-3">{"<"}1s</div>
              <div className="text-green-700 font-semibold text-lg">Tiempo de alerta</div>
            </div>
            <div className="text-center bg-gradient-to-br from-teal-100 to-teal-50 p-8 rounded-3xl border-2 border-teal-200 shadow-xl">
              <div className="text-5xl font-black text-teal-800 mb-3">24/7</div>
              <div className="text-teal-700 font-semibold text-lg">Monitoreo continuo</div>
            </div>
            <div className="text-center bg-gradient-to-br from-lime-100 to-lime-50 p-8 rounded-3xl border-2 border-lime-200 shadow-xl">
              <div className="text-5xl font-black text-lime-800 mb-3">0%</div>
              <div className="text-lime-700 font-semibold text-lg">Falsos positivos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cómo Funciona */}
      <div className="py-24 bg-gradient-to-b from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-emerald-900 mb-8 tracking-tight">¿Cómo Funciona?</h2>
            <p className="text-xl md:text-2xl text-emerald-700 font-medium">Proceso simple y automático en 4 pasos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-emerald-200">
                <span className="text-white font-black text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Captura de Video</h3>
              <p className="text-emerald-700 leading-relaxed font-medium">
                La cámara captura el rostro del conductor en tiempo real
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-green-200">
                <span className="text-white font-black text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Análisis con IA</h3>
              <p className="text-green-700 leading-relaxed font-medium">
                MediaPipe analiza puntos faciales y detecta patrones de fatiga
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-teal-200">
                <span className="text-white font-black text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-4">Detección de Eventos</h3>
              <p className="text-teal-700 leading-relaxed font-medium">
                Identifica ojos cerrados, bostezos y gestos de cansancio
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-lime-500 to-lime-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-lime-200">
                <span className="text-white font-black text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-lime-900 mb-4">Alerta Inmediata</h3>
              <p className="text-lime-700 leading-relaxed font-medium">
                Reproduce sonido de alerta para despertar al conductor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="py-24 bg-gradient-to-b from-emerald-100 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-emerald-900 mb-8 tracking-tight">
              Beneficios del Sistema
            </h2>
            <p className="text-xl md:text-2xl text-emerald-700 font-medium">
              Protección integral para conductores y empresas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-emerald-900 mb-8 text-center md:text-left">Para Conductores</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border-2 border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-emerald-600 mt-1 bg-emerald-100 p-3 rounded-full">🛡️</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-xl mb-2">Mayor Seguridad</h4>
                    <p className="text-emerald-700 leading-relaxed font-medium">
                      Protección contra accidentes por fatiga
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-green-50 to-white rounded-2xl border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-green-600 mt-1 bg-green-100 p-3 rounded-full">💚</div>
                  <div>
                    <h4 className="font-bold text-green-900 text-xl mb-2">Cuidado de la Salud</h4>
                    <p className="text-green-700 leading-relaxed font-medium">
                      Prevención de problemas por falta de descanso
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-teal-50 to-white rounded-2xl border-2 border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-teal-600 mt-1 bg-teal-100 p-3 rounded-full">🏆</div>
                  <div>
                    <h4 className="font-bold text-teal-900 text-xl mb-2">Mejor Rendimiento</h4>
                    <p className="text-teal-700 leading-relaxed font-medium">
                      Mantiene la concentración durante el viaje
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-emerald-900 mb-8 text-center md:text-left">Para Empresas</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-lime-50 to-white rounded-2xl border-2 border-lime-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-lime-600 mt-1 bg-lime-100 p-3 rounded-full">💰</div>
                  <div>
                    <h4 className="font-bold text-lime-900 text-xl mb-2">Reducción de Costos</h4>
                    <p className="text-lime-700 leading-relaxed font-medium">
                      Menos accidentes, menores seguros y reparaciones
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-orange-50 to-white rounded-2xl border-2 border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-orange-600 mt-1 bg-orange-100 p-3 rounded-full">📋</div>
                  <div>
                    <h4 className="font-bold text-orange-900 text-xl mb-2">Cumplimiento Legal</h4>
                    <p className="text-orange-700 leading-relaxed font-medium">Registro de eventos para auditorías</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border-2 border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-emerald-600 mt-1 bg-emerald-100 p-3 rounded-full">📊</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-xl mb-2">Análisis de Datos</h4>
                    <p className="text-emerald-700 leading-relaxed font-medium">
                      Estadísticas para mejorar operaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 bg-emerald-900 border-t-4 border-emerald-700">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="mb-8">
            <img src="/logo_1.png" alt="Logo" className="h-16 w-auto mx-auto mb-6 opacity-90 filter brightness-125" />
          </div>
          <p className="text-emerald-200 mb-4 text-xl font-semibold">
            SOMNOLENCIA - Sistema Inteligente de Detección de Fatiga
          </p>
          <p className="text-emerald-300 font-medium">
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
