export const getMoonPhase = async () => {
  const now = Math.floor(Date.now() / 1000);

  const res = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${now}`);

  const data = await res.json();

  return data[0];
};
