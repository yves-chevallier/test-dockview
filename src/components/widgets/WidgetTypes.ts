// src/widgets/IWidgetDefinition.ts
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, FC } from 'react';
import type {
  IDockviewPanelProps,
  IDockviewPanel,       // panelApi
} from 'dockview';

/**
 * Dimensions du conteneur dockview réellement disponibles
 * lors du montage du widget.
 */
export interface PanelSize {
  width: number;
  height: number;
}

/**
 * Contexte transmis à mount/unmount
 */
export interface WidgetLifecycleContext {
  panelApi: IDockviewPanel;
  size: PanelSize;
}

export interface IWidgetProps extends IDockviewPanelProps {
  size: PanelSize;
}

export interface IWidgetDefinition {
  // métadonnées
  title: string;
  icon: LucideIcon;
  widthMin: number;
  heightMin: number;
  settings?: () => ReactNode;

  // cycle de vie
  mount?:  (ctx: WidgetLifecycleContext) => void | Promise<void>;
  unmount?: (ctx: { panelApi: IDockviewPanel }) => void;

  // composant React du panneau
  component: FC<IWidgetProps>;
}
