import api from './api';  // Configuración de la API (axios o fetch)

export const obtenerZonasRiego = async () => {
  const response = await api.get('/zonas_riego');
  return response.data;
};

export const crearZonaRiego = async (data: any) => {
  const response = await api.post('/zonas_riego', data);
  return response.data;
};