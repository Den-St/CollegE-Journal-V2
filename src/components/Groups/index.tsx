import { Carousel, Select, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { groupCoursesNumbers } from "../../consts/groupsCoursesNumbers";
import { routes } from "../../consts/routes";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useThemeStore } from "../../store/themeStore"
import { GroupT } from "../../types/group";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import { Students } from "../Students";
import './groupsStyles.scss';
const {Option} = Select;

export const Groups = () => {
    const theme = useThemeStore().theme;
    const {loading,groups,groupesByGrade} = useGroupsByTeacher();
    useEffect(() => {
        document.title = "Групи";
    },[]);

    if(!loading && !groups?.length) return <NoMatch is404={false} title={'У вас немає груп'}/>;

    return <div className={`groupsMain__container ${theme}`}>
        <section className="groupsTop__container">
            <h1 className="header">Список груп</h1>
            {/* <div className="groupsFillters__container">
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Рік</p> <FilterIconSvg/>
                    </div>}
                    className="fillter_select"
                    allowClear
                    >
                        <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                        <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                        <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                        <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
                        <p className="fillter_placeholder">Спеціальність</p><FilterIconSvg/>
                    </div>} 
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option>
                    </Select>
                </div>
            </div> */}
        </section>
        <section className="groupsCourses__container journalGroups">
            {
                !loading ? !!groupesByGrade && Object.keys(groupesByGrade).map(key => 
                    <div key={key} className="groupsCourseItem__container">
                        <h2 className="groupsCourseItem__title">{groupCoursesNumbers[+key]}</h2>
                        <div className="groupCourseItemGroups__container">
                            {groupesByGrade[key].map(group => 
                                <Link key={group.journal_group} to={routes.pickJournalSubject + `?group_id=${group.journal_group}`} className="groupItem__container">
                                    {group.journal_group_full_name}
                                </Link>
                            )}
                        </div>
                        <Carousel className='groups_carousel' dots slidesToShow={1}>
                            {groupesByGrade?.[key].map((group) => 
                                <Link key={group.journal_group}  to={routes.pickJournalSubject + `?group_id=${group.journal_group}`} className="groupItem__container">
                                    {group.journal_group_full_name}
                                </Link>
                            )} 
                        </Carousel>
                    </div>   
                )  : <Loader/>
            }
        </section>
    </div>
}