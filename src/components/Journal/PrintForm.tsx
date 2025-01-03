import { useEffect } from "react"
import { forwardRef } from "react"
import { lessonTypesNamesAbbreviations } from "../../consts/lessonTypesNamesAbbreviations"
import { TeacherJournalT } from "../../types/teacherJournal"
import "./printFormStyles.scss"

type Props = {
    journal?:TeacherJournalT,
    subjectName:string
}
// const lessonTypesWithoutMonth = [
//     'Підсумкова',''
// ]

const shortMonthNames:Record<string,string> = {
    'Січень': 'Січ',
    'Лютий': 'Лют',
    'Березень': 'Бер',
    'Квітень': 'Квіт',
    'Травень': 'Трав',
    'Червень': 'Черв',
    'Липень': 'Лип',
    'Серпень': 'Серп',
    'Вересень': 'Вер',
    'Жовтень': 'Жовт',
    'Листопад': 'Лист',
    'Грудень': 'Груд',
    'I семестр':'I см',
    'II семестр':'II см',

};
export const PrintForm = forwardRef<HTMLDivElement,Props>(({journal,subjectName},props) => {
    const limitColumnsNumber = 18;
    const limitLessonsNumber = 18;
    const limitColumns = Array.from(Array(limitColumnsNumber).keys());
    const numberOfJournalPages = !!journal?.columns.length && Array.from(Array(Math.ceil(journal?.columns.length/limitColumnsNumber)).keys());
    const limitLessons = Array.from(Array(limitLessonsNumber).keys());
    const numberOfLessonsPages = !!journal?.columns.length && Array.from(Array(Math.round(journal?.columns.length/limitLessonsNumber)).keys());

    return <div className="printForm_container" ref={props} id={'printForm'}>
        {!!numberOfJournalPages && numberOfJournalPages.map(pageNumber => <>
            <div className="printForm_page" key={pageNumber}>
                {pageNumber === 0 && <div>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>}
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{subjectName}</span>
                    <span className="printForm_subsubheader">{journal.journal_owner}</span>
                </div>
                <section className='printFormJournal__container'>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left' style={{'width':'47px','height':'35px'}}>
                            <span>№ за ПП</span>
                        </div>
                        <div className='printFormJournal_top_student'>
                            <span style={{position:'absolute',top:'2px',left:'122px'}}>Дата</span>
                            <span style={{position:'absolute',top:'12px',left:'2px'}}>ПІБ студента<br/> або студентки</span>
                        </div>
                        <div className='printFormJournal_top_dates'>
                            {limitColumns.map(columnNumber => !!journal?.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.column_id &&
                                journal.columns[columnNumber +(limitColumnsNumber*pageNumber)]?.date.includes('.')
                                ? <div className="printFormJournal_top_dates_date" key={journal.columns[columnNumber+(limitColumnsNumber*pageNumber)].column_id}>
                                    <p style={{position:'absolute',top:'2px',left:'2px'}}>{journal.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.date.split('\n')[1].split('.')[0]}</p>
                                    <p style={{position:'absolute',top:'22px',left:'13px'}}>{journal.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.date.split('\n')[1].split('.')[1]}</p>
                                </div> 
                                : !!journal?.columns[columnNumber + (limitColumnsNumber*pageNumber)] 
                                && <div className="printFormJournal_top_dates_specialDate" key={journal.columns[columnNumber+(limitColumnsNumber*pageNumber)]?.column_id}>
                                        <p>{lessonTypesNamesAbbreviations[journal.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.lesson_type]}</p>
                                        <p>{!!journal.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.date && shortMonthNames[journal.columns[columnNumber + (limitColumnsNumber*pageNumber)]?.date]}</p>
                                    </div>
                            )}
                        </div>
                    </div>
                    <div className='printFormJournal__main'>
                        <div className={`printFormJournal__students`}>
                                {journal?.students.map(student =>
                                    <div style={{'display':'flex'}} key={student.student_id}>
                                        <div className={`printFormJournal__studentNumber`} style={{width:'47px','height':'18px'}}>
                                            {student.index} 
                                        </div>
                                        <div className={`printFormJournal__student`}  style={{'width':'145px','height':'18px'}}>
                                            <p className="printFormJournal_studentName">{student.index}.{student.full_name}</p>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className="printFormJournal__marks_section">
                            {journal?.students.map((student,i) => 
                                <div  className="printFormJournal__marks" key={student.student_id}>
                                    {limitColumns.map(columnNumber => !!journal?.columns[columnNumber + (limitColumnsNumber*pageNumber)] &&
                                            <p className="printFormJournal__mark">{journal?.columns[columnNumber + (limitColumnsNumber*pageNumber)].cells.find(cell => cell.index === student.index)?.value}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{journal.journal_owner}</span>
                    <span className="printForm_subsubheader">Підпис<span> _______________</span></span>
                </div>
            </div>
        {limitLessons.some(columnNumber => !!journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)]?.date?.includes('.')) &&

            <div className="printForm_page" key={pageNumber}>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{subjectName}</span>
                    <span className="printForm_subsubheader">{journal.journal_owner}</span>
                </div>
                <div className="printFormLessons_main">
                    <div className="printFormLessons_top">
                        <div className="printFormLessons_top_type">Тип заняття</div>
                        <div className="printFormLessons_top_date">Дата проведення</div>
                        <div className="printFormLessons_top_theme">Тема заняття</div>
                        <div className="printFormLessons_top_task">Завдання</div>
                    </div>
                    <div className="printFormLessons_lessons">
                        {limitLessons.map(columnNumber => !!journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)]?.date?.includes('.') &&
                            <div key={journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)].column_id} className="printFormLessons_lesson">
                                <div className="printFormLessons_top_type">{journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)].lesson_type}</div>
                                <div className="printFormLessons_top_date">{journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)].date.split('\n')[1]}</div>
                                <div className="printFormLessons_top_theme">{journal?.columns[columnNumber + (limitLessonsNumber*pageNumber)].lesson_topic}</div>
                                <div className="printFormLessons_top_task"></div>
                            </div>)}    
                        {/* {journal?.columns.map(column => 
                            <div key={column.column_id} className="printFormLessons_lesson">
                                <div className="printFormLessons_top_type">{column.lesson_type}</div>
                                <div className="printFormLessons_top_date">{column.date}</div>
                                <div className="printFormLessons_top_theme">{column.lesson_topic}</div>
                                <div className="printFormLessons_top_task">Завдання</div>
                            </div>
                        )} */}
                    </div>
                </div>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{journal.journal_owner}</span>
                    <span className="printForm_subsubheader">Підпис<span> _______________</span></span>
                </div>
            </div>}
            </>
        )}
    </div>
});