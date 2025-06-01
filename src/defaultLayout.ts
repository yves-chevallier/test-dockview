import { DockviewApi } from 'dockview';

export const nextId = (() => {
    let counter = 0;
    return () => counter++;
})();

export function defaultConfig(api: DockviewApi) {
    const panel1 = api.addPanel({
        id: 'panel_1',
        component: 'BarChart',
        renderer: 'always',
        title: 'Panel 1',
        // floating: true
    });


    api.addPanel({
        id: 'panel_4',
        component: 'BarChart',
        title: 'Panel 4',
        position: { referencePanel: panel1, direction: 'right' },
    });
    panel1.api.setActive();
}
