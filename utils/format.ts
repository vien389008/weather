export const formatHour = (time: string) => {
  return time.split("T")[1].slice(0, 5);
};

export const formatDay = (date: string) => {
  const d = new Date(date);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return days[d.getDay()];
};
