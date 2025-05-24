"use client"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop mejorado */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal container responsive */}
      <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-6xl md:max-h-[90vh] md:m-4">
        {/* Modal content */}
        <div className="bg-white/95 backdrop-blur-sm w-full h-full md:rounded-3xl shadow-2xl border border-green-200 md:border-green-300 overflow-y-auto">
          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-green-600 hover:text-green-800 text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-110 transform bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-red-100 border border-green-300 hover:border-red-300 shadow-lg"
          >
            ×
          </button>

          {/* Content */}
          <div className="p-4 md:p-6 pt-16 md:pt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
