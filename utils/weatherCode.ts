export const getWeatherIcon = (code: number) => {
  switch (code) {
    case 0:
      return "☀️"; // Clear sky

    case 1:
      return "🌤"; // Mainly clear

    case 2:
      return "⛅"; // Partly cloudy

    case 3:
      return "☁️"; // Overcast

    case 45:
    case 48:
      return "🌫"; // Fog

    case 51:
    case 53:
    case 55:
      return "🌦"; // Drizzle

    case 56:
    case 57:
      return "🌧"; // Freezing drizzle

    case 61:
    case 63:
    case 65:
      return "🌧"; // Rain

    case 66:
    case 67:
      return "🌧❄️"; // Freezing rain

    case 71:
    case 73:
    case 75:
      return "❄️"; // Snow fall

    case 77:
      return "🌨"; // Snow grains

    case 80:
    case 81:
    case 82:
      return "🌦"; // Rain showers

    case 85:
    case 86:
      return "🌨"; // Snow showers

    case 95:
      return "⛈"; // Thunderstorm

    case 96:
    case 99:
      return "⛈🌨"; // Thunderstorm with hail

    default:
      return "☁️";
  }
};

export const getWeatherDescription = (code: number) => {
  switch (code) {
    case 0:
      return "Trời quang";

    case 1:
      return "Ít mây";

    case 2:
      return "Mây rải rác";

    case 3:
      return "Nhiều mây";

    case 45:
    case 48:
      return "Sương mù";

    case 51:
    case 53:
    case 55:
      return "Mưa phùn";

    case 56:
    case 57:
      return "Mưa phùn đóng băng";

    case 61:
    case 63:
    case 65:
      return "Mưa";

    case 66:
    case 67:
      return "Mưa đóng băng";

    case 71:
    case 73:
    case 75:
      return "Tuyết rơi";

    case 77:
      return "Hạt tuyết";

    case 80:
    case 81:
    case 82:
      return "Mưa rào";

    case 85:
    case 86:
      return "Tuyết rào";

    case 95:
      return "Dông";

    case 96:
    case 99:
      return "Dông kèm mưa đá";

    default:
      return "Không xác định";
  }
};
