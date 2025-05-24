"use client"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-3xl shadow-2xl max-w-lg md:max-w-xl w-full mx-4 relative border border-slate-600 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white text-2xl font-bold transition-all duration-300 hover:scale-110 transform bg-slate-800/80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600/80 border border-slate-600"
        >
          ×
        </button>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
