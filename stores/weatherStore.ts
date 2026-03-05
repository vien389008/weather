import { create } from "zustand";

type WeatherState = {
  weather: any;
  locationName: string;
  coords: { lat: number; lon: number } | null;
  setWeather: (data: any) => void;
  setLocationName: (name: string) => void;
  setCoords: (c: { lat: number; lon: number }) => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  locationName: "",
  coords: null,
  setWeather: (weather) => set({ weather }),
  setLocationName: (locationName) => set({ locationName }),
  setCoords: (coords) => set({ coords }),
}));
