import { useEffect, useState } from 'react';

export default function useDebouce<T>(value: T, delay: number = 250): T {
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value, delay]);

  return deboucedValue;
}
