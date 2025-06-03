import { IDockviewHeaderActionsProps } from "dockview";
import { nextId } from "../../defaultLayout";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const LeftControls = (props: IDockviewHeaderActionsProps) => {
  const onClick = () => {
    props.containerApi.addPanel({
      id: `id_${Date.now().toString()}`,
      component: "default",
      title: `Tab ${nextId()}`,
      position: {
        referenceGroup: props.group,
      },
    });
  };

  return (
    <div
      className="group-control"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0px 8px",
        height: "100%",
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus size={15} strokeWidth={2} onClick={onClick} />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4}>
            Add Widget
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
