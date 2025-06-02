import { BarChart3 } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";
import { useEffect } from 'react';
import type { IWidgetComponent } from '@/types/IWidgetComponent';
import type { IDockviewPanelProps } from 'dockview';

const StatisticsWidget: IWidgetComponent = (props: IDockviewPanelProps) => {
  useEffect(() => {
    console.log('Monté');
    return () => console.log('Démonté');
  }, []);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "#2563eb" },
    mobile: { label: "Mobile", color: "#60a5fa" },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

// Métadonnées statiques typées
StatisticsWidget.title = "Statistiques";
StatisticsWidget.icon = BarChart3;
StatisticsWidget.widthMin = 300;
StatisticsWidget.heightMin = 200;
StatisticsWidget.settings = () => <div>Réglages du widget</div>;

export default StatisticsWidget;
