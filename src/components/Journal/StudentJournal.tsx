import { Select, Switch, Tooltip } from 'antd';
import { useEffect } from 'react';
import { LinkBack } from '../../assets/components/LinkBack/LinkBack';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { JournalPortraitModeWarning } from '../../assets/svgs/journalPortraitModeWarningSvg';
import { lessonTypesNamesAbbreviations } from '../../consts/lessonTypesNamesAbbreviations';
import { routes } from '../../consts/routes';
import { useStudentJournal } from '../../hooks/studentJournal';
import { useStudentSubjects } from '../../hooks/studentSubjects';
import { useJournalDragScroll } from '../../hooks/useJournalDragScroll';
import { useThemeStore } from '../../store/themeStore';
import { JournalAttestationT } from '../../types/journalAttestation';
import { StudentJournalFilltersT } from '../../types/studentJournalFillters';
import { Loader } from '../Loader/Loader';
import { NoMatch } from '../NoMatch';
import { getColorByValue } from './CellInput';
import './journalStyles.scss';
const {Option} = Select;

export const StudentJournal = () => {
    const theme = useThemeStore().theme;
    const {loading,journal,fillters,onChangeFillters,columnByMonth,attestations} = useStudentJournal()
    const {journalSubjects} = useStudentSubjects();
    const subjects = journalSubjects.subjects;
    const currentSubjectName = subjects.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
    
    useEffect(() => {
        const subjectName = subjects.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
        if(!subjectName){
            document.title = `Журнал`;
            return;
        }
        document.title = `Журнал - ${subjectName} - ${attestations?.find(att => att.active)?.name || 'Увесь семестр'}`;
    },[fillters.subject_id,fillters.month,journal,subjects]);
    const {mouseUpHandler,mouseDownHandler,onMouseMove,cellsRef,handleHorizontalScroll,handleHorizontalScrollLessonTypes,lessonTypesRef} = useJournalDragScroll();

    return <div onMouseUp={mouseUpHandler} className={`journalMain__container ${theme}`}>
        <StudentJournalFillters subjects={subjects} attestations={attestations} fillters={fillters} onChangeFillters={onChangeFillters} loading={loading}/>
        {loading ? <Loader/>
        : !journal?.columns.length ? <NoMatch isChildren title="Журнал пустий"/> 
        : <>
        <section className='journal_portraitModeWarning'>
                <JournalPortraitModeWarning/>
                <p className='journal_portraitModeWarning_header'>Халепа, треба перевернути телефон</p>
                <p className='journal_portraitModeWarning_description'>Переверніть телефон у альбомний режим, тільки так можливо передивитися журнал</p>
        </section>
        <section className='journal__container'>
            {attestations?.some(att => att.active) && 
            <div className='journalLeft__container'
            onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
            onMouseMove={onMouseMove}>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>" У жовтні кожного року проходить акція«відрахуй випускника» "</p>
                </div>
                <div className='journalColumnsCenter__container'
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                    onMouseMove={onMouseMove} onScroll={handleHorizontalScrollLessonTypes} ref={lessonTypesRef}>
                    {journal.columns.map(column => <div key={column.column_index} className={`journalColumnsCenterItem__container ${!column.date.includes('.') && 'specialLessonType_student'}`}>
                            <div className={`journalColumnsCenterItemType ${(column.date.includes('.') || !column.lesson_type) && `transparent`}`}>
                                {!column.date.includes('.') && !!column.lesson_type &&
                                <Tooltip title={column.lesson_type}>
                                    <div className='journalColumnsCenterItemType'>{lessonTypesNamesAbbreviations[column.lesson_type] || ''}</div>
                                </Tooltip>}
                            </div>
                            <div className='journalColumnsCenterItemDate__container'>
                                <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')[0]}</p>
                                <p className='journalColumnsCenterItemDate'>{column.date.split('\n')[1]}</p>
                            </div>
                    </div>)}
                </div>
            </div>}
            <div className='journalRight__container' style={{height:'unset'}}
            // ref={cellsRef} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={onMouseMove}
            // onScroll={handleHorizontalScroll}
            >
                {attestations?.some(att => att.active) && <div className='journalRightColumns__container'>
                        <div className='journalRowItemLeft__container'>
                            <p className='journalRowItemLeft__name'>{currentSubjectName}</p>
                        </div>
                    </div>}
                <div className='journalRightRowsContainer' 
                style={{position:'unset',width:!attestations?.some(att => att.active) ? '100%' : 'calc(100% - 332px)','overflowY':'scroll'}} 
                onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={onMouseMove}
                ref={cellsRef} onScroll={handleHorizontalScroll}>
                    {!attestations?.some(att => att.active) ? columnByMonth?.map((columns,i) => 
                    <div style={{'display':'flex'}} key={columns[0]?.column_index}>
                        {fillters.onlyAtts && <p className='studentJournal_monthName'>{columns[0].date}</p>}
                        <div>
                        {<div className='journalRowItemCenter__container' style={{marginBottom:'30px',justifyContent:'unset',marginLeft:!attestations?.some(att => att.active) ? 'unset' : '66px'}}>
                            {columns.map(column => 
                                <div key={column?.column_index} className={`journalColumnsCenterItem__container ${!column.date.includes('.') && 'specialLessonType_student'}`}>
                                    {column.date.includes('.') 
                                    ? <div className='journalColumnsCenterItemDate__container'>
                                        <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')?.[0]}</p>
                                        <p className='journalColumnsCenterItemDate'>{column.date.split('\n')?.[1]}</p>
                                    </div>
                                    :  <Tooltip title={column.lesson_type}>
                                        <div className='journalColumnsCenterItemDate__container'>
                                            <p className='journalColumnsCenterItemDateDay'>
                                                {column.lesson_type ? lessonTypesNamesAbbreviations[column.lesson_type] : column.date.split('\n')[0]}
                                            </p>
                                        </div>
                                    </Tooltip>
                                    }
                                    
                                </div>
                            )}
                        </div>}
                        <div className='journalRowItemCenter__container' style={{marginBottom:'30px',marginLeft:!attestations?.some(att => att.active) ? 'unset' : '66px'}}
                        >
                            {columns.map(column => 
                                <div key={column?.column_index + column.date} className={`journalRowItemCenterValue__container ${!column.date.includes('.') && 'specialLessonType_student'}`}><p className='journalRowItemCenterValue__text' style={{color:getColorByValue(column.cells[0]?.value,journal.subject_system)}}>{column.cells[0]?.value}</p></div>
                            )}
                        </div>
                        </div>
                    </div>
                    ) : <div className='journalRowItemCenter__container' style={{marginBottom:'30px',marginLeft:!attestations?.some(att => att.active) ? 'unset' : '66px'}}
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={onMouseMove}
                    ref={cellsRef} onScroll={handleHorizontalScroll}
                    >
                        {journal.columns.map(column => 
                            <div key={column?.column_index + column.date} className={`journalRowItemCenterValue__container ${!column.date.includes('.') && 'specialLessonType_student'}`}><p className='journalRowItemCenterValue__text' style={{color:getColorByValue(column.cells[0]?.value,journal.subject_system)}}>{column.cells[0]?.value}</p></div>
                        )}
                    </div>}
                </div>
            </div>
        </section>
        </>}
    </div>
}

type Props = {
    fillters:StudentJournalFilltersT,
    attestations?:JournalAttestationT[],
    loading:boolean,
    onChangeFillters:(fieldName: 'subject_id' | 'month' | 'onlyAtts',value:string | undefined | boolean) => void,
    subjects:{
        subject_full_name:string,
        journal_id:string
    }[]
}

const StudentJournalFillters:React.FC<Props> = ({attestations,onChangeFillters,fillters,loading,subjects}) => {
    return <section className='journalTop__container'>
        <LinkBack title={"Список предметів"} route={routes.pickJournalSubject}/>
        <h1 className='journal__title'>Журнал</h1>
        <div className='journalFillters__container' style={{'justifyContent':'unset'}}>
            <div className="adminPanelStudentList_fillterContainer fillter_container">
                <Select 
                popupMatchSelectWidth={false}
                placeholder={<div className="fillterPlaceholder_container">
                    <p className="fillter_placeholder">Місяць</p>
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
            <div className="adminPanelStudentList_fillterContainer fillter_container">
                <Select 
                popupMatchSelectWidth={false}
                    placeholder={
                        <div className="fillterPlaceholder_container">
                            <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                        </div>
                    } 
                    className="fillter_select"
                    // allowClear
                    loading={loading}
                    value={fillters.subject_id}
                    onChange={(value) => onChangeFillters('subject_id',value)}
                >
                    {!!subjects.length && 
                    subjects
                    .map(subject => 
                        <Option key={subject.journal_id} value={subject.journal_id} label={subject.subject_full_name}>{subject.subject_full_name}</Option>
                    )}
                </Select>
            </div>
            <div style={{'display':'flex','alignItems':'center','gap':'30px'}}>
                <span className='fillter_placeholder'>Тільки атестації</span>
                <Switch defaultChecked={fillters.onlyAtts} onChange={(val) => onChangeFillters('onlyAtts',val)}/>
            </div>
        </div>
    </section>
}