import { DatePicker } from "antd";
import dayjs from "dayjs";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { customDateFormat } from "../../helpers/dateFormat";
import { useExpelStudentModal } from "../../hooks/expelStudentModal";
import { UserProfileT } from "../../types/userProfile";
import './expelModalStyles.scss';

type ExpelStudentModalT = {
    user:UserProfileT,
    onClose:() => void
}

export const ExpelStudentModal:React.FC<ExpelStudentModalT> = ({user,onClose}) => {
    const {register,handleSubmit,setValue,watch,errors,onSubmit} = useExpelStudentModal(onClose);
    
    return <form onSubmit={handleSubmit(onSubmit)} className="expelModalContainer">
        <h1 className="header">Відрахування студента</h1>
        <div className="studentProfileInfo__container">
            <img className="studentProfile_img" src={user.avatar || defaultAvatar}/>
            <div className="studentProfileTextInfo__container" style={{width:'unset'}}>
                <p className="studentProfile__name">{user.full_name}</p>
                <p className="studentProfile__group" style={{'paddingTop':'0'}}>{user.user_group?.group_full_name}</p>
            </div>
        </div>
        <div className="createUserEmailInput__container" style={{width:'80%'}}>
            <label className="select_label">Оберіть дату відрахування студента</label>
            <DatePicker
                placeholder="Оберіть дату відрахування студента"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('date'))}
                defaultValue={dayjs(new Date())}
                {...register('date',{required:{value:true,message:'Оберіть дату відрахування студента'},
                })}
                allowClear={false}
                onChange={(e) => setValue('date',e?.toDate() || null)} />
        </div>
        <input 
            autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Відрахувати"} 
        />
    </form>
}