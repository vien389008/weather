import { weatherIcons } from "./weatherIcons";

export const getWeatherIcon = (code: number, isDay: boolean = true) => {
  switch (code) {
    case 0:
      return isDay
        ? require("../assets/weather/clear-day.json")
        : require("../assets/weather/clear-night.json");

    case 1:
    case 2:
      return isDay
        ? require("../assets/weather/partly-cloudy-day.json")
        : require("../assets/weather/clear-night.json");

    case 3:
      return isDay
        ? require("../assets/weather/cloudy.json")
        : require("../assets/weather/partly-cloudy-night.json");

    case 45:
    case 48:
      return require("../assets/weather/fog.json");

    case 51:
    case 53:
    case 55:
    case 80:
    case 81:
    case 82:
      return require("../assets/weather/rain.json");

    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
      return require("../assets/weather/rain.json");

    case 66:
    case 67:
      return require("../assets/weather/sleet.json");

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return require("../assets/weather/snow.json");

    case 95:
    case 96:
    case 99:
      return require("../assets/weather/thunderstorms.json");

    default:
      return isDay
        ? require("../assets/weather/clear-day.json")
        : require("../assets/weather/clear-night.json");
  }
};

export const getWeatherIconHome = (code: number, isDay: boolean = true) => {
  switch (code) {
    case 0:
      return isDay ? weatherIcons.sun : weatherIcons.moon;

    case 1:
      return isDay ? weatherIcons["cloud-sun"] : weatherIcons["cloud-moon"];

    case 2:
      return isDay ? weatherIcons["cloud-sun"] : weatherIcons["cloud-moon"];

    case 3:
      return weatherIcons.cloud;

    case 45:
    case 48:
      return weatherIcons.fog;

    case 51:
    case 53:
    case 55:
      return weatherIcons.rain;

    case 61:
    case 63:
    case 65:
      return weatherIcons.rain;

    case 71:
    case 73:
    case 75:
      return weatherIcons.snow;

    case 95:
    case 96:
    case 99:
      return weatherIcons.storm;

    default:
      return isDay ? weatherIcons.sun : weatherIcons.moon;
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
