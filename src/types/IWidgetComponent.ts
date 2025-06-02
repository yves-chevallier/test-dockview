import type { LucideIcon } from 'lucide-react';
import type { IDockviewPanelProps } from 'dockview';

export interface IWidgetComponent extends React.FC<IDockviewPanelProps> {
  /** Titre du widget (obligatoire) */
  title: string;

  /** Icône du widget (obligatoire) */
  icon: LucideIcon;

  /** Largeur minimale en px */
  widthMin: number;

  /** Hauteur minimale en px */
  heightMin: number;

  /** Composant JSX pour les réglages (optionnel) */
  settings?: () => React.ReactNode;
}
