import { BarChart3, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import type { IDockviewPanelProps } from "dockview";
import { defineWidget } from "@/utils/defineWidget";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRightBar } from "@/components/RightBarContext";
import docUrl from "./doc.md?raw";

const BarChartWidget: React.FC<IDockviewPanelProps> = () => {
  const [markdown, setMarkdown] = useState("");
const rightBar = useRightBar();
  useEffect(() => {
    setMarkdown(docUrl);

    console.log("Monté");

    return () => console.log("Démonté");
  }, []);

  const openSettings = () => {
    // Logique pour ouvrir les paramètres
  };

  return (
<Tabs defaultValue="readme" className="ml-2 mt-2 h-full">
  <TabsList>
    <TabsTrigger value="readme">About</TabsTrigger>
    <TabsTrigger value="other">Content</TabsTrigger>
  </TabsList>
  <TabsContent value="readme">
      <div className="prose">
      <h1>PROUT</h1>
          <Button
      onClick={() =>
        rightBar.open({
          title: "Settings",
          description: "Configure your preferences",
          footerSaveButton: true,
          content: (
            <div>
              <p>Custom content inside the right bar</p>
              {/* form fields, inputs, etc. */}
            </div>
          ),
        })
      }
    >
      Open Settings
    </Button>
      </div>
  </TabsContent>
  <TabsContent value="other" className="custom-scroll overflow-y-auto h-full p-4 rounded text-left">

      <ReactMarkdown
      components={{
        p: ({node, ...props}) => (
        <p style={{ textAlign: "justify" }} {...props} />
        ),
      }}
      >
      {markdown}
      </ReactMarkdown>

      <Button onClick={openSettings}>
      <Settings />
      </Button>
  </TabsContent>
</Tabs>


  );
};

// ✅ On attache les propriétés **avant** export
BarChartWidget.title = "Statistiques";
BarChartWidget.icon = BarChart3;
BarChartWidget.widthMin = 300;
BarChartWidget.heightMin = 200;
BarChartWidget.settings = () => <p>Hello</p>;

export default defineWidget(BarChartWidget);
