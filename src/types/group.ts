import { SupervisorT } from './supervisor';
import { TimetableT } from './timetable';
import { GroupUserT } from './user';

export type GroupT = {
    group_id:string
    group_full_name:string,
    group_students?:GroupUserT[]
    group_supervisor?:SupervisorT,
    timetable?:TimetableT
}

export type CreateGroupT = {
    group_full_name:string
}

export type ChangeGroupT = {
    group_id:string
    group_full_name:string
    group_super:string
}