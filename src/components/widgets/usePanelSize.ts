// src/widgets/usePanelSize.ts
import { useEffect, useState } from 'react';
import type { IDockviewPanelProps } from 'dockview';
import type { PanelSize } from './IWidgetDefinition';

export function usePanelSize(
  { containerApi }: IDockviewPanelProps,
): PanelSize {
  const [size, setSize] = useState<PanelSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerApi) return;

    const update = () => {
      const { clientWidth: width, clientHeight: height } = containerApi.element;
      setSize({ width, height });
    };

    update(); // première mesure immédiate
    const dispose = containerApi.onDidDimensionsChange(update);
    return () => dispose.dispose();
  }, [containerApi]);

  return size;
}
