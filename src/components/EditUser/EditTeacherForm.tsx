import { Select } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { emailPattern } from "../../consts/emailPattern";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { namePattern } from "../../helpers/namePattern";
import { useNotification } from "../../hooks/notification";
import { useSendPassword } from "../../hooks/sendPasswordLetter";
import { useUserStore } from "../../store/userStore";
import { EditUserTeacherT } from "../../types/user";
import { UserProfileT } from "../../types/userProfile";
const {Option} = Select;

const useEditUserTeacher = (user:UserProfileT) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors},
    } = useForm<EditUserTeacherT>();
    const token = useUserStore().user.token;
    const user_id = useParams().id;
    const navigate = useNavigate();

    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Дані користувача ${user.full_name} змінено`,
        `Дані користувача ${user.full_name} змінено`,
        `Дані користувача ${user.full_name} не змінено`,
        `Дані користувача ${user.full_name} не змінено`);

    const onEdit = async (data:EditUserTeacherT) => {
        if(!user_id) return;
        const {user_type,...clearData} = data;
        try{
            const res = await axiosConfig.put(endpoints.editUser,{...clearData,user_id,},{headers:{Authorization:token}})
            navigate(routes.userProfile.replace(':id',user_id));
        }catch(err){
            console.error(err);
        }
    }
 
    const fetch = async () => {
        Object.keys(user).forEach((key) => {
            if(Object.keys(watch()).includes(key)) {
                //@ts-ignore
                setValue(key, user[key] || null);
            }
        });
    }

    useEffect(() => {
        fetch();
    }, [user])
  
    return {onEdit,register,handleSubmit,setValue,watch,reset,errors,user,changeTeacherNotification:contextHolder};
}
type Props = {
    user:UserProfileT
}

export const EditTeacherForm:React.FC<Props> = ({user}) => {
    const {onEdit,register,handleSubmit,setValue,watch,reset,errors,changeTeacherNotification} = useEditUserTeacher(user);
    const {onSendLetter,contextHolder} = useSendPassword();
    const mySecurityLevel = useUserStore().user.security_level;
    const navigate = useNavigate();
    const userId = useParams().id;
    const from = useSearchParams()[0].get('from');
    
    return <>
    {changeTeacherNotification}
    {contextHolder}
    <section className='studentProfileMain__container' style={{'width':'100%'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'30px','width':'100%'}}>
            {!!userId && <LinkBack title="Профіль викладача" route={!from ? routes.userProfile.replace(':id',userId) : routes.userProfile.replace(':id',userId) + '?from=' + from}/>}
            <h1 className="header">Редагування профілю</h1>
            <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <div style={{'display':'flex','flexDirection':'column',gap:'15px','alignItems':'center'}}>
                    <img className='studentProfile_img' src={
                        watch('avatar') || 
                        defaultAvatar
                    }/>
                    <button onClick={() => setValue('avatar',null)} className="primary_button" style={{'fontFamily':'Alegreya Sans'}}>Видалити фото</button>
                    </div>
                    <div className='studentProfileTextInfo__container'>
                        <p className='studentProfile__name'>
                            {user?.full_name}
                            {/* {user?.security_level !== securityLevels.admin &&  <StarSvg/>} */}
                        </p>
                        {/* <p className='studentProfile__email'>{
                        user?.mailbox_address || 
                        `mail@gmail.com`}</p> */}
                        {
                        !!user?.user_group?.group_full_name && 
                        mySecurityLevel !== securityLevels.admin 
                        ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                            {user?.user_group?.group_full_name || `Група-00`}
                            </Link> 
                        : <Link to={routes.pickJournalSubject 
                            + 
                            `?group_id=${user?.user_group?.group_id}`
                            } className='studentProfile__group'>
                            {user?.user_group?.group_full_name || `Група-00`}
                        </Link>}
                    </div>
                </div>
            </div>
            <button className="primary_button" onClick={onSendLetter} style={{'width':'320px','height':'68px'}}>Запит зміни паролю</button>
            </div>
        </div>
    </section>
    <form className="createUserForm" 
    onSubmit={handleSubmit(onEdit)}
    >
        <input style={{'display':'none'}} {...register('avatar')}/>
        <input style={{'display':'none'}} {...register('department')}/>
        <input style={{'display':'none'}} {...register('interests')}/>
        <div className="createUserFormInputs__container">
            <div className="createUserNameInput__container">
                <label className="select_label">Ім’я (ПІБ)</label>
                <input autoComplete="off"  
                {...register('full_name',{required:{value:true,message:'Введіть ПІБ викладача!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},
                // pattern:{value:namePattern,message:'Некоректне ПІБ!'}
            })} 
                className="form_input" placeholder='Введіть ПІБ студента'/>
            </div>
            <div className="createUserEmailInput__container">
                <label className="select_label">Пошта викладача</label>
                <input autoComplete="off" 
                {...register('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не коректний email!'}})} 
                type={'email'} className="form_input" placeholder='Введіть пошту викладача'/>
            </div>
        </div>
        <div className="createUserFormInputs__container">
            <div className="createUserSelect__container" style={{width:'43%'}}>
                <label className="select_label">Телефонний номер викладача</label>
                <input autoComplete="off"
                {...register('phone_number',{required:{value:true,message:'Введіть телефонний номер'}})}
                className="form_input" placeholder='Телефонний номер викладача'/>
            </div>
            <div className="createUserSelect__container" style={{width:'55%'}}>
                <label className="select_label">Циклова комісія</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть циклову комісію'}
                        optionLabelProp="label"
                        {...register('department',{required:true})}
                        onChange={(e) => setValue('department',e)}
                        value={watch('department')}
                        >   
                        <Option value={"Циклова комісія іноземних мов"} label={"Циклова комісія іноземних мов"}>Циклова комісія іноземних мов</Option>
                        <Option value={"Циклова комісія інформаційних технологій"} label={"Циклова комісія інформаційних технологій"}>Циклова комісія інформаційних технологій</Option>
                        <Option value={"Циклова комісія гуманітарної та соціально-економічної підготовки"} label={"Циклова комісія гуманітарної та соціально-економічної підготовки"}>Циклова комісія гуманітарної та соціально-економічної підготовки</Option>
                        <Option value={"Циклова комісія телекомунікацій та радіотехніки"} label={"Циклова комісія телекомунікацій та радіотехніки"}>Циклова комісія телекомунікацій та радіотехніки</Option>
                        <Option value={"Циклова комісія природничо-матетматичної підготовки"} label={"Циклова комісія природничо-матетматичної підготовки"}>Циклова комісія природничо-матетматичної підготовки</Option>
                        <Option value={"Інше"} label={"Інше"}>Інше</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div className="createUserFormInputs__container">
            <div className="createUserSelect__container" style={{width:'55%'}}>
                <label className="select_label">Посада</label>
                <input autoComplete="off" 
                {...register('job_title',{required:{value:true,message:'Введіть посаду викладача'}})}
                className="form_input" placeholder='Введіть посаду викладача'/>
                {/* <div className="select_wrapper"> */}
                    {/* <Select
                        className="createUserSelect"
                        placeholder={'Оберіть посаду студента'}
                        optionLabelProp="label"
                        {...register('job_title',{required:{value:true,message:'Введіть посаду студента'}})}
                        onChange={(e) => setValue('job_title',e)}
                        value={watch('job_title')}
                        >   
                        <Option value={"Студент"} label={"Студент"}>Викладач</Option>
                        <Option value={"Староста"} label={"Староста"}>Староста</Option>
                    </Select> */}
                {/* </div> */}
            </div>
            <div className="createUserSelect__container" style={{width:'55%'}}>
                <label className="select_label">Додаткова посада</label>
                <input autoComplete="off" 
                {...register('additional_job_title',{required:{value:false,message:'Введіть додаткову посаду викладача'}})}
                className="form_input" placeholder='Введіть додаткову посаду викладача'/>
                {/* <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть додаткову посаду викладача'}
                        optionLabelProp="label"
                        {...register('additional_job_title',{required:false})}
                        onChange={(e) => setValue('additional_job_title',e)}
                        value={watch('additional_job_title')}
                        >
                        <Option value={"Додаткова посада 1"} label={"Додаткова посада 1"}>Додаткова посада 1</Option>
                        <Option value={"Додаткова посада 2"} label={"Додаткова посада 2"}>Додаткова осада 2</Option>
                    </Select>
                </div> */}
            </div>
        </div>
        {!!Object.keys(errors).length && <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {//@ts-ignore
            Object.keys(errors).map(key => !!errors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{errors[key]?.message}</p>)
            }
        </div>}
        <div className="createUserButtons__container">
            <input 
            // disabled={createUserDisabled} 
            autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Змінити"} 
            // disabled={createUserLoading}
            />
            {/* <input 
            autoComplete="off" type={"submit"} className="createUser__button primary_button" style={{'width':'unset'}} value={"Видалити випадково створений запис"} 
            /> */}
        </div>
    </form></>
}

