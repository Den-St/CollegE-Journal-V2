import { SplitedLessonT } from './user';
export type LessonT = {
    // audience:number,
    // lesson_number:number,
    // link:string,
    // subject_name:string,
    // time:string,
    // subject_id:string
    split:boolean,
    audience:string | SplitedLessonT,
    link:string | SplitedLessonT,
    subject_name:string | SplitedLessonT 
}