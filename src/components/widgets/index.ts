/// <reference types="vite/client" />
import type { IWidgetDefinition } from './IWidgetDefinition';
const modules = import.meta.glob<IWidgetDefinition>('./widgets/*.tsx', { eager: true });


class WidgetRegistry {
    private widgets = new Map<string, IWidgetDefinition>();

    register(id: string, widget: IWidgetDefinition) {
        if (this.widgets.has(id)) {
            throw new Error(`Widget with id "${id}" already registered.`);
        }
        this.widgets.set(id, widget);
    }

    unregister(id: string) {
        this.widgets.delete(id);
    }

    get(id: string): IWidgetDefinition | undefined {
        return this.widgets.get(id);
    }

    list(): { id: string; widget: IWidgetDefinition }[] {
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

    if (!fileName) return;
    const widget = (mod as any).default;
    if (!widget?.title || !widget?.component) {
        console.warn(`Widget "${fileName}" invalide ou mal formé.`);
        return;
    }

    widgetRegistry.register(fileName, widget);
});
