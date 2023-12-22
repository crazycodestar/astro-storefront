import { useEffect } from "react";

export const usePersistForm = ({ value, key }: { value: {}; key: string }) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return;
};
