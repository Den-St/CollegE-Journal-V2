import { Modal, Select } from "antd"
import { UploadSvg } from "../../assets/svgs/uploadSvg"
const {Option} = Select;

type Props = {
    setCourseNumber:(n:number) => void,
    courseNumber:number,
    courseNumbers:number[],
    onImportFile:() => void
}
const currYear = new Date().getFullYear();

export const CheckScheduleSettingsModal:React.FC<Props> = ({onImportFile,setCourseNumber,courseNumber,courseNumbers}) => {
    return <div  className="scheduleSettingsForm">
            <div style={{width:'100%'}}><h1 className="header">Налаштування розкладу</h1></div>
            <div className="createUserSelect__container" style={{'width':'30%'}}>
                <label className="select_label">Курс навчання</label>
                <div className="select_wrapper">
                    <Select
                        defaultValue={1}
                        className="createUserSelect"
                        placeholder={'Оберіть курс навчання'}
                        optionLabelProp="label"
                        onChange={setCourseNumber}
                        value={courseNumber}
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        {courseNumbers.map(course => <Option value={course} label={course}>{course}</Option>)} 
                    </Select>
                </div>
            </div>
            {!!courseNumber && <>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Рік навчання</label>
                <p className="semesterSettings_confirm_modal_value">20XX-20XX+1</p>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Семестр</label>
                <p className="semesterSettings_confirm_modal_value">2</p>
            </div>
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>З; Кн; Кб;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <p className="semesterSettings_confirm_modal_value">00.00.0000</p>
            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <p className="semesterSettings_confirm_modal_value">00.00.0000</p>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <p className="semesterSettings_confirm_modal_value">3</p>
            </div>
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>Тр; То;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <p className="semesterSettings_confirm_modal_value">00.00.0000</p>

            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <p className="semesterSettings_confirm_modal_value">00.00.0000</p>

            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <p className="semesterSettings_confirm_modal_value">3</p>
            </div>
            <div style={{'display':'flex',width:'100%','justifyContent':'center'}}>
                <div className="adminPanelScheduleSettingsInput__container">
                    <input onChange={onImportFile} autoComplete="off" accept=".xml,.xlsm,.xlsx" className="adminPanelScheduleSettingsInput" type={'file'}/>
                    <div className="adminPanelScheduleSettingsInput__cover">
                        <UploadSvg/>
                        <div className="adminPanelScheduleSettingsInputCoverText_container">
                            <h1 className="adminPanelScheduleSettingsInputCoverTitle">
                                Імпортувати Файл
                            </h1>
                            <p className="adminPanelScheduleSettingsInputCoverText">
                                XML, XLSM, XLSX
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </div>
}