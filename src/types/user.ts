import { TimetableT } from "./timetable";

export type UserT = {
    user_id:string | null;
    full_name:string,
    mailbox_address:string,
    token:string,
    avatar: string,
    grades_per_month: number | null
    grades_per_week: number | null
    homeworks_per_month:number | null
    homeworks_per_week:number | null
    news_per_month:number | null
    news_per_week:number | null
    visit_per_day:number | null
    visit_per_month:number | null
    visit_per_week:number | null,
    security_level:number | null,
    group_fullname:string,
    is_active:boolean,
    phone_number:string,
    admission_date:Date | null,
    birth_date:Date | null,
    education_form:string,
    education_type:string,
    interests:string,
    job_title:string | null,
    additional_job_title:string | null,
    location:string,
    parents_phone_number:string,
    timetable:{
        split:boolean,
        audience:string | SplitedLessonT,
        link:string | SplitedLessonT,
        subject_name:string | SplitedLessonT,
        subject_id:string | SplitedLessonT,
        group_full_name?:string | SplitedLessonT,
        group_id?:string | SplitedLessonT,
        journal_id?:string | SplitedLessonT
    }[][] | null
    // TimetableT | null,
    user_group:{
        group_id:string,
        group_full_name:string
    } | null
}

export type GroupUserT = {
    student_id:string | null;
    full_name:string,
    mailbox_address:string,
    avatar: string,
}
export type CreateUserT = {
    mailbox_address:string,
    full_name:string
    education_form:string | null 
    education_type:string | null
    birth_date:Date | null;
    admission_date:Date | null
    location:string | null
    phone_number:string
    parents_phone_number:string
    is_on_scholarships:string | null
    interests:string
    job_title:string | null,
    additional_job_title:string | null
    department:string | null
}

export type EditUserStudentT = {
    mailbox_address:string,
    full_name:string
    education_form:string | null 
    education_type:string | null
    birth_date:Date | null;
    admission_date:Date | null
    location:string | null
    phone_number:string
    parents_phone_number:string
    is_on_scholarships:string | null
    interests:string
    job_title:string | null,
    additional_job_title:string | null
    department:string | null,
    avatar:string | null,
    user_type:string | undefined,
}

export type EditUserTeacherT = {
    mailbox_address:string,
    full_name:string
    phone_number:string
    job_title:string | null,
    additional_job_title:string | null
    department:string | null,
    avatar:string | null,
    user_type:string | undefined,
    interests:string
}

export type SplitedLessonT = {'*':string,'**':string};