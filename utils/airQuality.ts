export const getAQILevel = (pm25: number) => {
  if (pm25 <= 12) return { aqi: 50, text: "Tốt", color: "#2ecc71" };

  if (pm25 <= 35) return { aqi: 100, text: "Trung bình", color: "#f1c40f" };

  if (pm25 <= 55)
    return { aqi: 150, text: "Không tốt cho nhóm nhạy cảm", color: "#f39c12" };

  if (pm25 <= 150) return { aqi: 200, text: "Rất có hại", color: "#e74c3c" };

  return { aqi: 300, text: "Nguy hiểm", color: "#8e44ad" };
};
