export const getLatestEvents = async () => {
  try {
    const res = await fetch("https://somnolencia.onrender.com/api/eventos/");
    
    if (!res.ok) throw new Error("Error al obtener eventos");
    return await res.json();
  } catch (err) {
    console.error("Fallo al obtener eventos:", err);
    return [];
  }
};
