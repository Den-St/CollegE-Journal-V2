import {  useEffect, forwardRef, RefObject,  } from "react";
import { LinkBack } from "../../../assets/components/LinkBack/LinkBack";
import { JournalPortraitModeWarning } from "../../../assets/svgs/journalPortraitModeWarningSvg";
import { routes } from "../../../consts/routes";
import { useThemeStore } from "../../../store/themeStore";
import { useUserStore } from "../../../store/userStore";
import { Loader } from "../../Loader/Loader";
import { NoMatch } from "../../NoMatch";
import _debounce from 'lodash/debounce';
import './../absenceTableStyles.scss'; 
import React from "react";
import { useMonthAttestationDragScroll } from "../../../hooks/mothAttestationsDragScroll";
import { getColorByValue } from "../CellInput";
import { SemesterAttestationsT, } from "../../../hooks/getSemesterAttestationsTable";
import { StudentSemesterAttestationsT, useGetStudentSemesterAttesationsTable } from "../../../hooks/getStudentSemesterAttestationsTable";

export const StudentSemesterAttesationsTable = () => {
    const {table,loading,} = useGetStudentSemesterAttesationsTable();
    const theme = useThemeStore().theme;
    const {cellsRef,lessonTypesRef,mainContainerRef,onMouseMove,mouseUpHandler,
           mouseDownHandler,handleHorizontalScroll,
           handleVerticalScroll,teachersRef,} = useMonthAttestationDragScroll();

    useEffect(() => {
        document.title = `Aтестації за семестр`;
    },[]);

    return <div onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} className={`journalMain__container ${theme}`}>
        <SemesterAttestationsTableFillters/>
        {loading ? <Loader/>
        : !table ? <NoMatch title={`Таблиці за групою не знайдено`}/>
        : (!table?.columns.length) ? <NoMatch isChildren title="Таблиця пуста"/> : <>
        <section className='journal_portraitModeWarning'>
                <JournalPortraitModeWarning/>
                <p className='journal_portraitModeWarning_header'>Халепа, треба перевернути телефон</p>
                <p className='journal_portraitModeWarning_description'>Переверніть телефон у альбомний режим, тільки так можливо передивитися таблицю</p>
        </section>
        <section className='journal__container'>
            <div className='journalLeft__container' style={{'maxHeight':'300px',paddingBottom:'0',marginBottom:'28px'}} onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler}>
                <div style={{"display":'flex',"flexDirection":"column",'gap':'30px','alignItems':'center'}}>
                    <div className='journalColumnsLeft__container'>
                        <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                        <p className='journalColumnsLeft__text'>У жовтні кожного року проходить акція «відрахуй випускника»</p>
                    </div>
                    <p className="header">{table?.group_name}</p>
                    <p className="absenceTable_teachersSection_header" style={{"width":"329px","minHeight":"94px"}}>Дата</p>
                </div>
                <div className='journalColumnsCenter__container' style={{'gap':'15px','paddingLeft':'56px'}}  onScroll={() => handleHorizontalScroll("lessonTypes")} ref={lessonTypesRef}>
                    {table.columns?.map((column) => 
                        <div style={{"display":"flex",gap:"10px","flexDirection":"column"}}>
                            <p key={column.subject_name} className="monthAttestationsTableSubject">{column.subject_name}</p>
                        </div>
                    )}
                </div>
            </div>
            <div onMouseUp={mouseUpHandler} style={{'maxHeight':'unset','overflowY':'hidden'}} className='journalRight__container' ref={mainContainerRef} >
                <div className={`journalRightColumns__container`} style={{'marginBottom':'5px'}}>
                    {table.columns[0].attestations.map((att,i) => 
                        <div key={att.name} style={{'display':'flex'}} className={`absenceTable_studentContainer ${(i+1)%2 === 0 ? 'even' : ''}`}>
                            <div id={'student_'+i} style={{'height':'40px',padding:'3px 37px',width:'332px',background:'transparent'}} className={`journalRowItemLeft__container ${(i+1)%2 === 0 ? 'even' : ''}`}>
                                    <p className='journalRowItemLeft__name'>{att.name}</p>
                            </div>
                            <div style={{height:'40px'}} className="absenceTable_vetricalDivider"></div>
                        </div>
                    )}
                </div>
                <div className='journalRightRowsContainer'
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                    onMouseMove={onMouseMove}
                    ref={cellsRef} onScroll={() => handleHorizontalScroll("cells")}>
                    {table?.columns[0].attestations.map((att,i) => 
                        <div key={att.name} style={{'height':'40px','marginLeft':'1px'}} className={`journalRowItem__container ${(i+1)%2 === 0 ? 'even' : ''}`}>
                            <div className='journalRowItemCenter__container' style={{'gap':'23px','marginLeft':'59px',"paddingRight":"5px"}}>
                                {table.columns.map((column,j) => 
                                    <p key={column.subject_name} onMouseMove={() => {}} onMouseDown={mouseUpHandler} 
                                    className={`journalRowItemCenterValue__text`} 
                                    style={{cursor:'not-allowed',color:getColorByValue((column.attestations[i]?.grade.toLocaleLowerCase() || "0"),column.subject_system),
                                            width:'32px',height:'32px',margin:'0'}}>
                                     {column.attestations[i]?.grade.toLocaleLowerCase()}
                                    </p>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
        <Teachers dragScroll={{'onMouseDown':mouseDownHandler,'onMouseMove':onMouseMove,'onMouseUp':mouseUpHandler,'onScroll':handleHorizontalScroll}} refs={{teachersRef,}} table={table}/>
        </>}
    </div>
}

type TeachersProps = {
    table:StudentSemesterAttestationsT,
    dragScroll:{
        onMouseDown:(e:React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
        onMouseUp:() => void,
        onMouseMove:(e:React.MouseEvent<HTMLDivElement,MouseEvent>,localIsMouseDown?:boolean,localMousePos?:{x:number,y:number}) => void,
        // ref={cellsRef},
        onScroll:(element:"cells" | "lessonTypes" | "teachers" | "subjects") => void
    },
    refs:{
        teachersRef:RefObject<HTMLDivElement>,
    }
}

const Teachers = forwardRef<HTMLDivElement,TeachersProps>(({dragScroll,table,refs},ref) => {
    // return <></>
    return  <section 
            style={{"marginTop":'-20px'}}
            onMouseUp={dragScroll.onMouseUp}
            className="absenceTable_teacherSection">
        <div className="absenceTable_teachersContainer" style={{'gap':'0'}}>
            <p className="absenceTable_teachersSection_header">ПІБ Викладача</p>
            <div 
            style={{'paddingLeft':'55px',gap:'15px'}}
            onScroll={() => dragScroll.onScroll("teachers")} ref={refs.teachersRef}
            onMouseDown={dragScroll.onMouseDown} onMouseUp={dragScroll.onMouseUp}
            onMouseMove={dragScroll.onMouseMove}
            className="absenceTable_teachersContainer">
                {table.columns.map((column,i) => <p className="monthAttestationsTableSubject" style={{"minHeight":"250px"}}>{column.subject_teacher}</p>)}
            </div>  
        </div>
    </section>
})

export const SemesterAttestationsTableFillters = () => {
    return <section className='journalTop__container'>
            <LinkBack title={"Список групи"} route={routes.pickJournalSubject}/>
            <div style={{'width':'100%','justifyContent':'space-between','display':'flex'}}>
                <h1 className='journal__title'>Атестаційна відомість за семестр</h1>
            </div>
        </section>
}