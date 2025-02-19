import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from '../../config';
import type { ThemeColor, ThemeState } from '../../types';

const THEME_STORAGE_KEY = 'app-theme';

export const useThemeStore = create<ThemeState>((set, get) => ({
    currentTheme: 'light',
    isDark: false,
    colors: lightColors,
    loadTheme: async () => {
        try {
            const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (storedTheme === 'light' || storedTheme === 'dark') {
                set({
                    currentTheme: storedTheme,
                    isDark: storedTheme === 'dark',
                    colors: storedTheme === 'dark' ? darkColors : lightColors
                });
            } else {
                set({
                    currentTheme: 'light',
                    isDark: false,
                    colors: lightColors
                });
            }
        } catch (error) {
            set({
                currentTheme: 'dark',
                isDark: true,
                colors: darkColors
            });
        }
    },
    setTheme: async (theme: ThemeColor) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
            set({
                currentTheme: theme,
                isDark: theme === 'dark',
                colors: theme === 'dark' ? darkColors : lightColors
            });
        } catch (error) {
            set({
                currentTheme: 'dark',
                isDark: true,
                colors: darkColors
            });
        }
    },
}));