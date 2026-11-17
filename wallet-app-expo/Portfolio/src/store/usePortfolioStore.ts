import { create } from 'zustand';

interface PortfolioState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
    return { theme: newTheme };
  }),
  setTheme: (theme) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    return { theme };
  }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));