import * as React from 'react';
import type { IWidgetDefinition } from './IWidgetDefinition';
import useResizeObserver from '@react-hook/resize-observer';
import type { IDockviewPanelProps } from 'dockview';

interface WidgetWrapperProps {
    widget: IWidgetDefinition;
    onOpenSettings?: (content: React.ReactNode) => void;
    dockviewProps: IDockviewPanelProps; //
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ widget, onOpenSettings, dockviewProps }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { component: Component, mount, unmount } = widget;
    const [dimensions, setDimensions] = React.useState<{ width: number; height: number }>({
        width: widget.widthMin,
        height: widget.heightMin,
    });
    React.useEffect(() => {
        mount?.();
        return () => unmount?.();
    }, []);

    useResizeObserver(ref, (entry) => {
        const { width, height } = entry.contentRect;
        if (!widget.widthMin || !widget.heightMin) {
            setDimensions({ width, height });
        }
    });

    const handleOpenSettings = () => {
        if (widget.settings && onOpenSettings) {
            onOpenSettings(widget.settings());
        }
    };

    return (
        <div
            className="widget-wrapper"
            style={{
                minWidth: widget.widthMin,
                minHeight: widget.heightMin,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
            }}
        >
            <div className="widget-header flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                    <widget.icon size={16} />
                    <span>{widget.title}</span>
                </div>
                {widget.settings && (
                    <button onClick={handleOpenSettings} className="text-xs text-gray-500 hover:underline">
                        Paramètres
                    </button>
                )}
            </div>
            <div className="widget-content flex-1 overflow-auto">
                <Component {...dockviewProps}/>
            </div>
        </div>
    );
};
