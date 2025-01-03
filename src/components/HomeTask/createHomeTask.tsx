import { DatePicker } from 'antd';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { CalendarSvg } from '../../assets/svgs/calendarSvg';
import { useThemeStore } from '../../store/themeStore';
import './createHomeTaskStyles.scss';
import 'react-quill/dist/quill.snow.css';

export const CreateHomeTask = () => {
    const theme = useThemeStore().theme;
    const [datePickerOpen,setDatePickerOpen] = useState(false);
    const [pickedDate,setPickedDate] = useState<Date>();
    const onChangeDate = (e:Date) => {
        setPickedDate(e);
        setDatePickerOpen(false);
    }
    
    return <div className={`createHomeTaskMain__container ${theme}`}>
        <h1 className="createHomeTask__title">Домашнє завдання</h1>
        <div className="createHomeTaskInputs__container">
            <div className="createHomeTaskInputItemHeader__container">
                <h2 className="createHomeTaskInputItem__title">Заголовок</h2>
                <input autoComplete="off"  className="createHomeTaskInputItem" placeholder='Введіть заголовок завдання'/>
            </div>
            <div className="createHomeTaskInputItemDate__container">
                <h2 className="createHomeTaskInputItem__title">Срок здачі</h2>
                <div className="createHomeTaskDate">{pickedDate?.toISOString().slice(0,10) || `ДД.ММ.РРРР`}
                    <button className='createHomeTaskOpenDatePicker__button' onClick={() => setDatePickerOpen(prev => !prev)}>
                        {CalendarSvg()}
                    </button>
                </div>
                <DatePicker onChange={(e) => e && onChangeDate(e?.toDate())} placement='bottomRight' open={datePickerOpen}/>
            </div>
        </div>
        <div className="createHomeTaskInputItemEditor__container">
            <h2 className="createHomeTaskInputItem__title">Опис</h2>
            <ReactQuill placeholder='Введіть завдання'/>
        </div>
        <div className='createHomeTaskButtons__container'>
            <button className='createHomeTaskButtons__button'>Завантажити</button>
            <button className='createHomeTaskButtons__button'>Переглянути</button>
        </div>
    </div>
}