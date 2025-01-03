import { forwardRef } from "react";
import { SemesterAttestationsT } from "../../../hooks/getSemesterAttestationsTable";
import { MonthAttesationsTableAttestationsT, MonthAttestationsTableT } from "../../../types/mothAttestationTable";
import "./../printFormStyles.scss"

type Props = {
    table:SemesterAttestationsT,
}

export const SemesterAttestationsTablePrintForm = forwardRef<HTMLDivElement,Props>(({table,},props) => {
    const currYear = new Date().getFullYear();

    return <div className="printForm_container" ref={props} id={'printForm'}>
            <div className="printForm_page" style={{'gap':'20px'}}>
                <div>
                    <p className="printForm_header_horisontal">Фаховий коледж зв’язку та інформатизації</p>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>
                <div className="printForm__subsubheader_container" >
                <span className="printForm_subsubheader"><b>ЗАЛІКОВО - ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ І семестр {table.year} н. р. (заліки)</b></span>
                    <span className="printForm_subsubheader"><b>група {table.group_name}</b></span>
                </div>
                <section className='printFormJournal__container' style={{"width":"100%"}}>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left' style={{'height':'86px',"minWidth":"16px",width:"16px"}}>
                        </div>
                        <div className='printFormAbsence_top_student printFormAbsence_top_student_att'>
                        </div>
                        <div className='printFormJournal_top_dates' style={{"width":"100%"}}>
                            {table.columns.map((column,i) => 
                                <div className="printFormAbsenceTable_teacherName_container" style={{'height':'86px',"minWidth":"25px",flex: 1}}><i>({column.subject_teacher})</i><br></br><b>{column.subject_name}</b></div>
                            )}
                        </div>
                    </div>
                    {/* <div className='printFormJournal_top' style={{"fontSize":"13px","width":"100%"}}>
                        <div className='printFormJournal_top_left' style={{'height':'20px',"minWidth":"16px",width:"16px"}}>
                        </div>
                        <div className='printFormAbsence_top_student' style={{'height':'20px',"minWidth":"132px","width":"132px","justifyContent":"center"}}>
                        № відомості
                        </div>
                        <div className='printFormJournal_top_dates' style={{"width":"100%"}}>
                            {table.columns.map((column,i) => 
                                <div className="printFormJournal__studentNumber" style={{'height':'20px',"minWidth":"25px",flex: 1}}>000</div>
                            )}
                        </div>
                    </div> */}
                    {/* <div className='printFormJournal_top' style={{"fontSize":"13px",width:"100%"}}>
                        <div className='printFormJournal_top_left' style={{'height':'37px',"minWidth":"16px",width:"16px"}}>
                        </div>
                        <div className='printFormAbsence_top_student' style={{'height':'37px',"width":"132px","minWidth":"132px","justifyContent":"center","alignItems":"flex-end"}}>
                        дата
                        </div>
                        <div className='printFormJournal_top_dates' style={{width:"100%"}}>
                            {table.columns.map((column,i) => 
                                <div className="printFormJournal__studentNumber" style={{'height':'37px',"minWidth":"25px",flex: "1"}}>00.<br/>00</div>
                            )}
                        </div>
                    </div> */}
                    <div className='printFormJournal__main' style={{"fontSize":"13px"}}>
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