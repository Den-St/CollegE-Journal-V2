import { create } from 'zustand'
import { GroupT } from '../types/group';

type State = {
    sideMenuOpened:"shown" | "hidden";
}

type Actions = {
    onToggleSideMenu:() => void,
    onCloseSideMenu:() => void
}
type StoreType = State & Actions;

export const useSideMenuStore = create<StoreType>((set) => ({
    sideMenuOpened:"hidden",
    onToggleSideMenu:() => set((state) => {
        if(state.sideMenuOpened === "hidden"){
            document.body.classList.add('scrollOff');
            document.body.classList.remove('scrollOn');
        }else{
            document.body.classList.add('scrollOn');
            document.body.classList.remove('scrollOff');
        }
        return {...state,sideMenuOpened:state.sideMenuOpened === "hidden" ? "shown" : "hidden"}
    }),
    onCloseSideMenu:() => set((state) => {
        document.body.classList.add('scrollOn');
        document.body.classList.remove('scrollOff');
        return {...state,sideMenuOpened:"hidden"}
    }),
}));