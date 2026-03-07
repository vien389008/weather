export const getMoonIcon = (phase: string) => {
  switch (phase) {
    case "New Moon":
      return require("../assets/moon/moon-new.json");

    case "Waxing Crescent":
      return require("../assets/moon/moon-waxing-crescent.json");

    case "First Quarter":
      return require("../assets/moon/moon-first-quarter.json");

    case "Waxing Gibbous":
      return require("../assets/moon/moon-waxing-gibbous.json");

    case "Full Moon":
      return require("../assets/moon/moon-full.json");

    case "Waning Gibbous":
      return require("../assets/moon/moon-waning-gibbous.json");

    case "Last Quarter":
      return require("../assets/moon/moon-last-quarter.json");

    case "Waning Crescent":
      return require("../assets/moon/moon-waning-crescent.json");

    default:
      return require("../assets/moon/moon-new.json");
  }
};
