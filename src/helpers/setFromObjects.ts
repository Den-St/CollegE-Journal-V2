export const setFromSubjects = (subjects:{
    journal_id: string;
    subject_full_name: string;
    teacher:string
}[]) => {
    const set:{
        journal_id: string;
        subject_full_name: string;
        teacher:string
    }[] = [];
    subjects.forEach((subject) => {
        if(set.some(_subject => _subject.journal_id === subject.journal_id)) return;
        set.push(subject);
    });

    return set;
}