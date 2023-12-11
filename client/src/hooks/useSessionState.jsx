import { useEffect, useState } from "react";

export function getSavedValue(key, value) {
  const savedValue = JSON.parse(window.sessionStorage.getItem(key));

  if (savedValue) return savedValue;

  if (value instanceof Function) return value();

  return value;
}

export default function useSessionState(key, value) {
  const [data, setData] = useState(() => getSavedValue(key, value));

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
