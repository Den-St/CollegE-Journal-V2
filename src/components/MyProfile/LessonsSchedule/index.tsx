import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { LinkSvg } from '../../../assets/svgs/linkSvg';
import { dayNamesToNumbers } from '../../../consts/dayNamesToNumbers';
import { lessonNumbers } from '../../../consts/lessonNumbers';
import { routes } from '../../../consts/routes';
import { useThemeStore } from '../../../store/themeStore';
import { useUserStore } from '../../../store/userStore';
import { DaysNumbersT } from '../../../types/daysNames';
import { SplitedLessonT } from '../../../types/user';
import { NoMatch } from '../../NoMatch';
import './lessonsSchedule.scss';

export const TeacherSchedule = () => {
    const theme = useThemeStore().theme;
    const now = new Date();
    const dayNumber = now.getDay();
    const {user} = useUserStore();
    //http://localhost:3000/journal?group_id=65ab8eaa232ce2e6fb13cbdc&subject_id=65cf75264d50d4ed0442632e&attestations=0
    //http://localhost:3000/journal?group_id=65ab8eaa232ce2e6fb13cbdc&subject_id=65cf71d809dbc365902073e3&attestations=0
    if(Object.keys(user.timetable || {}).length && !user.timetable?.[5] && !!user.timetable){
        user.timetable[5] = [
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false,
                subject_id:'',
                journal_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false,
                subject_id:'',
                journal_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false,
                subject_id:'',
                journal_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false,
                subject_id:'',
                journal_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false,
                subject_id:'',
                journal_id:''
            },
        ];
    }

    return <section className={`lessonsSchedule__container ${theme}`}>
        <div style={{width:'100%',display:'flex',justifyContent:'space-between','paddingLeft':'60px'}}><h1 className='studentProfileTab__title'>Розклад пар</h1><button className='primary_button' style={{'width':'180px'}}>Посилання</button></div>
        {Object.keys(user?.timetable || {}).length ? 
        <>
        <section className={`lessonsSchedule__container`}>
            {Object.keys(user?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.split ? 
                            <>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">*{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['*'] 
                                        ? <Link to={routes.pickJournalSubject+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as SplitedLessonT)['*']}}`} className='teacherTimetable_groupName'>{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['*']}
                                        </Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber"></p>
                                <p className="lessonsScheduleLessonName">**{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['**'] 
                                        ? <Link to={routes.journal+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as SplitedLessonT)['**']}&subject_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.journal_id as SplitedLessonT)['**']}`} className='teacherTimetable_groupName'>
                                            {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['**']}
                                        </Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                            </>
                            : <div key={dayKey + user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">{user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as string) ? <Link to={
                                        routes.journal+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as string)}&subject_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.journal_id as string)}&attestations=0`
                                        // '#'
                                        } className='teacherTimetable_groupName'>{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as string)}</Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
        </section>
        <Carousel className='lessonsScheduleDayCarousel' dots slidesToShow={1} initialSlide={Object.keys(user?.timetable || {}).findIndex((day,i) => i + 1 === dayNumber)}>
            {Object.keys(user?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.split ? 
                            <>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">*{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['*'] 
                                        ? <Link to={routes.journal+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as SplitedLessonT)['*']}&subject_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.journal_id as SplitedLessonT)['*']}`} className='teacherTimetable_groupName'>{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['*']}
                                        </Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber"></p>
                                <p className="lessonsScheduleLessonName">**{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['**'] 
                                        ? <Link to={routes.journal+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as SplitedLessonT)['**']}&subject_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.journal_id as SplitedLessonT)['**']}`} className='teacherTimetable_groupName'>
                                            {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as SplitedLessonT)['**']}
                                        </Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                            </>
                            : <div key={dayKey + user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">{user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as string) ? <Link to={
                                        routes.journal+`?group_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_id as string)}&subject_id=${(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.journal_id as string)}&attestations=0`
                                        // '#'
                                        } className='teacherTimetable_groupName'>{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.group_full_name as string)}</Link> :<p className='teacherTimetable_groupName'>-</p>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
        </Carousel>
        </>
        : <NoMatch isChildren title="На жаль, розклад ще не завантажен" description="Зазвичай розклад генерується у 10-тих числах місяця"/>}
    </section>
}