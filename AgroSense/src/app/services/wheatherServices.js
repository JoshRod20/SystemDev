const API_KEY = 'TU_API_KEY'; // Reemplaza con tu clave de API de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Función para obtener el clima actual basado en las coordenadas de latitud y longitud
export const getWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener el clima');
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error en getWeatherByCoords:', error);
    throw error;
  }
};

// Función para convertir el ícono del clima de OpenWeatherMap a tu formato
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
