export function getWeatherBackground(code: number, isDay: number) {
  if (code === 0 && isDay === 1) {
    return ["#4facfe", "#00f2fe"]; // trời nắng
  }

  if (code >= 1 && code <= 3) {
    return ["#bdc3c7", "#2c3e50"]; // nhiều mây
  }

  if (code >= 51 && code <= 67) {
    return ["#4b79a1", "#283e51"]; // mưa
  }

  if (isDay === 0) {
    return ["#141e30", "#243b55"]; // ban đêm
  }

  return ["#74ebd5", "#acb6e5"];
}
