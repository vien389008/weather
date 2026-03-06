export const getAirQuality = async (lat: number, lon: number) => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm2_5`;

  const res = await fetch(url);
  const data = await res.json();
  return data.hourly.pm2_5[0];
};
