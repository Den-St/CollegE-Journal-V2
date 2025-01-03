import { themes } from './../consts/themes';
import { create } from 'zustand'
import { themeType } from '../types/themeType';

type State = {
    theme:themeType
}
type Actions = {
    changeTheme:() => void
}
type StoreType = State & Actions;

export const useThemeStore = create<StoreType>((set) => ({
  theme: localStorage.getItem('theme') as themeType || themes.dark,
  changeTheme: () => set((state) => ({ ...state,theme: state.theme === themes.dark ? 'light' : 'dark' })),
}));