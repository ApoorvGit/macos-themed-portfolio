import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: React.ReactNode;
  noTitleBar?: boolean;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  highestZIndex: number;
  openWindow: (window: Omit<WindowState, 'isOpen' | 'isMinimized' | 'isFocused' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  highestZIndex: 1000,

  openWindow: (window) => {
    const { windows, highestZIndex } = get();
    const newZIndex = highestZIndex + 1;
    
    set({
      windows: {
        ...windows,
        [window.id]: {
          ...window,
          isOpen: true,
          isMinimized: false,
          isFocused: true,
          zIndex: newZIndex,
        },
      },
      highestZIndex: newZIndex,
    });
    
    // Unfocus all other windows
    Object.keys(windows).forEach((id) => {
      if (id !== window.id && windows[id].isFocused) {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isFocused: false },
          },
        }));
      }
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[id];
      return { windows: newWindows };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
          isFocused: false,
        },
      },
    }));
  },

  restoreWindow: (id) => {
    const { highestZIndex } = get();
    const newZIndex = highestZIndex + 1;
    
    set((state) => {
      // Unfocus all windows
      const updatedWindows = Object.keys(state.windows).reduce((acc, windowId) => {
        acc[windowId] = {
          ...state.windows[windowId],
          isFocused: windowId === id,
          zIndex: windowId === id ? newZIndex : state.windows[windowId].zIndex,
        };
        if (windowId === id) {
          acc[windowId].isMinimized = false;
        }
        return acc;
      }, {} as Record<string, WindowState>);

      return {
        windows: updatedWindows,
        highestZIndex: newZIndex,
      };
    });
  },

  focusWindow: (id) => {
    const { highestZIndex, windows } = get();
    
    // Don't refocus if already focused
    if (windows[id]?.isFocused) return;
    
    const newZIndex = highestZIndex + 1;
    
    set((state) => {
      // Unfocus all windows and focus the target
      const updatedWindows = Object.keys(state.windows).reduce((acc, windowId) => {
        acc[windowId] = {
          ...state.windows[windowId],
          isFocused: windowId === id,
          zIndex: windowId === id ? newZIndex : state.windows[windowId].zIndex,
        };
        return acc;
      }, {} as Record<string, WindowState>);

      return {
        windows: updatedWindows,
        highestZIndex: newZIndex,
      };
    });
  },

  moveWindow: (id, x, y) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], x, y },
      },
    }));
  },

  resizeWindow: (id, width, height) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], width, height },
      },
    }));
  },
}));
