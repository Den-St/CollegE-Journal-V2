import { Carousel, Modal, Select, Spin } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { groupCoursesNumbers } from "../../consts/groupsCoursesNumbers";
import { routes } from "../../consts/routes";
import { useCreateGroupForm } from "../../hooks/createGroupForm";
import { useGetAdminGroups } from "../../hooks/getGroups";
import { useThemeController } from "../../hooks/themeController"
import { CreateGroupT, GroupT } from "../../types/group";
import { Loader } from "../Loader/Loader";
const {Option,} = Select;

const errorCodes:Record<number,string> = {
    [-1]:'Некоректна назва групи',
    0:'Група з такою назвою вже існує'
}

export const StudentsListAdmin = () => {
    useEffect(() => {
        document.title = 'Налаштування груп';
    },[])
    const theme = useThemeController().theme;
    const {groups,refetchGroups,groupsLoading,groupesByGrade} = useGetAdminGroups();
    const {createGroupModalOpened,onCloseCreateGroupModal,onOpenCreateGroupModal,handleSubmit,register,onCreateGroup,errorCode,validateGroupName} = useCreateGroupForm(refetchGroups);

    return <div className={`adminStudentListContainer ${theme}`}>
        <section className="studentTitle__container">
            {/* <h1 className="studentTitle">Список студентів</h1> */}
            <div className="studentFilltersAdminPanel__container">
                {/* <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                    </div>} 
                    >
                        <Option value={'random hashtag'} label={'random hashtag '}>random hashtag  <FilterIconSvg/></Option>
                        <Option value={'random hashtag1'} label={'random hashtag1'}>random hashtag1 <FilterIconSvg/></Option>
                        <Option value={'random hashtag2'} label={'random hashtag2'}>random hashtag2 <FilterIconSvg/></Option>
                        <Option value={'random hashtag3'} label={'random hashtag3'}>random hashtag3 <FilterIconSvg/></Option>
                        <Option value={'random hashtag4'} label={'random hashtag4'}>random hashtag4  <FilterIconSvg/></Option>
                    </Select>
                </div> */}
                <div className="adminPanelStudentList_conrollersContainer">
                    <button className="adminPanelStudentList_add primary_button" onClick={onOpenCreateGroupModal}>Додати групу</button>
                    {/* <Link to={routes.teachers} className={'adminPanelStudentList_teachers_link'}>Викладачі</Link> */}
                    <Link to={routes.createTeacher} className="adminPanelStudentList_add primary_button">Додати викладача</Link>
                    {/* <button className="adminPanelStudentList_save">Зберити</button> */}
                </div>
            </div>
        </section>
        <Modal centered open={createGroupModalOpened} onCancel={onCloseCreateGroupModal} footer={false}>
            <form className="createGroup_form" onSubmit={handleSubmit(onCreateGroup)}>
                <div className="createUserFormSelects__container createGroupFormSelects__container">
                    <div className="createUserSelect__container createGroupSelect__container">
                        <label className="select_label">Спеціальність та курс</label>
                        {/* <div className="select_wrapper">
                            <Select
                                className="createUserSelect"
                                placeholder={'Оберіть групу'}
                                optionLabelProp="label"
                                >   
                                <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            </Select>
                        </div> */}
                        <input placeholder="Назва групи" autoComplete="off" {...register('group_full_name',{required:true})} className="form_input" onChange={(e) => validateGroupName(e.target.value)}/>
                        {errorCode !== undefined && <p className="signIn_errorMessage"> {errorCodes[errorCode]}</p>}
                    </div>
                    {/* <div className="createUserSelect__container createGroupCuratorSelect__container">
                        <label className="select_label">Куратор</label>
                        <div className="select_wrapper">
                            <Select
                                className="createUserSelect"
                                placeholder={'Оберіть куратора'}
                                optionLabelProp="label"
                                >   
                                <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                                <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                                <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                                <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                                <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                            </Select>
                        </div>
                    </div> */}
                </div>
                <input autoComplete="off"  type={'submit'} className="createUser__button primary_button" value={'Зареєструвати'}/>
            </form>
        </Modal>
        <section className="groupsCourses__container">
            {!groupsLoading && !!groupesByGrade ? Object.keys(groupesByGrade).map(key => 
                <div className="groupsCourseItem__container">
                    <h2 className="groupsCourseItem__title">{groupCoursesNumbers[+key]}</h2>
                    <div className="groupCourseItemGroups__container">
                        {groupesByGrade?.[key].map((group:GroupT) => 
                            <Link  to={routes.editGroup.replace(':id',group.group_id)} className="groupItem__container">
                                {group.group_full_name}
                            </Link>
                        )}
                    </div>
                    <Carousel className='adminPanelGroups_carousel' dots slidesToShow={1}>
                        {groupesByGrade?.[key].map((group:GroupT) => 
                            <Link  to={routes.editGroup.replace(':id',group.group_id)} className="groupItem__container">
                                {group.group_full_name}
                            </Link>
                        )} 
                    </Carousel>
                </div>
            ) : <Loader/>}
        </section>
    </div>
}