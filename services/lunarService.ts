export const getMoonPhase = async (date: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/astronomy.json?key=c79c3892a1944ddda7131612260402&q=Hanoi&dt=${date}`,
  );

  const data = await res.json();

  return data.astronomy.astro.moon_phase;
};
