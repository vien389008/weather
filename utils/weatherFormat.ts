export const formatTabLabel = (dateStr: string, index: number) => {
  const date = new Date(dateStr);

  if (index === 0) return "HÔM NAY";
  if (index === 1) return "NGÀY MAI";

  const weekdays = ["CN", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7"];

  return `${weekdays[date.getDay()]} ${date.getDate()}`;
};

export const formatDateTitle = (dateStr: string) => {
  const date = new Date(dateStr);

  const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  const dayName = weekdays[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${dayName}, ${day} tháng ${month}`;
};

export const formatHour = (dateStr: string) => {
  const date = new Date(dateStr);

  return `${date.getHours().toString().padStart(2, "0")}:00`;
};

export const toWindDirectionVi = (degree: number) => {
  if (degree >= 337.5 || degree < 22.5) return "Phía bắc";
  if (degree < 67.5) return "Đông Bắc";
  if (degree < 112.5) return "Phía đông";
  if (degree < 157.5) return "Đông Nam";
  if (degree < 202.5) return "Phía nam";
  if (degree < 247.5) return "Tây Nam";
  if (degree < 292.5) return "Phía tây";

  return "Tây Bắc";
};

export const toWindArrow = (degree: number) => {
  const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];

  return arrows[Math.round(degree / 45) % 8];
};
