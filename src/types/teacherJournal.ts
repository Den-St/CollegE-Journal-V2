export type TeacherJournalT = {
    can_edit:number,
    columns:{
        column_id:string,
        column_index:number,
        cells:{
            index:number,
            value:string
        }[],
        date:string,
        lesson_type:string,
        lesson_topic:string
    }[],
    journal_id:string,
    students:{
        full_name:string,
        index:number,
        student_id:string
    }[],
    subject_id:string,
    subject_system:number,
    journal_owner:string,
    pe_education:boolean | undefined
}