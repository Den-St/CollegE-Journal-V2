import { GroupUserT } from './user';
export type JournalGroupT = {
    can_edit:{
        journal_id: string,
        subject_full_name: string,
        teacher:string
    }[],
    can_view:{
        journal_id: string,
        subject_full_name: string,
        teacher:string
    }[],
    journal_group: string,
    journal_group_full_name: string,
    group_students:GroupUserT[],
    journal_id:string,
    is_supervisor:boolean
}