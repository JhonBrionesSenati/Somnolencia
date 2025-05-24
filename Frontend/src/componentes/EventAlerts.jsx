import React, { useEffect, useState } from 'react';
import { getLatestEvents } from '../services/api';

const EventAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getLatestEvents();
        if (Array.isArray(data)) {
          setAlerts(data);
        }
      } catch (err) {
        console.error("Error al obtener eventos:", err);
      }
    };

    const interval = setInterval(fetchEvents, 2000); // cada 2 segundos
    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Alertas en Vivo 🚨
      </h2>

      {alerts.length === 0 ? (
        <p className="text-center text-gray-500">Sin alertas recientes</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.map((alerta, index) => (
            <li
              key={index}
              className={`p-2 rounded shadow text-white font-semibold ${
                alerta.evento === 'OJOS_CERRADOS'
                  ? 'bg-red-600'
                  : alerta.evento === 'BOCA_ABIERTA'
                  ? 'bg-yellow-500'
                  : alerta.evento === 'MANO_A_LA_BOCA'
                  ? 'bg-orange-500'
                  : 'bg-gray-600'
              }`}
            >
              🕒 {new Date(alerta.timestamp).toLocaleTimeString()} — {alerta.evento}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventAlerts;
