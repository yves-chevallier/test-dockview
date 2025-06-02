import { create } from 'zustand';
import { wsManager } from './websocketManager';

type State = {
  connected: boolean;
  values: Record<number, any>;
  connect: () => void;
  subscribe: (...ids: number[]) => void;
  unsubscribe: (...ids: number[]) => void;
};

export const useWSStore = create<State>((set, get) => ({
  connected: false,
  values: {},

  connect: () => {
    wsManager.connect('ws://localhost:8000/ws'); // Ajustez l'URL
    wsManager.onMessage((msg) => {
      if (msg.sdo) {
        set((state) => ({
          values: { ...state.values, ...msg.sdo },
        }));
      }
      // Pour le PDO, à traiter selon format
    });
    wsManager.send({ connect: true });
    set({ connected: true });
  },

  subscribe: (...ids) => {
    wsManager.send({ subscribe: ids });
  },

  unsubscribe: (...ids) => {
    wsManager.send({ unsubscribe: ids });
  }
}));

export const useWSValue = (id: number) => {
  return useWSStore((state) => state.values[id]);
};
