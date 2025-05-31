import {
    DockviewDefaultTab,
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelHeaderProps,
    DockviewApi,
    DockviewTheme,
} from 'dockview';
import {MouseEvent, useEffect, useLayoutEffect, useState, createContext} from 'react';

import './styles/app.scss';
import { defaultConfig } from './defaultLayout';
import { RightControls } from './controls';
import { LeftControls } from './components/LeftControls';
import { PrefixHeaderControls } from './components/PrefixHeaderControls';

import DefaultPanel from './components/DefaultPanel';

const headerComponents = {
    default: (props: IDockviewPanelHeaderProps) => {
        const onContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            alert('context menu');
        };
        return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />;
    },
};

const ThemeContext = createContext<DockviewTheme | undefined>(undefined);

export default (props: { theme?: DockviewTheme }) => {
    const [api, setApi] = useState<DockviewApi>();
    const [pending, setPending] = useState<
        { text: string; timestamp?: Date }[]
    >([]);

    useLayoutEffect(() => {
        if (pending.length === 0) {
            return;
        }
        setPending([]);
    }, [pending]);

    useEffect(() => {
        if (!api) {
            return;
        }

        const disposables = [
            api.onDidAddPanel((event) => {
                console.log(`Panel Added ${event.id}`);
            }),
            api.onDidActivePanelChange((event) => {
                console.log(`Panel Activated ${event?.id}`);
            }),
            api.onDidRemovePanel((event) => {
                console.log(`Panel Removed ${event.id}`);
            }),

            api.onDidAddGroup((event) => {
                console.log(`Group Added ${event.id}`);
            }),

            api.onDidMovePanel((event) => {
                console.log(`Panel Moved ${event.panel.id}`);
            }),

            api.onDidMaximizedGroupChange((event) => {
                console.log(
                    `Group Maximized Changed ${event.group.api.id} [${event.isMaximized}]`
                );
            }),

            api.onDidRemoveGroup((event) => {
                console.log(`Group Removed ${event.id}`);
            }),

            api.onDidActiveGroupChange((event) => {
                console.log(`Group Activated ${event?.id}`);
            }),
        ];

        (() => {
            const state = localStorage.getItem('dv-demo-state');

            if (state) {
                try {
                    api.fromJSON(JSON.parse(state));
                    return;
                } catch {
                    localStorage.removeItem('dv-demo-state');
                }
                return;
            }

            defaultConfig(api);
        })();

        return () => {
            disposables.forEach((disposable) => disposable.dispose());
        };
    }, [api]);

    const onReady = (event: DockviewReadyEvent) => {
        setApi(event.api);
    };

    const components = {
        default: DefaultPanel,
    };

    return (
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
                    components={components}
                    defaultTabComponent={headerComponents.default}
                    rightHeaderActionsComponent={RightControls}
                    leftHeaderActionsComponent={LeftControls}
                    prefixHeaderActionsComponent={PrefixHeaderControls}
                    onReady={onReady}
                    className="dockview-theme-app"
                    disableThemeClassName={true}
                />
            </ThemeContext.Provider>
        </div>
    );
};
