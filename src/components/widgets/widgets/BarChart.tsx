import { BarChart3 } from 'lucide-react';
import { useEffect } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar } from 'recharts';
import type { IDockviewPanelProps } from 'dockview';
import { defineWidget } from '@/utils/defineWidget';

const BarChartWidget: React.FC<IDockviewPanelProps> = () => {
  useEffect(() => {
    console.log('Monté');
    return () => console.log('Démonté');
  }, []);

  const chartData = [/* ... */];
  const chartConfig = { /* ... */ };

  return (
    <div>PROUT</div>
  );
};

// ✅ On attache les propriétés **avant** export
BarChartWidget.title = 'Statistiques';
BarChartWidget.icon = BarChart3;
BarChartWidget.widthMin = 300;
BarChartWidget.heightMin = 200;

export default defineWidget(BarChartWidget);
