import { Carousel, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { setFromSubjects } from "../../helpers/setFromObjects";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useTeachersGroupsStore } from "../../store/teachersGroupsStore"
import { useUserStore } from "../../store/userStore";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import './subjectsStyles.scss';

export const TeacherSubjects = () => {
    const userSecurityLevel = useUserStore().user.security_level;
    const {loading,groups} = useGroupsByTeacher();
    const pickedGroupId = useSearchParams()[0].get('group_id');
    const group = groups.find(group => group.journal_group === pickedGroupId);

    useEffect(() => {
        document.title = `Предмети групи - ${group?.journal_group_full_name}`;
    },[group]);
    
    if(loading) return <Loader/>
    if(!group) return <NoMatch is404={false} title={"Предметів за групою не знайдено"}/>

    return <section className="subjectsMainContainer">
        {/* <h2 className="subjectsMainTitle"><Link to={routes.groups} className={'leftArrowButton'}><LeftArrowSvg/></Link>Предмети</h2> */}
        <LinkBack title={"Список груп"} route={routes.groups}/>
        <h1 className="header">Обрати предмет</h1>
        <h2 className="subjectsMainTitle">Предмети</h2>
        <div className="subjectsContainer">
            {setFromSubjects([...group.can_edit,...group.can_view]).map((subject,i) => 
                <Link key={subject.journal_id} to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject.journal_id}`} className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                    <p className="subjectTeacherName">{subject.teacher}</p>
                </Link>
            )}
        {/* {subjects.map((subject,i) => <Link to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject}&month=${lastMonth}`} className={`homeTasks_subject ${!subject.isActive && 'inactive'}`}>{subject.name}{i === 2 && <div className="newTask"/>}</Link>)} */}
        </div>
        <Carousel className='subjects_carousel' dots slidesToShow={1}>
            {setFromSubjects([...group.can_edit,...group.can_view]).map((subject,i) => 
                <Link  key={subject.journal_id} to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject.journal_id}`} className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                    <p className="subjectTeacherName">{subject.teacher}</p>
                </Link>
            )}
        </Carousel>
        {(group?.is_supervisor || (userSecurityLevel === securityLevels.admin)) && <>
            <h2 className="header">Зведені таблиці</h2>
            <div className="subjectsContainer">
                <Link to={routes.monthAttestations + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Атестації за місяць
                </Link>
                <Link to={routes.semesterAttestations + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Атестації за поточний семестр
                </Link>
                <Link to={routes.absenceTable + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Список відсутніх за тиждень
                </Link>
                
            </div>
            <Carousel className='subjects_carousel' dots slidesToShow={1}>
                <Link to={routes.monthAttestations + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Атестації за місяць
                </Link>
                <Link to={routes.semesterAttestations + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Атестації за поточний семестр
                </Link>
                <Link to={routes.absenceTable + `?group_id=${pickedGroupId}`} className={`homeTasks_subject`}>
                    Список відсутніх за тиждень
                </Link>
            </Carousel></>}
        <section className="studentList__container">
            <h2 className="subjectsMainTitle">Список студентів</h2>
            <div className="studentItems__container" style={{height:80 * Math.round(group.group_students.length / 2)}}>
                {group.group_students.sort((a,b) => a.full_name.localeCompare(b.full_name)).map((student,i) => 
                    <div className="student__container" key={student.student_id}>
                        <div className="student__info">
                            <img className="studentList__avatar" src={student.avatar || defaultAvatar} alt=""/>
                            <p className="studentName">{i+1+`. `}{student.full_name}</p>
                        </div>
                        <Link className="studentButton" to={routes.userProfile.replace(':id',student.student_id || '')}>Перейти</Link>
                    </div>
                )}
            </div>
            <Carousel slidesPerRow={10} className={'students_carousel'}>
                    {group.group_students.sort((a,b) => a.full_name.localeCompare(b.full_name)).map((student,i) => 
                        <div className="student__container" key={student.student_id}>
                            <div className="student__info">
                                <img className="studentList__avatar" src={student.avatar || defaultAvatar} alt=""/>
                                <p className="studentName">{i+1+`. `}{student.full_name}</p>
                            </div>
                            <Link className="studentButton" to={routes.userProfile.replace(':id',student.student_id || '')}>Перейти</Link>
                        </div>
                    )}
            </Carousel>
        </section>
    </section>
}