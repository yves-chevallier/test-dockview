import { useEffect } from 'react';
import { useWSStore, useWSValue } from './useWSStore';

export function SensorComponent() {
  const connect = useWSStore((s) => s.connect);
  const subscribe = useWSStore((s) => s.subscribe);
  const unsubscribe = useWSStore((s) => s.unsubscribe);
  const connected = useWSStore((s) => s.connected);

  const value1234 = useWSValue(0x1234);
  const value2345 = useWSValue(0x2345);

  useEffect(() => {
    if (!connected) connect();
    subscribe(0x1234, 0x2345);

    return () => {
      unsubscribe(0x1234, 0x2345);
    };
  }, []);

  return (
    <div>
      <p>Valeur 0x1234 : {value1234}</p>
      <p>Valeur 0x2345 : {value2345}</p>
    </div>
  );
}
