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
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

// ✅ On attache les propriétés **avant** export
BarChartWidget.title = 'Statistiques';
BarChartWidget.icon = BarChart3;
BarChartWidget.widthMin = 300;
BarChartWidget.heightMin = 200;

export default defineWidget(BarChartWidget);
