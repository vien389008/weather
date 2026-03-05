export const formatHour = (time: string) => {
  return time.split("T")[1].slice(0, 5);
};

export const formatDay = (date: string) => {
  const d = new Date(date);
  const today = new Date();

  const diff = Math.floor(
    (d.getTime() - today.setHours(0, 0, 0, 0)) / 86400000,
  );

  let label = "";
  if (diff === 0) label = "Hôm nay";
  else if (diff === 1) label = "Ngày mai";
  else {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    label = days[d.getDay()];
  }

  const month = d.getMonth() + 1;
  const day = d.getDate();

  return {
    label,
    sub: `TH${month} ${day}`,
  };
};
