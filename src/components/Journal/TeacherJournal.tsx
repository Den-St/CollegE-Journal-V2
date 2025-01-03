import { Select, Spin, Switch, Tooltip } from 'antd';
import React, { useEffect, useState, } from 'react';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { JournalPortraitModeWarning } from '../../assets/svgs/journalPortraitModeWarningSvg';
import { routes } from '../../consts/routes';
import { setFromSubjects } from '../../helpers/setFromObjects';
import { useGetTeacherJournal } from '../../hooks/getJournal';
import { useGroupsByTeacher } from '../../hooks/groupsByTeacher';
import { useThemeStore } from '../../store/themeStore';
import { Loader } from '../Loader/Loader';
import { NoMatch } from '../NoMatch';
import { CellInput, getColorByValue } from './CellInput';
import _debounce from 'lodash/debounce';
import './journalStyles.scss';
import { LinkBack } from '../../assets/components/LinkBack/LinkBack';
import { PrintForm } from './PrintForm';
import { useJournalDragScroll } from '../../hooks/useJournalDragScroll';
import { lessonTypesNamesAbbreviations } from '../../consts/lessonTypesNamesAbbreviations';
import { useJournalPrintForm } from '../../hooks/useJournalPrintForm';
import { JournalGroupT } from '../../types/journalGroup';
import { JournalAttestationT } from '../../types/journalAttestation';
import { TeacherJournalFilltersT } from '../../types/teacherJournalFillters';
import { TeacherJournalT } from '../../types/teacherJournal';
import { useUserStore } from '../../store/userStore';
import { securityLevels } from '../../consts/securityLevels';
import { TeacherSettingsModal, useTeacherSettingsModal } from './TeacherSettings';
const {Option} = Select;

const monthNamesToNumber:Record<string,number> = {
    "Січень": 1,
    "Лютий": 2,
    "Березень": 3,
    "Квітень": 4,
    "Травень": 5,
    "Червень": 6,
    "Липень": 7,
    "Серпень": 8,
    "Вересень": 9,
    "Жовтень": 10,
    "Листопад": 11,
    "Грудень": 12
  }
export const TeacherJournal = () => {
    const {fillters,loading,journal,onChangeFillters,isDisabledByDate,onBlurChangeLessonTopic,
           onChangeLessonType,currentMonth,token,attestations,refetch,} = useGetTeacherJournal();
    const {groups} = useGroupsByTeacher();
    const groupJournal = groups.find(group => group.journal_group === fillters.group_id);
    const theme = useThemeStore().theme;
    const {cellsRef,lessonTypesRef,mainContainerRef,onMouseMove,mouseUpHandler,
           mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,handleVerticalScroll} = useJournalDragScroll();
    const subjectName = !!groupJournal ? setFromSubjects([...groupJournal?.can_edit,...groupJournal.can_view]).find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name || null : null;

    useEffect(() => {
        const subjectName = groupJournal?.can_edit.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name || groupJournal?.can_view.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
        if(!groupJournal?.journal_group_full_name || !subjectName){
            document.title = `Журнал`;
            return;
        }
        const month = attestations?.find(att => att.active)?.name
        document.title = `${groupJournal?.journal_group_full_name} - ${subjectName}${month ? ` - ${month}` : ``}`;
    },[fillters.subject_id,journal,groupJournal]);


    return <div onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} className={`journalMain__container ${theme} ${attestations?.find(att => att.active)?.start === 'attestations' ? `onlyAtts` : `notOnlyAtts`} `}>
        <TeacherJournalFillters onChangeFillters={onChangeFillters} loading={loading} journal={journal} attestations={attestations} fillters={fillters} groupJournal={groupJournal} subjectName={subjectName} refetch={refetch} 
        />
        {loading ? <Loader/>
        : !journal ? <NoMatch title={`Журналу не знайдено`}/>
        : (!journal.students.length || !journal.columns.length) ? <NoMatch isChildren title="Журнал пустий"/> : <>
        <section className='journal_portraitModeWarning'>
                <JournalPortraitModeWarning/>
                <p className='journal_portraitModeWarning_header'>Халепа, треба перевернути телефон</p>
                <p className='journal_portraitModeWarning_description'>Переверніть телефон у альбомний режим, тільки так можливо передивитися журнал</p>
        </section>
        <section className='journal__container'>
            <div className='journalLeft__container' onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler}>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>У жовтні кожного року проходить акція «відрахуй випускника»</p>
                </div>
                <div className='journalColumnsCenter__container' onScroll={handleHorizontalScrollLessonTypes} ref={lessonTypesRef}>
                    {journal?.columns.map((column,i) => 
                        <div key={column.column_id}  className={`journalColumnsCenterItem__container ${!column.date.includes('\n') && !!i && journal.columns[i-1]?.date !== column.date ? `specialLessonType` : ``} ${!column.date.includes('\n') && !!i && journal.columns[i+1]?.date !== column.date ? `specialLessonType_last` : ``}`}>
                                <div id={'columnSelect_'+i
                                // column.column_index
                                }
                                    className='journal_lessonTypeSelect_wrapper' 
                                    >{
                                    journal.can_edit === 1  && column.date.includes('.') ?
                                        <Select 
                                        disabled={
                                            journal.can_edit !== 1 || !column.date.includes('.')
                                        }
                                        defaultValue={column.lesson_type || null} 
                                        className='journal_lessonTypeSelect' 
                                        rootClassName='journal_lessonTypeSelect'
                                        placeholder={'Тип'}
                                        popupMatchSelectWidth={false}
                                        onChange={(value) => onChangeLessonType(column.column_id,value,column.column_index)}>
                                            <Option label={"Лк"} value={"Лекція"}>Лекція</Option>
                                            <Option label={"Практика"} value={"Практика"}>Практика</Option>
                                            <Option label={"Залік"} value={"Залік"}>Залік</Option>
                                            <Option label={"Лаб"} value={"Лаб"}>Лаб</Option>
                                            <Option label={"Консультація"} value={"Консультація"}>Консультація</Option>
                                    </Select>
                                    : 
                                    <Tooltip title={column.lesson_type}>
                                        <div className='journalColumnsCenterItemType'>{lessonTypesNamesAbbreviations[column.lesson_type] || '-'}</div>
                                    </Tooltip>
                                }</div>
                            <div className='journalColumnsCenterItemDate__container'
                                id={'columnDate_' + i
                                // column.column_index
                                }
                            >
                                <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')[0]}</p>
                                <p className='journalColumnsCenterItemDate'>{column.date.split('\n')[1]}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div onMouseUp={mouseUpHandler} className='journalRight__container' ref={mainContainerRef} onScroll={handleVerticalScroll}>
                <div className={`journalRightColumns__container`}>
                    {journal?.students.map(student => 
                        <div key={student.student_id} id={'student_'+student.index} className={`journalRowItemLeft__container ${student.index%2 === 0 ? 'even' : ''}`}>
                            <p className='journalRowItemLeft__number'>{student.index}.</p>
                            <p className='journalRowItemLeft__name'>{student.full_name}</p>
                        </div>
                    )}
                </div>
                <div className='journalRightRowsContainer'
                id='journalRightRowsContainer'
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                    onMouseMove={onMouseMove}
                    ref={cellsRef} onScroll={handleHorizontalScroll}>
                        {journal?.students.map((student,i) => 
                            <div key={student.student_id} className={`journalRowItem__container ${student.index%2 === 0 ? 'even' : ''}`}>
                                <div className='journalRowItemCenter__container' id={`row_${i}`}>
                                    {journal.columns.map((column,j) => 
                                        (journal.can_edit === 1 &&
                                        (!isDisabledByDate(column.date) || !column.date.includes('\n')))
                                        ? !!token && <CellInput 
                                            lessonType={column.lesson_type}
                                            month={column.date.includes('\n') ? +column.date.split("\n")[1].split(".")[1] : monthNamesToNumber[column.date]}
                                            className={`${!column.date.includes('\n') && !!j && journal.columns[j-1]?.date !== column.date ? `specialLessonType_cell` : ``}
                                            ${!column.date.includes('\n') && !!j && journal.columns[j+1]?.date !== column.date ? `specialLessonType_last_cell` : ``}`} 
                                            onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} rowIndex={i} studentIndex={student.index} columnIndex={j} key={`${column.column_id}_${i}`} 
                                            token={token} date={column.date} onBlurData={{'column_id':column.column_id,'journal_id':journal.journal_id,subject_id:fillters.subject_id,'student_id':student.student_id,subject_system:journal.subject_system}} 
                                            defaultValue={column.cells.find(cell => cell.index === student.index)?.value.toLocaleLowerCase()} pe_education={journal.pe_education} is_att={!column.date.includes('.')}/>
                                            
                                        : <p key={column.column_id} onMouseMove={() => {}} 
                                            onMouseDown={mouseUpHandler} id={i + ',' + j} 
                                            className={`journalRowItemCenterValue__text ${!column.date.includes('\n') && !!j && journal.columns[j-1]?.date !== column.date ? `specialLessonType_cell` : ``} ${!column.date.includes('\n') && !!j && journal.columns[j+1]?.date !== column.date ? `specialLessonType_last_cell` : ``}`}
                                            style={{cursor:'not-allowed',color:getColorByValue(column.cells.find(cell => cell.index === student.index)?.value || "",journal.subject_system),}}>
                                            {column.cells.find(cell => cell.index === student.index)?.value.toLocaleLowerCase()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </section>
        <section className='journalLessonsThemes__section'>
            <h1 className='journalLessonsThemes__title'>Теми занять</h1>
            <div className='journalLessonsThemes__container'>
                {journal?.columns.map(column => column.date.includes('.') &&
                    <div className='journalLessonThemeItem__container' key={column.column_id}>
                        <div className='journalLessonThemeItemDate__container'>
                            <p className='journalLessonThemeItemDate__day'>{column.date.split('\n')[0]}</p>
                            <p className='journalLessonThemeItemDate__date'>{column.date.split('\n')[1]}</p>
                            <p id={'lessonTheme'+column.column_index.toString()} className='journalLessonThemeItemType'>{column.lesson_type}</p>
                        </div>
                        <input
                        disabled={
                            journal.can_edit === 0
                        }
                        onBlur={(e) => onBlurChangeLessonTopic(column.column_id,e.target.value)} 
                        placeholder='Заповніть тему заняття' defaultValue={column.lesson_topic} 
                        className='journalLessonThemeItem__input__text'/>
                    </div>
                )}
            </div>
        </section>
        </>}
    </div>
}

type Props = {
    groupJournal:JournalGroupT | undefined,
    subjectName:string | null,
    refetch:(_fillters?:TeacherJournalFilltersT) => void,
    fillters:TeacherJournalFilltersT,
    attestations?:JournalAttestationT[],
    journal?:TeacherJournalT,
    loading:boolean,
    onChangeFillters:(fieldName:'group_id' | 'subject_id' | 'month' | 'onlyAtts',value:string | number | undefined | boolean) => void
}
export const TeacherJournalFillters:React.FC<Props> = ({loading,groupJournal,subjectName,refetch,attestations,fillters,journal,onChangeFillters,}) => {
    const {handlePrintAndRefetch,printLoading,componentRef} = useJournalPrintForm(async () => refetch({'group_id':fillters.group_id,'subject_id':fillters.subject_id,'month':attestations?.find(att => att.active)?.name || '',onlyAtts:fillters.onlyAtts}))
    const unique_subjects = setFromSubjects([...groupJournal?.can_edit || [],...groupJournal?.can_view || []]);
    const isAdmin = useUserStore().user.security_level === securityLevels.admin;
    const {onCloseTeacherSettings,onOpenTeacherSettings,isOnTeacherSettings} = useTeacherSettingsModal();
    
    return <>
    <section className='journalTop__container'>
        {!!subjectName && <PrintForm ref={componentRef} journal={journal} subjectName={subjectName}/>}
        <LinkBack title={"Список предметів"} route={routes.pickJournalSubject + `?group_id=${groupJournal?.journal_group}`}/>
        <h1 className='journal__title'>Журнал <p className='journalGroup_groupName'>{groupJournal?.journal_group_full_name}</p></h1>
        <div className='journalFillters__container'>
            <div style={{'display':'flex','gap':'60px','flexWrap':'wrap'}}>
            <div className="adminPanelStudentList_fillterContainer fillter_container">
                <Select 
                placeholder={<div className="fillterPlaceholder_container">
                    <p className="fillter_placeholder">Місяць</p><FilterIconSvg/>
                </div>}
                className="fillter_select"
                defaultValue={attestations?.find(att => att.active)?.name}
                allowClear
                value={attestations?.find(att => att.active)?.name}
                onChange={(value) => onChangeFillters('month',value)}
                >
                    {attestations?.map(att => 
                        <Option key={att.name} value={att.name} label={att.name}>{att.name}</Option>
                    )}
                </Select>
            </div>
            <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
                    style={{height:'300px !important',overflow:'hidden'}}
                    >
                {!unique_subjects.find(sub => sub.journal_id === fillters.subject_id)?.journal_id 
                ? <div style={{width:'100px',height:'50px'}}><Loader/></div>
                : <Select 
                popupMatchSelectWidth={false}
                    placeholder={
                        <div className="fillterPlaceholder_container">
                            <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                        </div>
                    }
                    className="fillter_select"
                    style={{width:'300px !important'}}
                    // allowClear
                    loading={loading}
                    value={unique_subjects.find(sub => sub.journal_id === fillters.subject_id)?.journal_id || ''}
                    onChange={(value) => onChangeFillters('subject_id',value)}
                >
                    {!!groupJournal && 
                    setFromSubjects([...groupJournal?.can_edit,...groupJournal.can_view])
                    .map(subject => 
                        <Option key={subject.journal_id} value={subject.journal_id} label={subject.subject_full_name}>{subject.subject_full_name}</Option>
                    )}
                </Select>}
            </div>
            <div style={{'display':'flex','alignItems':'center','gap':'30px'}}>
                <Switch defaultChecked={fillters.onlyAtts} onChange={(val) => onChangeFillters('onlyAtts',val)}/>
                <span className='fillter_placeholder'>Тільки атестації</span>
            </div>
            </div>
            <div style={{'display':'flex','gap':'30px'}}>
                {isAdmin && <button onClick={onOpenTeacherSettings} className='primary_button' style={{padding:'0 46px'}}>Налаштування викладачів</button>}
                {!loading && !(!journal?.students.length || !journal.columns.length) && <button disabled={printLoading} onClick={handlePrintAndRefetch} className='primary_button' style={{width:'177px'}}>{!printLoading ? `Друк` : <Spin/>}</button>}
            </div>
        </div>
    </section>
    {!!journal?.journal_id && <TeacherSettingsModal open={isOnTeacherSettings} onClose={onCloseTeacherSettings} journalId={journal?.journal_id}/>}
    </>
}