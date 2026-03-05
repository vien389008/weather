export const getMoonPhase = (date: Date) => {
  const lp = 2551443;

  const newMoon = new Date(1970, 0, 7, 20, 35, 0);

  const phase = ((date.getTime() - newMoon.getTime()) / 1000) % lp;

  const age = Math.floor(phase / (24 * 3600));

  if (age < 2) return "New Moon";
  if (age < 7) return "Waxing Crescent";
  if (age < 9) return "First Quarter";
  if (age < 14) return "Waxing Gibbous";
  if (age < 16) return "Full Moon";
  if (age < 21) return "Waning Gibbous";
  if (age < 23) return "Last Quarter";

  return "Waning Crescent";
};
