import { Carousel, Select, Spin, Steps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { LinkSvg } from "../../assets/svgs/linkSvg";
import { RobotSvg } from "../../assets/svgs/robotSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg"
import { dayNamesToNumbers } from "../../consts/dayNamesToNumbers";
import { lessonNumbers } from "../../consts/lessonNumbers";
import { validGroupPrefixes } from "../../consts/validGroupPrefixes";
import { useGetGroup } from "../../hooks/getGroup";
import { useGetAdminGroups } from "../../hooks/getGroups";
import { DaysNumbersT } from "../../types/daysNames";
import { GroupT } from "../../types/group";
import { SplitedLessonT } from "../../types/user";
import { CheckScheduleSettingsModal } from "../CheckScheduleSettingsModal";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import "./scheduleSettings.scss";
import { SemesterSettings } from "./SemesterSettings";
const {Option} = Select;


export const ScheduleSettings = () => {
    useEffect(() => {
        document.title = 'Налаштування розкладу';
    },[])
    const dayNumber = new Date().getDay();
    const [pickedGroupId,setPickedGroupId] = useState<string>();
    const {group,groupLoading,fetchGroup} = useGetGroup(pickedGroupId);
    const {groups,groupsLoading} = useGetAdminGroups();
    useEffect(() => {
        fetchGroup(pickedGroupId);
    },[pickedGroupId]);
  

    return <div className={`adminPanelScheduleSettings__container`}>
        <SemesterSettings/>
        <div className="fillter_container">
            <Select 
                placeholder={<div className="fillterPlaceholder_container">
                    <p className="fillter_placeholder">Група</p> <FilterIconSvg/>
                </div>}
                onChange={setPickedGroupId}
                value={pickedGroupId}
                className="fillter_select"
                allowClear
                onClear={() => setPickedGroupId(undefined)}
            >
                {groups.map(group => <Option value={group.group_id} label={group.group_full_name} key={group.group_id}>{group.group_full_name}</Option>)}
            </Select>
        </div>
        {!groupLoading ? !!pickedGroupId ? Object.keys(group?.timetable || {}).length ? <><section className={`lessonsSchedule__container`}>
            {Object.keys(group?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                    {lessonNumbers.map(lessonNumber =>
                            group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.split ? 
                            <>
                            <div key={dayKey + (group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">*{(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["*"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            <div key={dayKey + (group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber"></p>
                                <p className="lessonsScheduleLessonName">**{(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["**"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            </>
                            : <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string ? <Link to={group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </section>
        <Carousel className='lessonsScheduleDayCarousel' dots slidesToShow={1} initialSlide={Object.keys(group?.timetable || {}).findIndex((day,i) => i + 1 === dayNumber)}>
            {Object.keys(group?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                    {lessonNumbers.map(lessonNumber =>
                            group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.split ? 
                            <>
                            <div key={dayKey + (group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">*{(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["*"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            <div key={dayKey + (group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber"></p>
                                <p className="lessonsScheduleLessonName">**{(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["**"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            </>
                            : <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string ? <Link to={group?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </Carousel>
        </>
        : <NoMatch isChildren title="На жаль, розклад ще не завантажен" description="Зазвичай розклад генерується у 10-тих числах місяця"/>
        : <NoMatch isChildren title="Розклад не обрано" description="Оберіть групу зі списку"/>
        : <Loader/>}
    </div>
}