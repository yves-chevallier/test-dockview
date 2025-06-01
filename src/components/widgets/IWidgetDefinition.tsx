import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import type { IDockviewPanelProps } from 'dockview';

export interface IWidgetDefinition {
    title: string;
    icon: LucideIcon;
    widthMin: number;
    heightMin: number;
    mount?: () => void;
    unmount?: () => void;
    settings?: () => ReactNode;

    component: React.ComponentType<IDockviewPanelProps>;
}
