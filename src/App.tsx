import {
    DockviewDefaultTab,
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelHeaderProps,
    IDockviewPanelProps,
    DockviewApi,
    DockviewTheme,
} from 'dockview';
import {MouseEvent, useRef, useEffect, useLayoutEffect, useState, createContext, useContext} from 'react';
import * as ReactDOM from 'react-dom/client';
import './app.scss';
import { defaultConfig } from './defaultLayout';
import { LeftControls, PrefixHeaderControls, RightControls } from './controls';

const DebugContext = createContext<boolean>(false);

const ShadowIframe = (props: IDockviewPanelProps) => {
    return (
        <iframe
            onMouseDown={() => {
                if (!props.api.isActive) {
                    props.api.setActive();
                }
            }}
            style={{ border: 'none', width: '100%', height: '100%' }}
            src="https://dockview.dev"
        />
    );
};

const components = {
    default: (props: IDockviewPanelProps) => {
        const isDebug = useContext(DebugContext);

        return (
            <div
                style={{
                    height: '100%',
                    overflow: 'auto',
                    position: 'relative',
                    padding: 5,
                    border: isDebug ? '2px dashed orange' : '',
                }}
            >
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        pointerEvents: 'none',
                        fontSize: '42px',
                        opacity: 0.5,
                    }}
                >
                    {props.api.title}
                </span>
            </div>
        );
    },
    nested: (props: IDockviewPanelProps) => {
        const theme = useContext(ThemeContext);
        return (
            <DockviewReact
                components={components}
                onReady={(event: DockviewReadyEvent) => {
                    event.api.addPanel({ id: 'panel_1', component: 'default' });
                    event.api.addPanel({ id: 'panel_2', component: 'default' });
                    event.api.addPanel({
                        id: 'panel_3',
                        component: 'default',
                    });

                    event.api.onDidRemovePanel((e) => {
                        console.log('remove', e);
                    });
                }}
                theme={theme}
            />
        );
    },
    iframe: (props: IDockviewPanelProps) => {
        return (
            <iframe
                onMouseDown={() => {
                    if (!props.api.isActive) {
                        props.api.setActive();
                    }
                }}
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                }}
                src="https://dockview.dev"
            />
        );
    },
    shadowDom: (props: IDockviewPanelProps) => {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (!ref.current) {
                return;
            }

            const shadow = ref.current.attachShadow({
                mode: 'open',
            });

            const shadowRoot = document.createElement('div');
            shadowRoot.style.height = '100%';
            shadow.appendChild(shadowRoot);

            const root = ReactDOM.createRoot(shadowRoot);

            root.render(<ShadowIframe {...props} />);

            return () => {
                root.unmount();
            };
        }, []);

        return <div style={{ height: '100%' }} ref={ref}></div>;
    },
};

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
                    theme={props.theme}
                />
            </ThemeContext.Provider>
        </div>
    );
};
