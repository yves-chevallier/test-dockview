import { DockviewDefaultTab, IDockviewDefaultTabProps } from "dockview";
import { PointerEvent, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { widgetRegistry } from "@/components/widgets";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Tab: React.FunctionComponent<IDockviewDefaultTabProps> = (
  props
) => {
  const isMiddleMouseButton = useRef<boolean>(false);
  const widget = widgetRegistry.get(props.api.id);

  if (!widget) {
    return <DockviewDefaultTab {...props} />;
  }

  const Icon = widget.icon;
  const onClose = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();

      if (props.closeActionOverride) {
        props.closeActionOverride();
      } else {
        props.api.close();
      }
    },
    [props.api, props.closeActionOverride]
  );

  const onBtnPointerDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  const _onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      isMiddleMouseButton.current = event.button === 1;
      props.onPointerDown?.(event);
    },
    [props.onPointerDown]
  );

  const _onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isMiddleMouseButton && event.button === 1 && !props.hideClose) {
        isMiddleMouseButton.current = false;
        onClose(event);
      }

      props.onPointerUp?.(event);
    },
    [props.onPointerUp, onClose, props.hideClose]
  );

  const _onPointerLeave = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      isMiddleMouseButton.current = false;
      props.onPointerLeave?.(event);
    },
    [props.onPointerLeave]
  );

  return (
    <div
      data-testid="dockview-dv-default-tab"
      onPointerDown={_onPointerDown}
      onPointerUp={_onPointerUp}
      onPointerLeave={_onPointerLeave}
      className="dv-default-tab"
    >
      <span className="dv-default-tab-content flex items-center gap-1">
        <Icon size={20} className="" /> {widget.title}
        {!props.hideClose && props.tabLocation !== "headerOverflow" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="dv-default-tab-action hover:text-red-500 p-1 transition-colors duration-100"
                  onPointerDown={onBtnPointerDown}
                  onClick={onClose}
                >
                  <X size={15} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={4}>
                Close Widget
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>
    </div>
  );
};
