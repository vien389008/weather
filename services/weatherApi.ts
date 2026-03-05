import axios from "axios";

export const getWeather = async (lat: number, lon: number) => {
  const baseURL = "https://api.open-meteo.com/v1/forecast";

  const params = {
    latitude: lat,
    longitude: lon,
    current_weather: true,
    hourly: "temperature_2m,weathercode",
    daily:
      "sunrise,sunset,temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum",
    timezone: "auto",
  };

  // tạo query string
  const query = new URLSearchParams(params as any).toString();

  const fullUrl = `${baseURL}?${query}`;

  const res = await axios.get(baseURL, { params });

  return res.data;
};
