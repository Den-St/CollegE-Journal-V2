import { forwardRef } from "react";
import { AbsenceTableT } from "../../../types/absenceTable";
import { MonthAttesationsTableAttestationsT, MonthAttestationsTableT } from "../../../types/mothAttestationTable";
import "./../printFormStyles.scss"

type Props = {
    table:MonthAttestationsTableT,
    attestations:MonthAttesationsTableAttestationsT[]
}

export const MonthAttestationsTablePrintForm = forwardRef<HTMLDivElement,Props>(({table,attestations},props) => {
    const currYear = new Date().getFullYear();

    return <div className="printForm_container" ref={props} id={'printForm'}>
            <div className="printForm_page" style={{'gap':'20px'}}>
                <div>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>
                <div style={{'width':'100%','display':'flex','flexDirection':'column','gap':'8px',"alignItems":"center"}}>
                    <span className="printForm_subsubheader"><b>{attestations.find(att => att.active)?.month.toLocaleUpperCase()} АТЕСТАЦІЙНА відомість {currYear-1}-{currYear} н. р.</b></span>
                    <span className="printForm_subsubheader"><b>група {table.group_name}</b></span>
                </div>
                <section className='printFormJournal__container' style={{"width":"100%"}}>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left' style={{'height':'86px',"width":"16px","minWidth":"16px"}}>
                        </div>
                        <div className='printFormAbsence_top_student' style={{'height':'86px',"width":"132px","minWidth":"132px"}}>
                        </div>
                        <div className='printFormJournal_top_dates'  style={{"width":"100%"}}>
                            {table.columns.map((column,i) => 
                                <div className="printFormAbsenceTable_teacherName_container" style={{'height':'86px',"width":"25px","flex":"1"}}><i>({column.subject_teacher})</i><br></br>{column.subject_name}</div>
                            )}
                        </div>
                    </div>
                    <div className='printFormJournal__main' style={{"width":"100%"}}>
                        <div className={`printFormJournal__students`}>
                                {table?.student_list.map((student,i) =>
                                    <div style={{'display':'flex'}} key={student.full_name+i}>
                                        <div className={`printFormJournal__studentNumber`} style={{"width":'16px',"height":'18px'}}>
                                            {i+1}
                                        </div>
                                        <div className={`printFormJournal__student`} style={{"width":'132px',"height":'18px'}}>
                                            <p className="printFormJournal_studentName">{student.full_name}</p>
                                        </div>
                                    </div>  
                                )}
                        </div>
                        <div className="printFormJournal__marks_section" style={{"width":"100%"}}>
                            {table?.student_list.map((student,i) => <div className="printFormJournal__marks">
                                {table.columns.map((column,j) => <p className="printFormJournal__mark" style={{'height':'18px',width:'25px',"flex":"1"}}>{column.students?.find(_stundent => student.student_id === _stundent.student_id)?.grade}</p>)}
                            </div>)}
                        </div>
                    </div>
                </section>
            </div>
    </div>
});