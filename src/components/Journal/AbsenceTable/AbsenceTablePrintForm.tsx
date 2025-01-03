import { forwardRef } from "react";
import { AbsenceTableT } from "../../../types/absenceTable";
import "./../printFormStyles.scss"

type Props = {
    table:AbsenceTableT,
    groupName:string
}

export const AbsenceTablePrintForm = forwardRef<HTMLDivElement,Props>(({table,groupName},props) => {
    return <div className="printForm_container" ref={props} id={'printForm'}>
            <div className="printForm_page" style={{'gap':'20px'}}>
                <div>
                    <h1 className="printForm_header">ВСП "ФАХОВИЙ КОЛЕДЖ ЗВ'ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_header">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ"</h1>
                </div>
                <div style={{'width':'100%','display':'flex',gap:'33px'}}>
                    <div style={{'display':'flex','flexDirection':'column','gap':'5px'}}>
                        <span className="printForm_subsubheader">Староста <span style={{'marginLeft':'10px'}}>{table.group_leader_data.full_name}</span></span>
                        <span className="printForm_subsubheader">{table.group_leader_data.phone_number}</span>
                    </div>
                    <div style={{'display':'flex','flexDirection':'column','gap':'5px'}}>
                        <span className="printForm_subsubheader">Кл. керівник <span style={{'marginLeft':'10px'}}>{table.supervisor_data.full_name}</span></span>
                        <span className="printForm_subsubheader">{table.supervisor_data.phone_number}</span>
                    </div>
                </div>
                <span style={{'width':'100%','textAlign':'center'}} className="printForm_subsubheader">Табель обліку відвідування занять групи <b>{table.group_name}</b></span>
                <section className='printFormJournal__container'>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left' style={{'height':'18px'}}>
                            <span>№з/П</span>
                        </div>
                        <div className='printFormAbsence_top_student'>
                            <span>ПІБ студента/студентки</span>
                        </div>
                        <div className='printFormJournal_top_dates'>
                            {table.dates.map((date,i) => 
                                <div className="printFormJournal_top_days_day" key={date} style={{'width':i !== 5 ? '50px' : '65px'}}>
                                    {date}
                                </div>    
                            )}
                        </div>
                        <div className="printFormAbsence_top_total">
                            <span>Всього</span>
                        </div>
                    </div>
                    <div className='printFormJournal__main'>
                        <div className={`printFormJournal__students`}>
                                {table?.student_list.map((student,i) =>
                                    <div style={{'display':'flex'}} key={student.full_name+i}>
                                        <div className={`printFormJournal__studentNumber`}>
                                            {i+1}
                                        </div>
                                        <div className={`printFormJournal__student`}>
                                            <p className="printFormJournal_studentName">{student.full_name}</p>
                                        </div>
                                    </div>  
                                )}
                        </div>
                        <div className="printFormJournal__marks_section">
                            {table?.student_list.map((studentDays,i) => <div className="printFormJournal__marks">
                                {studentDays.columns.map((day,j) => day.map(value => <p className="printFormJournal__mark" style={{'height':'18px','width':j !== 5 ? '10px' : '13px'}}>{value}</p>))}
                            </div>)}
                        </div>
                        <div className="printFormJournal__totals_section">
                            {table?.student_list.map((student,i) => 
                                <p className="printFormAbsence_top_total">{student.total}</p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="printFormAbsenceTable_bottom_container">
                    <div className="printFormAbsenceTable_teacher_container">
                        <div className="printFormAbsenceTable_teacherHeader_container">
                        ПІБ викладача
                        </div>
                        <div className="printFormAbsenceTable_teacherNames_container">
                            {table.teachers.map((teachers,i) => <>{teachers.map((teacher,j) => <div className="printFormAbsenceTable_teacherName_container" style={{'width':i !== 5 ? '10px' : '13px'}}>{teacher}</div>)}</>)}
                        </div>
                        <p className="printFormAbsence_teachers_end"></p>
                    </div>
                    <div className="printFormAbsenceTable_teacher_container">
                        <div className="printFormAbsenceTable_teacherHeader_container">
                        Дисципліна
                        </div>
                        <div className="printFormAbsenceTable_teacherNames_container">
                            {table.subjects.map((subjects,i) => <>{subjects.map((subject,j) => <div className="printFormAbsenceTable_teacherName_container" style={{'width':i !== 5 ? '10px' : '13px'}}>{subject}</div>)}</>)}
                        </div>
                        <p className="printFormAbsence_teachers_end"></p>
                    </div>
                </section>
            </div>
    </div>
});