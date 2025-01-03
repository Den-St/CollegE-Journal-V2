import { create } from 'zustand'
import { UserT } from '../types/user';

type State = {
    user:UserT;
    loading:boolean
}

type Actions = {
    signIn:(userData:UserT) => void,
    signOut:() => void;
    setToken:(token:string) => void,
    setAvatar:(avatar:string) => void,
    startLoading:() => void,
    stopLoading:() => void,
    setActive:() => void
}
type StoreType = State & Actions;

export const useUserStore = create<StoreType>((set) => ({
    user:{
        user_id:'',
        full_name:'',
        mailbox_address:'',
        token:'',
        avatar: '',
        grades_per_month: null,
        grades_per_week: null,
        homeworks_per_month:null,
        homeworks_per_week:null,
        news_per_month:null,
        news_per_week:null,
        visit_per_day:null,
        visit_per_month:null,
        visit_per_week:null,
        security_level:null,
        group_fullname:'',
        is_active:false,
        phone_number:'',
        admission_date:null,
        birth_date:null,
        education_form:'',
        education_type:'',
        interests:'',
        job_title:'',
        additional_job_title:'',
        location:'',
        parents_phone_number:'',
        user_group:{
            group_id:'',
            group_full_name:''
        },
        timetable:null
    },
    loading:false,
    startLoading:() => set((state) => ({...state,loading:true})),
    stopLoading:() => set((state) => ({...state,loading:false})),
    signIn: (userData) => set((state) => ({ ...state,user:{...state.user,...userData} })),
    signOut: () => set(() => ({
        user:{
            user_id:'',
            full_name:'',
            mailbox_address:'',
            token:'',
            avatar: '',
            grades_per_month: null,
            grades_per_week: null,
            homeworks_per_month:null,
            homeworks_per_week:null,
            news_per_month:null,
            news_per_week:null,
            visit_per_day:null,
            visit_per_month:null,
            visit_per_week:null,
            security_level:null,
            group_fullname:'',
            is_active:false,
            phone_number:'',
            admission_date:null,
            birth_date:null,
            education_form:'',
            education_type:'',
            interests:'',
            job_title:'',
            additional_job_title:'',
            location:'',
            parents_phone_number:'',
            user_group:{
                group_id:'',
                group_full_name:''
            },
            timetable:null
        }
    })),
    setToken: (token:string) => set((state) => ({
        user:{...state.user,token}
    })), 
    setAvatar: (avatar:string) => set((state) => ({
        user:{...state.user,avatar}
    })),
    setActive: () => set((state) => ({...state,user:{...state.user,is_active:true}}))
}));