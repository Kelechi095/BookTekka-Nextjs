import { useEffect, useState } from "react";

const useDebounce = (delay: number, value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
