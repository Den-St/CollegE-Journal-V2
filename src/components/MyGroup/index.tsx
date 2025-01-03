import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes"
import { useUserStore } from "../../store/userStore";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";

const useGetMyGroup = () => {
    const [students,setStudents] = useState<{avatar:string,full_name:string,student_id:string}[]>([]);
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;

    const fetch = async () => {
        try{
            setLoading(true);
            const res = await axiosConfig.get(endpoints.myGroup,{headers:{Authorization:token}});
            setStudents(res.data.students);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    },[token]);

    return {students,loading};
}

export const MyGroup = () => {
    const {students,loading} = useGetMyGroup();

    useEffect(() => {
        document.title = "Моя група"
    },[])
    if(loading) return <Loader/>
    if(!students.length && !loading) return <NoMatch title="Групи не знайдено"/>

    return <div style={{padding:'229px 7% 0',display:'flex',gap:'60px',flexDirection:'column'}}>
        <LinkBack title={'Профіль'} route={routes.myProfile}/>
        <h2 className="header">Мої одногрупники</h2>
        <section className="studentList__container">
            <div className="studentItems__container" style={{height:80 * Math.round((students?.length || 0) / 2)}}>
                {!!students.length ? students.sort((a,b) => a.full_name.localeCompare(b.full_name)).map(
                    (student,i) => <div key={student.student_id} className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={student.avatar || defaultAvatar} alt="Аватар"/>
                            <p className="studentName">{i+1}. {student.full_name}</p>
                        </div>
                        <Link className="studentButton" to={routes.userProfile.replace(':id', student.student_id)}>Перейти</Link>
                    </div> 
                ) : <NoMatch title="Групи не знайдено" is404 />}
            </div>
            <Carousel slidesPerRow={10} className={'students_carousel'}>
                    {students?.sort((a,b) => a.full_name.localeCompare(b.full_name)).map(student => 
                        <div className="student__container" key={student.student_id}>
                            <div className="student__info">
                                <img className="studentList__avatar" src={student.avatar || defaultAvatar} alt=""/>
                                <p className="studentName">{student.full_name}</p>
                            </div>
                            <Link className="studentButton" to={routes.userProfile.replace(':id',student.student_id || '')}>Перейти</Link>
                        </div>
                    )}
            </Carousel>
        </section>
    </div>
    
}