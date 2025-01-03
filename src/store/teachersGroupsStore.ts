import { create } from 'zustand'
import { GroupT } from '../types/group';
import { JournalGroupT } from '../types/journalGroup';

type State = {
    groups:JournalGroupT[];
}

type Actions = {
    setGroups:(group:JournalGroupT[]) => void,
    clear:() => void
}
type StoreType = State & Actions;

export const useTeachersGroupsStore = create<StoreType>((set) => ({
    groups:[],
    setGroups:(groups)  => set((state) => ({...state,groups:groups})),
    clear:() => set((state) => ({...state,groups:[]}))
}));