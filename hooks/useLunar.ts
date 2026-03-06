import { useEffect, useState } from "react";
import { getMoonPhase } from "../utils/moonPhase";

export default function useLunar() {
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const today = new Date();

    const startOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const arr = [];

    for (let i = 0; i < startOffset; i++) {
      arr.push({ empty: true });
    }

    for (let i = 0; i <= 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      arr.push({
        day: date.getDate(),
        phase: getMoonPhase(date),
        date,
      });
    }

    setDays(arr);
  };

  return days;
}
