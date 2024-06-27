import { fetchGet } from "./api";

const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1/";

const fetchWeatherInfo = async (latitude: string, longitude: string) => {
  const endpoint = "forecast";
  const params =
    `latitude=${latitude}&longitude=${longitude}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`;

  const url = WEATHER_API_BASE_URL + endpoint + "?" + params;

  try {
    const response = await fetchGet(url);
    return response;
  } catch (error) {
    console.error("Error fetching weather info:", error);
    throw error;
  }
};

export default fetchWeatherInfo;
