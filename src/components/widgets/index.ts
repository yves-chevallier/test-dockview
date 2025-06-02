/// <reference types="vite/client" />
import type { IWidgetDefinition } from './IWidgetDefinition';

import type { IWidgetComponent } from '@/types/IWidgetComponent';

const modules = import.meta.glob<IWidgetComponent>('./widgets/*.tsx', { eager: true });



class WidgetRegistry {
    private widgets = new Map<string, IWidgetComponent>();

    register(id: string, widget: IWidgetComponent) {
        if (this.widgets.has(id)) {
            throw new Error(`Widget with id "${id}" already registered.`);
        }
        this.widgets.set(id, widget);
    }

    unregister(id: string) {
        this.widgets.delete(id);
    }

    get(id: string): IWidgetComponent | undefined {
        return this.widgets.get(id);
    }

    list(): { id: string; widget: IWidgetComponent }[] {
        return Array.from(this.widgets.entries()).map(([id, widget]) => ({ id, widget }));
    }

    clear() {
        this.widgets.clear();
    }
}

export const widgetRegistry = new WidgetRegistry();

Object.entries(modules).forEach(([path, mod]) => {
    const fileName = path
        .split('/')
        .pop()
        ?.replace(/\.tsx$/, '');

    if (!fileName) {
        console.warn(`Widget file name is missing in path: ${path}`);
        return;
    }
    const widget = (mod as any).default;
    console.log(`Registering widget: ${fileName}`, widget);
    console.log(typeof widget !== 'function', typeof widget.title !== 'string', typeof widget.icon !== 'function');
    if (
        typeof widget !== 'function' ||
        typeof widget.title !== 'string' ||
        typeof widget.icon !== 'function' // LucideIcon est une fonction React
    ) {
        console.warn(`Widget "${fileName}" invalide ou mal formé.`);
        return;
    }


    widgetRegistry.register(fileName, widget);
});
