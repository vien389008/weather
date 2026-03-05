import axios from "axios";

export const getWeather = async (lat: number, lon: number) => {
  const baseURL = "https://api.open-meteo.com/v1/forecast";

  const params = {
    latitude: lat,
    longitude: lon,

    current_weather: true,
    hourly:
      "temperature_2m,apparent_temperature,relativehumidity_2m,dewpoint_2m,precipitation,rain,snowfall,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,cloudcover,visibility,pressure_msl,uv_index",
    daily:
      "sunrise,sunset,temperature_2m_max,temperature_2m_min,windspeed_10m_max,weathercode,precipitation_sum",

    timezone: "auto",
  };

  // tạo query string
  const query = new URLSearchParams(params as any).toString();

  const fullUrl = `${baseURL}?${query}`;
  console.log("Requesting weather data from:", fullUrl);

  const res = await axios.get(baseURL, { params });

  return res.data;
};
