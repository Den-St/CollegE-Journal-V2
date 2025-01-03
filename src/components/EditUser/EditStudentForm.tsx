import { Select, DatePicker, Modal,} from "antd";
import dayjs from "dayjs";
import { useState, useEffect,  } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { emailPattern } from "../../consts/emailPattern";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { customDateFormat } from "../../helpers/dateFormat";
import { useNotification } from "../../hooks/notification";
import { useSendPassword } from "../../hooks/sendPasswordLetter";
import { useUserStore } from "../../store/userStore";
import { EditUserStudentT } from "../../types/user";
import { UserProfileT } from "../../types/userProfile";
import { ExpelStudentModal } from "./ExpelStudentModal";
const {Option} = Select;

const useEditUserStudent = (user:UserProfileT) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors},
    } = useForm<EditUserStudentT>();
    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Дані користувача ${user.full_name} змінено`,
        `Дані користувача ${user.full_name} змінено`,
        `Дані користувача ${user.full_name} не змінено`,
        `Дані користувача ${user.full_name} не змінено`);

    const token = useUserStore().user.token;
    const user_id = useParams().id;
    const navigate = useNavigate();
    const onEdit = async (data:EditUserStudentT) => {
        if(!user_id) return;
        const {user_type,...clearData} = data;
        const admission_date = !!data.admission_date?.getTime ? Math.round((data.admission_date?.getTime() || 0)/1000) : null;
        const birth_date = !!data.birth_date?.getTime ? Math.round((data.birth_date?.getTime() || 0)/1000) : null;
        try{
            const res = await axiosConfig.put(endpoints.editUser,{...clearData,user_id,admission_date,birth_date, avatar:data.avatar || null},{headers:{Authorization:token}})
            openSuccessNotification();
            navigate(routes.userProfile.replace(':id',user_id));
        }catch(err){
            openErrorNotification();
            console.error(err);
        }
    }
   
    const fetch = async () => {
        const datesKeys = ['admission_date','birth_date']
        Object.keys(user).forEach((key) => {
            if(Object.keys(watch()).includes(key)) {
            //@ts-ignore
                setValue(key, !datesKeys.includes(key) ? (user[key] || null) : !!user[key] ? new Date(user[key] * 1000) : new Date());
            }
        });
    }

    useEffect(() => {
        fetch();
    }, [user])
  
    return {onEdit,register,handleSubmit,setValue,watch,reset,errors,user,changeUserNotification:contextHolder};
}


type Props = {
    user:UserProfileT
}

export const EditStudentForm:React.FC<Props> = ({user}) => {
    const {onEdit,register,handleSubmit,setValue,watch,reset,errors,changeUserNotification} = useEditUserStudent(user);
    const {onSendLetter,contextHolder} = useSendPassword();
    const [isExpelModal,setIsExpelModal] = useState(false);
    const mySecurityLevel = useUserStore().user.security_level;
    const navigate = useNavigate();
    const userId = useParams().id;
    const from = useSearchParams()[0].get('from');
    
    return <>
    {contextHolder}
    {changeUserNotification}
    <section className='studentProfileMain__container' style={{'width':'100%'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'30px','width':'100%'}}>
            {!!userId && <LinkBack title="Профіль" route={!from ? routes.userProfile.replace(':id',userId) : routes.userProfile.replace(':id',userId) + '?from=' + from}/>}
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
        <input style={{'display':'none'}} {...register('education_form')}/>
        <input style={{'display':'none'}} {...register('job_title')}/>
        <input style={{'display':'none'}} {...register('birth_date')}/>
        <input style={{'display':'none'}} {...register('admission_date')}/>
        <input style={{'display':'none'}} {...register('location')}/>
        <input style={{'display':'none'}} {...register('education_type')}/>
        <input style={{'display':'none'}} {...register('is_on_scholarships')}/>
        <div className="createUserFormInputs__container">
            <div className="createUserNameInput__container">
                <label className="select_label">Ім’я (ПІБ)</label>
                <input autoComplete="off"
                {...register('full_name',{required:{value:true,message:'Введіть ПІБ студента!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},
                // pattern:{value:namePattern,message:'Некоректне ПІБ!'}
            })} 
                className="form_input" placeholder='Введіть ПІБ студента'/>
            </div>
            <div className="createUserEmailInput__container">
                <label className="select_label">Пошта студента</label>
                <input autoComplete="off" 
                {...register('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не коректний email!'}})} 
                type={'email'} className="form_input" placeholder='Введіть пошту студента'/>
            </div>
        </div>
        <div className="createUserFormInputs__container">
            <div className="createUserEmailInput__container">
                <label className="select_label">Інтереси</label>
                <input autoComplete="off" 
                {...register('interests')}
                className="form_input" placeholder='Введіть інтереси студента'/>
            </div>
            <div className="createUserSelect__container" style={{width:'55%'}}>
                <label className="select_label">Посада</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть посаду студента'}
                        optionLabelProp="label"
                        {...register('job_title',{required:{value:true,message:'Введіть посаду студента'}})}
                        onChange={(e) => setValue('job_title',e)}
                        value={watch('job_title')}
                        defaultValue={"Студент"}
                        >   
                        <Option value={"Студент"} label={"Студент"}>Студент</Option>
                        <Option value={"Староста"} label={"Староста"}>Староста</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div className="createUserFormInputs__container">
            <div className="createUserEmailInput__container">
                <label className="select_label">Дата народження</label>
                <DatePicker
                placeholder="Оберіть дату народження"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('birth_date'))}
                {...register('birth_date',{required:{value:true,message:'Оберіть дату народження'},
                })}
                onChange={(e) => setValue('birth_date',e?.toDate() || null)} />
            </div>
            <div className="createUserEmailInput__container">
                <label className="select_label">Дата вступу</label>
                <DatePicker
                placeholder="Оберіть дату вступу"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                {...register('admission_date',{required:{value:true,message:'Оберіть дату вступу'},
                })}
                value={dayjs(watch('admission_date'))}
                onChange={(e) => setValue('admission_date',e?.toDate() || null)} />
            </div>
            <div className="createUserSelect__container">
                <label className="select_label">Місцезнаходження</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть 1 варіант'}
                        optionLabelProp="label"
                        {...register('location',{required:{value:true,message:'Оберіть місцезнаходження'}})}
                        onChange={(e) => setValue('location',e)}
                        value={watch('location')}
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
                        {...register('education_form',
                        // {required:{value:true,message:'Оберіть форму навчання'}}
                        )}
                        onChange={(e) => setValue('education_form',e)}
                        value={watch('education_form')}
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
                        placeholder={'Оберіть тип навчання'}
                        optionLabelProp="label"
                        {...register('education_type',{required:{value:true,message:'Оберіть тип навчання'}})}
                        onChange={(e) => {setValue('education_type',e);e === "Контракт" && setValue('is_on_scholarships', "Ні")}}
                        value={watch('education_type')}
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
                        {...register('is_on_scholarships',{required:{value:true,message:'Оберіть чи отримує студент стипендію'}})}
                        onChange={(e) => setValue('is_on_scholarships',e)}
                        value={watch('is_on_scholarships')}
                        >
                        {watch('education_type') !== "Контракт" && <Option value={"Так"} label={"Так"}>Так</Option>}
                        <Option value={"Ні"} label={"Ні"}>Ні</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div className="createUserFormInputs__container">
            <div className="createUserSelect__container" style={{width:'32%'}}>
                <label className="select_label">Телефонний номер студента</label>
                <input autoComplete="off"
                {...register('phone_number',{required:{value:true,message:'Введіть телефонний номер'}})}
                className="form_input" placeholder='Телефонний номер студента'/>
            </div>
            <div className="createUserSelect__container" style={{width:'32%'}}>
                <label className="select_label">Телефонний номер батьків</label>
                <input autoComplete="off"
                {...register('parents_phone_number',{required:{value:true,message:'Введіть телефонний номер батьків'}})}
                className="form_input" placeholder='Телефонний номер батьків'/>
            </div>
        </div>
        {!!Object.keys(errors).length && <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {//@ts-ignore
            Object.keys(errors).map(key => !!errors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{errors[key]?.message}</p>)
            }
        </div>}
        <div className="createUserButtons__container" style={{'justifyContent':'space-between'}}>
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Змінити"} 
                // disabled={createUserLoading}
                />
                <input 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" style={{'width':'unset'}} value={"Видалити випадково створений запис"} 
                />
            </div>
            <span 
                onClick={() => setIsExpelModal(true)}
                className="createUser__button primary_button" style={{'width':'unset'}} 
            >
                Відрахувати
            </span>
        </div>
    </form>
    <Modal centered rootClassName="expelStudentModal" footer={false} open={isExpelModal} onCancel={() => setIsExpelModal(false)}><ExpelStudentModal onClose={() => setIsExpelModal(false)} user={user}/></Modal>
    </>
}