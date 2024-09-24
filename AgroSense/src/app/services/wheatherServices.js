export const fetchWeatherData = async (latitude, longitude) => {
  const apiKey = '7b4b4ce04e2da986878cdda209cbe0e5'; // Tu API key de OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Validar que los datos esenciales están presentes antes de retornarlos
      if (data && data.main && data.weather) {
        return data;
      } else {
        console.error("Error: Datos incompletos en la respuesta del clima");
        return null;
      }
    } else {
      console.error(`Error en la API: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el clima: ", error);
    return null;
  }
};
