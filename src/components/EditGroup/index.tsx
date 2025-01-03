import "./editGroupStyles.scss";
import { DatePicker, Select } from "antd";
import { useCreateUser } from "../../hooks/createUser"
import { useThemeStore } from "../../store/themeStore";
import { useChangeGroupInfo } from "../../hooks/changeGroupInfo";
import { NoMatch } from "../NoMatch";
import { Link, } from "react-router-dom";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useGetGroup } from "../../hooks/getGroup";
import { emailPattern } from "../../consts/emailPattern";
import { routes } from "../../consts/routes";
import { useGetSupervisors } from "../../hooks/getSupervisors";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { namePattern } from "../../helpers/namePattern";
import dayjs from "dayjs";
import { customDateFormat } from "../../helpers/dateFormat";
const {Option} = Select;

const userErrorCodesToMessages:Record<number,string> = {
    409:'Користувач з такою поштовою адресою вже існує!',
    422:'Некоректно введені дан!',
}
const changeErrorCodesToMessages:Record<number,string> = {
    [-1]:'Некоректна назва групи!',
    1:'Інформацію о групі змінено'
}

export const EditGroup = () => {
    const theme = useThemeStore().theme;
    const {group,groupLoading} = useGetGroup();
    const {handleSubmit,createUserRegister,onCreateUser,createUserSetValue,createUserErrorCode,createUserWatch,createUserFormErrors,createUserFormErrorMessage,createUserLoading,watch,register,setValue,contextHolder} = useCreateUser(group);
    const {onChangeGroupInfo,changeGroupRegister,changeGroupHangeSubmit,changeGroupSetValue,onChooseSupervisor,chosenSupervisorId,incorrectGroupName,changeErrorCode,validateGroupName,onInvertEngGroups,changeGroupInfoNotification} = useChangeGroupInfo(group);
    const {supervisors,supervisorsLoading} = useGetSupervisors();

    if(!groupLoading && !group) return <NoMatch is404={false} title={'Такої групи не було знайдено.'}/>

    return <div className={`editGroupMain_container ${theme}`}>
        {contextHolder}
        {changeGroupInfoNotification}
        <LinkBack title="Список груп" route={routes.adminPanel+'?section=groups'}/>
        {/* <h1 className="editGroupHeader"><Link className="editProfile_leaveButton"  to={routes.adminPanel + '?section=groups'}><LeftArrowSvg/></Link>Змінення групи</h1> */}
        <form className="createGroup_form"
            onSubmit={changeGroupHangeSubmit(onChangeGroupInfo)}
        >
            <div className="createUserFormSelects__container createGroupFormSelects__container">
                <div className="editGroupSelect__container">
                    <label className="select_label">Спеціальність та курс</label>
                    <input placeholder="Введіть назву групи" defaultValue={group?.group_full_name || ''} className="form_input" autoComplete="off" {...changeGroupRegister('group_full_name',{required:false})} onChange={e => validateGroupName(e.target.value)}/>
                </div>
                <div className="createUserSelect__container createGroupCuratorSelect__container">
                    <label className="select_label">Куратор</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть куратора'}
                            optionLabelProp="label"
                            allowClear
                            value={chosenSupervisorId}
                            defaultValue={group?.group_supervisor?.user_id}
                            loading={supervisorsLoading || !group}
                            onChange={onChooseSupervisor}
                            onClear={() => onChooseSupervisor(null)}
                            >
                                {supervisors.map(supervisor => 
                                    <Option value={supervisor.user_id} label={supervisor.full_name}>{supervisor.full_name}</Option>
                                )}
                        </Select>
                    </div>
                </div>
            </div>
            {!!changeErrorCode && <p className={`signIn_errorMessage ${changeErrorCode === 1 && 'success_message'}`}>{changeErrorCodesToMessages[changeErrorCode]}</p>}
            <div style={{'display':'flex',gap:'30px'}}>
                <input autoComplete="off"  type={'submit'} className="createUser__button primary_button" value={'Змінити'}/>
                <span onClick={onInvertEngGroups} className="createUser__button primary_button"  style={{'padding':'10px 30px'}}>Інвертувати під-групи Англійської</span>
            </div>
        </form>
        <h1 className="createUserTitle">Створення акаунту</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="select_label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  {...createUserRegister('full_name',{required:{value:true,message:'Введіть ПІБ студента!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},
                    // pattern:{value:namePattern,message:'Некоректне ПІБ!'}
                    })} className="form_input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Пошта студента</label>
                    <input autoComplete="off" {...createUserRegister('mailbox_address',{required:{value:true,message:"Введіть email"},pattern:{value:emailPattern,message:'Не коректний email!'}})} type={'email'} className="form_input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                {/* <div className="createUserEmailInput__container">
                    <label className="select_label">Інтереси</label>
                    <input autoComplete="off" 
                    {...createUserRegister('interests',{required:false})}
                    className="form_input" placeholder='Введіть інтереси студента'/>
                </div> */}
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="select_label">Додаткова посада</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть додаткову посаду студента'}
                            optionLabelProp="label"
                            {...createUserRegister('additional_job_title',{required:false})}
                            onChange={(e) => createUserSetValue('additional_job_title',e)}
                            value={createUserWatch('additional_job_title')}
                            >   
                            <Option value={"Cтароста"} label={"Cтароста"}>Cтароста</Option>
                            <Option value={"Зам. старости"} label={"Зам. старости"}>Зам. старости</Option>
                            <Option value={"Член студ. ради"} label={"Член студ. ради"}>Член студ. ради</Option>
                            <Option value={"Голова студ. ради"} label={"Голова студ. ради"}>Голова студ. ради</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="select_label">Посада</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть посаду студента'}
                            optionLabelProp="label"
                            {...createUserRegister('job_title',{required:false})}
                            onChange={(e) => createUserSetValue('job_title',e)}
                            value={createUserWatch('job_title')}
                            defaultValue={"Студент"}
                            >   
                            <Option value={"Студент"} label={"Студент"}>Студент</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserEmailInput__container">
                    <label className="select_label">Дата народження</label>
                    {/* <input autoComplete="off" 
                    {...createUserRegister('birth_date',{required:{value:true,message:'Оберіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некоректна!'}})}
                    className="form_input" placeholder='Оберіть дату народження'/> */}
                     <DatePicker
                        placeholder="Оберіть дату народження"
                        className="form_input"
                        // format={customDateFormat}
                        style={{'visibility':'visible'}}
                        // value={dayjs(watch('birth_date'))}
                        
                        {...register('birth_date',{required:{value:true,message:'Оберіть дату народження'},
                        })}
                        onChange={(e) => setValue('birth_date',e?.toDate() || null)} 
                        />
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Дата вступу</label>
                    {/* <input autoComplete="off" 
                    {...createUserRegister('admission_date',{required:{value:true,message:'Оберіть дату вступу!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата вступу некоректна!'}})}
                    className="form_input" placeholder='Оберіть дату вступу'/> */}
                    <DatePicker
                        placeholder="Оберіть дату вступу"
                        className="form_input"
                        // format={customDateFormat}
                        style={{'visibility':'visible'}}
                        // value={dayjs(watch('admission_date'))}
                        {...register('admission_date',{required:{value:true,message:'Оберіть дату вступу'},
                        })}
                        onChange={(e) => setValue('admission_date',e?.toDate() || null)} />
                </div>
                <div className="createUserSelect__container">
                    <label className="select_label">Місцезнаходження</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            {...createUserRegister('location',{required:{value:true,message:"Оберіть місцезнаходження"}})}
                            onChange={(e) => createUserSetValue('location',e)}
                            value={createUserWatch('location')}
                            >   
                            <Option value={"В Україні"} label={"В Україні"}>В Україні</Option>
                            <Option value={"За кордоном"} label={"За кордоном"}>За кордоном</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Форма навчання</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть форму навчання'}
                            optionLabelProp="label"
                            {...createUserRegister('education_form',{required:{value:true,message:"Оберіть форму навчання"}})}
                            onChange={(e) => createUserSetValue('education_form',e)}
                            value={createUserWatch('education_form',)}
                            >   
                            <Option value={"Очно"} label={"Очно"}>Очно</Option>
                            <Option value={"Дистанційно"} label={"Дистанційно"}>Дистанційно</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Бюджет/Контракт</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть тип'}
                            optionLabelProp="label"
                            {...createUserRegister('education_type',{required:{value:true,message:"Оберіть тип навчання"}})}
                            onChange={(e) => {createUserSetValue('education_type',e);e === "Контракт" && createUserSetValue('is_on_scholarships', "Ні")}}
                            value={createUserWatch('education_type')}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Отримання стипендії</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            {...createUserRegister('is_on_scholarships',{required:{value:true,message:"Оберіть чи отимує студент стипендію"}})}
                            onChange={(e) => createUserSetValue('is_on_scholarships',e)}
                            value={createUserWatch('is_on_scholarships') || null}
                            >   
                            {createUserWatch('education_type') === "Бюджет" && <Option value={"Так"} label={"Так"}>Так</Option>}
                            <Option value={"Ні"} label={"Ні"}>Ні</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                    <div className="createUserNameInput__container">
                        <label className="select_label">Номер студента</label>
                        <input autoComplete="off" type={'tel'}  {...createUserRegister('phone_number',{required:{value:true,message:'Введіть номер студента!'},minLength:{value:10,message:'Некоректний номер студента!'},})} className="form_input" placeholder='Введіть номер студента'/>
                    </div>
                    <div className="createUserNameInput__container">
                        <label className="select_label">Номер батьків</label>
                        <input autoComplete="off" type={'tel'} {...createUserRegister('parents_phone_number',{required:{value:true,message:'Введіть номер батьків!'},minLength:{value:10,message:'Некоректний номер батьків!'},})} className="form_input" placeholder='Введіть номер батьків'/>
                    </div>
                </div>
            {/* <div className="createUserFormSelects__container"> */}
            {/* </div> */}
            {!!Object.keys(createUserFormErrors).length && <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {//@ts-ignore
                Object.keys(createUserFormErrors).map(key => !!createUserFormErrors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors[key]?.message}</p>)
                }
            </div>}
            {/* {!!createUserFormErrors.full_name?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.full_name?.message}</p>}
            {!!createUserFormErrors.mailbox_address?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.mailbox_address?.message}</p>}
            {!!createUserFormErrorMessage && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrorMessage}</p>} */}
            {createUserErrorCode !== undefined && <p style={{width:'fi t-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Зареєструвати"} disabled={createUserLoading}/>
            </div>
        </form>
        <section className="studentList__container">
            <div className="studentItems__container"  style={{height:80 * Math.round((group?.group_students?.length || 0) / 2)}} >
                {group?.group_students?.sort((a,b) => a.full_name.localeCompare(b.full_name)).map(student => 
                    <div id={student?.student_id || ''} className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={student?.avatar || defaultAvatar} alt=""/>
                            <p className="studentName">{student?.full_name}</p>
                        </div>
                        <Link  className="studentButton" to={routes.userProfile.replace(':id',student?.student_id || '')}>Перейти</Link>
                    </div> 
                )}
            </div>
        </section>
    </div>
}