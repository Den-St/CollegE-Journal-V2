import { useThemeStore } from '../store/themeStore';

export const useThemeController = () => {
    const changeTheme = useThemeStore().changeTheme;
    const theme = useThemeStore().theme;

    const onToggleThemeSwitch = (value:boolean) => {
        changeTheme();
        localStorage.setItem('theme',value ? 'dark' : 'light');
    };

    return {onToggleThemeSwitch,theme}
}