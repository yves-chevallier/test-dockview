import {
    DockviewReact,
    DockviewReadyEvent,
    DockviewApi,
    IDockviewPanelProps,
    DockviewTheme,
} from 'dockview';
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import { defaultConfig } from './defaultLayout';
import { RightControls, LeftControls, PrefixHeaderControls } from './components/controls';
import { widgetRegistry } from './components/widgets';
import { Tab} from './components/controls';
import { RightBarProvider } from '@/components/RightBarContext';

const ThemeContext = createContext<DockviewTheme | undefined>(undefined);

export default (props: { theme?: DockviewTheme }) => {
    const [api, setApi] = useState<DockviewApi>();
    const [pending, setPending] = useState<
        { text: string; timestamp?: Date }[]
    >([]);

    const dockviewComponents: Record<string, React.FC<IDockviewPanelProps>> = {};
    widgetRegistry.list().forEach(({ id, widget }) => {
        dockviewComponents[id] = (props: IDockviewPanelProps) => {
            const Component = widget;
            return <Component {...props} />;
        };
    });

    useLayoutEffect(() => {
        if (pending.length === 0) return;
        setPending([]);
    }, [pending]);

    useEffect(() => {
        if (!api) return;

        const disposables = [
            api.onDidAddPanel((event) => {
                widgetRegistry.get(event.id)?.mount?.();
            }),
            api.onDidRemovePanel((event) => {
                widgetRegistry.get(event.id)?.unmount?.();
            }),
        ];

        (() => {
            // const state = localStorage.getItem('dv-demo-state');

            // if (state) {
            //     try {
            //         api.fromJSON(JSON.parse(state));
            //         return;
            //     } catch {
            //         localStorage.removeItem('dv-demo-state');
            //     }
            //     return;
            // }
            console.log(widgetRegistry.list());
            for (const widget of widgetRegistry.list()) {
                console.log('Adding panel', widget.id, widget.widget.title);
                api.addPanel({
                    id: widget.id,
                    component: widget.id,
                    title: widget.widget.title,
                });
            }
            //defaultConfig(api);
        })();

        return () => {
            disposables.forEach((disposable) => disposable.dispose());
        };
    }, [api]);

    const onReady = (event: DockviewReadyEvent) => {
        setApi(event.api);
        (window as any).dockview = event.api;
    };

    return (
        <RightBarProvider>
        <div
            className="dockview-demo"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                position: 'relative'
            }}
        >
            <ThemeContext.Provider value={props.theme}>
                <DockviewReact
                    components={dockviewComponents}
                    defaultTabComponent={Tab}
                    rightHeaderActionsComponent={RightControls}
                    leftHeaderActionsComponent={LeftControls}
                    prefixHeaderActionsComponent={PrefixHeaderControls}
                    onReady={onReady}
                    className="dockview-theme-app"
                    disableThemeClassName={true}
                    singleTabMode='default'
                />
            </ThemeContext.Provider>
        </div>
        </RightBarProvider>
    );
};
