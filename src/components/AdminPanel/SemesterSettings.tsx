import { Checkbox, DatePicker, Modal, Select, Steps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../../axiosConfig";
import { endpoints } from "../../consts/endpoints";
import { customDateFormat } from "../../helpers/dateFormat";
import { CheckScheduleSettingsModal } from "../CheckScheduleSettingsModal";
import { CheckScheduleModal } from "./CheckScheduleModal";
import "./semesterSettingsStyles.scss";
        
const {Option} = Select;

const courseNumbers = [1,2,3,4];
const currYear = new Date().getFullYear();
const stepsItems = [
    {
        title:'1 Курс',
    },
    {
        title:'2 Курс',
    },
    {
        title:'3 Курс',
    },
    {
        title:'4 Курс',
    },
]
type SemesterSettingsFormT = {
    semester_start_first:Date | null | undefined,
    semester_end_first:Date | null | undefined,
    weeks_n_first:number,
    semester_start_second:Date | null | undefined,
    semester_end_second:Date | null | undefined,
    weeks_n_second:number,
    temporary:boolean,
    eduYear:string | null,
    semesterNumber:number | null
}
type SemesterSettingsT = {
    "core_groups": {
        1: {
            "З": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кб": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кн": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "То": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Тр": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            }
        },
        2: {
            "З": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кб": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кн": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "То": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Тр": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            }
        },
        3: {
            "З": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кб": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кн": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "То": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Тр": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            }
        },
        4: {
            "З": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кб": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Кн": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "То": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            },
            "Тр": {
                "end_date": number,
                "start_date": number,
                "weeks_n": number
            }
        }
    },
    "even": boolean,
    "record_id": string,
    "semester_date": string
};

const useSemesterSettings = () => {
    const [courseNumber,setCourseNumber] = useState<number>(1);
    const [maxCourseNumber,setMaxCourseNumber] = useState<number>(1);
    const [semesterSettingsLoading,setSemestetSettingsLoading] = useState(false);
    const [semesterSettings,setSemesterSettings] = useState<SemesterSettingsT>();
    const [onCheckSettingsModal,setOnCheckSettingsModal] = useState(false);
    const [onCheckScheduleModal,setOnCheckScheduleModal] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<SemesterSettingsFormT>();

    const fetch = async () => {
        const eduYear = watch('eduYear');
        const semesterNumber = watch('semesterNumber');
        if(!eduYear || !semesterNumber) return;
        try{    
            setSemestetSettingsLoading(true);
            const res = await axiosConfig.post(endpoints.getSemesterConfig,{semester_date:eduYear+'.'+semesterNumber});
            setSemesterSettings(res.data)
            return res.data;
        }catch(err){
            console.error(err);
        }finally{
            setSemestetSettingsLoading(false);
        }
    }
    
    const onRefetch = async () => {
        const config = await fetch() as SemesterSettingsT;
        if(!config) return;
        for(let i = 1;i <= 4;i++){
            if(config.core_groups[i as 1 | 2 | 3 | 4].З.end_date) setMaxCourseNumber(prev => ++prev);
        }
        onChangeCourseNumber(courseNumber,config);
    }
    const onChangeCourseNumber = (number:number,config?:SemesterSettingsT) => {
        setCourseNumber(number)
        const typedNumber = number as 1 | 2 | 3 | 4;
        
        if(!number) return;
        if(config){
            const semester_end_first = config?.core_groups[typedNumber]["З"].end_date ? new Date(config.core_groups[typedNumber]["З"].end_date * 1000) : undefined
            setValue('semester_end_first',config?.core_groups[typedNumber]["З"].end_date ? new Date((config?.core_groups[typedNumber]["З"].end_date || 0) * 1000) : undefined);
            setValue('semester_start_first',config?.core_groups[typedNumber]["З"].start_date ? new Date((config?.core_groups[typedNumber]["З"].start_date || 0) * 1000) : undefined);
            setValue('weeks_n_first',(config)?.core_groups[typedNumber]["З"].weeks_n || 0);
            setValue('semester_end_second',config?.core_groups[typedNumber]["То"].end_date ? new Date((config?.core_groups[typedNumber]["То"].end_date || 0) * 1000) : undefined);
            setValue('semester_start_second',config?.core_groups[typedNumber]["То"].start_date ? new Date((config?.core_groups[typedNumber]["То"].start_date || 0) * 1000) : undefined);
            setValue('weeks_n_second',(config)?.core_groups[typedNumber]["То"].weeks_n || 0);
            fetch();
            return;
        }else if(semesterSettings){
            if(!!semesterSettings?.core_groups[typedNumber]["З"].end_date){
                setValue('semester_end_first',semesterSettings?.core_groups[typedNumber]["З"].end_date ? new Date((semesterSettings?.core_groups[typedNumber]["З"].end_date || 0) * 1000) : undefined);
                setValue('semester_start_first',semesterSettings?.core_groups[typedNumber]["З"].start_date ? new Date((semesterSettings?.core_groups[typedNumber]["З"].start_date || 0) * 1000) : undefined);
                setValue('weeks_n_first',(semesterSettings)?.core_groups[typedNumber]["З"].weeks_n || 0);
                setValue('semester_end_second',semesterSettings?.core_groups[typedNumber]["То"].end_date ? new Date((semesterSettings?.core_groups[typedNumber]["То"].end_date || 0) * 1000) : undefined);
                setValue('semester_start_second',semesterSettings?.core_groups[typedNumber]["То"].start_date ? new Date((semesterSettings?.core_groups[typedNumber]["То"].start_date || 0) * 1000) : undefined);
                setValue('weeks_n_second',(semesterSettings)?.core_groups[typedNumber]["То"].weeks_n || 0);
                fetch();
            }else{
                reset({'eduYear':watch('eduYear'),semesterNumber:watch('semesterNumber')});
            }
        }
    }
    const onImportFile = () => {
        setOnCheckScheduleModal(true);

        setOnCheckSettingsModal(false);
    }
    const onSaveSettings = async (data:SemesterSettingsFormT) => {
        try{
            const semester_end_first = Math.round((data.semester_end_first?.getTime() || 0)/1000);
            const semester_start_first = Math.round((data.semester_start_first?.getTime() || 0)/1000);
            const semester_end_second = Math.round((data.semester_end_second?.getTime() || 0)/1000);
            const semester_start_second = Math.round((data.semester_start_second?.getTime() || 0)/1000);

            const res = await axiosConfig.post(endpoints.addSemesterConfig,{
                "config": {
                    "З": {
                      "end_date": semester_end_first,
                      "start_date": semester_start_first,
                      "weeks_n": data.weeks_n_first
                    },
                    "Кб": {
                        "end_date": semester_end_first,
                        "start_date": semester_start_first,
                        "weeks_n": data.weeks_n_first
                    },
                    "Кн": {
                        "end_date": semester_end_first,
                        "start_date": semester_start_first,
                        "weeks_n": data.weeks_n_first
                    },
                    "То": {
                        "end_date": semester_end_second,
                        "start_date": semester_start_second,
                        "weeks_n": data.weeks_n_second
                    },
                    "Тр": {
                        "end_date": semester_end_second,
                        "start_date": semester_start_second,
                        "weeks_n": data.weeks_n_second
                    }
                  },
                "course":courseNumber,
                "record_id": semesterSettings?.record_id
            });
            setSemesterSettings(prev => prev && ({...prev,"core_groups":{
                ...prev?.core_groups,
                [courseNumber]:{
                    "З": {
                        "end_date": semester_end_first,
                        "start_date": semester_start_first,
                        "weeks_n": data.weeks_n_first
                      },
                      "Кб": {
                          "end_date": semester_end_first,
                          "start_date": semester_start_first,
                          "weeks_n": data.weeks_n_first
                      },
                      "Кн": {
                          "end_date": semester_end_first,
                          "start_date": semester_start_first,
                          "weeks_n": data.weeks_n_first
                      },
                      "То": {
                          "end_date": semester_end_second,
                          "start_date": semester_start_second,
                          "weeks_n": data.weeks_n_second
                      },
                      "Тр": {
                          "end_date": semester_end_second,
                          "start_date": semester_start_second,
                          "weeks_n": data.weeks_n_second
                      }
                },
            }}))
            fetch();
            if(courseNumber !== 4 ){
                setCourseNumber(prev => prev + 1);
                courseNumber === maxCourseNumber && setMaxCourseNumber(prev => prev + 1);
                onChangeCourseNumber(courseNumber + 1);
            }
        }catch(err){
            console.error(err);
        }
    }
    return {semesterSettings,onChangeCourseNumber,maxCourseNumber,onRefetch,onCheckScheduleModal,onImportFile,setOnCheckScheduleModal,onSaveSettings,register,watch,handleSubmit,setValue,courseNumber,setCourseNumber,onCheckSettingsModal,setOnCheckSettingsModal};
}

export const SemesterSettings = () => {
    
    return <>
    <SemesterSettingsPart/>
    {/* <Modal centered footer={false} onCancel={() => setOnCheckSettingsModal(false)} rootClassName="semesterSettings_confirm_modal" open={onCheckSettingsModal}>
        <CheckScheduleSettingsModal 
        onImportFile={onImportFile}
        setCourseNumber={setCourseNumber} courseNumber={1} courseNumbers={courseNumbers}/>
    </Modal>
    <Modal centered footer={false} onCancel={() => setOnCheckScheduleModal(false)} rootClassName="semesterSettings_confirm_modal" open={onCheckScheduleModal}>
        <CheckScheduleModal onClose={() => setOnCheckScheduleModal(false)}/>
    </Modal> */}
    </>
}


const SemesterSettingsPart = () =>{
    const {onCheckScheduleModal,onRefetch,maxCourseNumber,onChangeCourseNumber,onImportFile,setOnCheckScheduleModal,onSaveSettings,register,watch,handleSubmit,setValue,courseNumber,setCourseNumber,onCheckSettingsModal,setOnCheckSettingsModal} = useSemesterSettings();

    return <form className="scheduleSettingsForm" onSubmit={handleSubmit(onSaveSettings)}>
        <div style={{width:'100%'}}><h1 className="header">Налаштування семестру</h1></div>
        <div className="createUserSelect__container" style={{width:courseNumber ? '30%' : ''}}>
            <label className="select_label">Курс навчання</label>
            <div className="select_wrapper">
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть курс навчання'}
                    optionLabelProp="label"
                    onChange={(number) => onChangeCourseNumber(number)}
                    value={courseNumber}
                    // {...createUserRegister('department',{required:true})}
                    // onChange={(e) => createUserSetValue('department',e)}
                    // value={createUserWatch('department')}
                    >  
                    {courseNumbers.map(course => course <= maxCourseNumber && <Option value={course} label={course}>{course}</Option>)} 
                </Select>
            </div>
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">Рік навчання</label>
            <div className="select_wrapper">
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть рік навчання'}
                    optionLabelProp="label"
                    {...register('eduYear',{required:true})}
                    onChange={(e) => {setValue('eduYear',e);onRefetch();}}
                    value={watch('eduYear')}
                    >  
                    <Option value={(currYear-1)+'-'+(currYear)} label={(currYear-1)+'-'+(currYear)}>{(currYear-1)+'-'+(currYear)}</Option>
                    <Option value={(currYear)+'-'+(currYear+1)} label={(currYear)+'-'+(currYear+1)}>{(currYear)+'-'+(currYear+1)}</Option>
                </Select>
            </div>
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">Семестр</label>
            <div className="select_wrapper">
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть семестр навчання'}
                    optionLabelProp="label"
                    {...register('semesterNumber',{required:true})}
                    onChange={(e) => {setValue('semesterNumber',e);onRefetch();}}
                    value={watch('semesterNumber')}
                    >  
                    <Option value={1} label={1}>{1}</Option>
                    <Option value={2} label={2}>{2}</Option>
                </Select>
            </div>
        </div>
        <Steps
            current={courseNumber - 1}
            items={stepsItems}
        />
        <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>З; Кн; Кб;</span></h2>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата початку семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату початку семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('semester_start_first'))}
                {...register('semester_start_first',{required:{value:true,message:'Оберіть дату початку семестру у З, Кн, Кб'},
                })}
                onChange={(e) => setValue('semester_start_first',e?.toDate() || null)} />
        </div>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата закінчення семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату закінчення семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('semester_end_first'))}
                {...register('semester_end_first',{required:{value:true,message:'Оберіть дату кінця семестру у З, Кн, Кб'},
                })}
                onChange={(e) => setValue('semester_end_first',e?.toDate() || null)} />
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">К-сть тижнів для відпрацювання</label>
            <div className="select_wrapper">
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть кількість тижнів'}
                    optionLabelProp="label"
                    value={watch('weeks_n_first')}
                    {...register('weeks_n_first',{required:{value:true,message:'Оберіть кількість тижнів відпрацювання у З, Кн, Кб'},
                    })}
                    onChange={(e) => setValue('weeks_n_first',e)} 
                    >  
                    <Option value={1} label={1}>{1}</Option>
                    <Option value={2} label={2}>{2}</Option>
                    <Option value={3} label={3}>{3}</Option>
                </Select>
            </div>
        </div>
        <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>Тр; То;</span></h2>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата початку семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату початку семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('semester_start_second'))}
                {...register('semester_start_second',{required:{value:true,message:'Оберіть дату початку семестру у То, Тр'},
                })}
                onChange={(e) => setValue('semester_start_second',e?.toDate() || null)}/>
        </div>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата закінчення семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату закінчення семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                value={dayjs(watch('semester_end_second'))}
                {...register('semester_end_second',{required:{value:true,message:'Оберіть дату початку семестру у То, Тр'},
                })}
                onChange={(e) => setValue('semester_end_second',e?.toDate() || null)}/>
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">К-сть тижнів для відпрацювання</label>
            <div className="select_wrapper">
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть кількість тижнів'}
                    optionLabelProp="label"
                    value={watch('weeks_n_second')}
                    {...register('weeks_n_second',{required:{value:true,message:'Оберіть кількість тижнів відпрацювання у То, Тр'},
                    })}
                    onChange={(e) => setValue('weeks_n_second',e)}
                    >  
                    <Option value={1} label={1}>{1}</Option>
                    <Option value={2} label={2}>{2}</Option>
                    <Option value={3} label={3}>{3}</Option>
                </Select>
            </div>
        </div>
        <div style={{width:'100%',display:'flex',gap:'30px',alignItems:'center',}}>
            <input type={'submit'} value={'Зберегти налаштування'} style={{'width':'unset',padding:'10px 15px'}} className={"primary_button"}/>
            {/* <Checkbox onChange={(value) => setValue('temporary',value.target.value)}>Тимчасовий розклад</Checkbox> */}
        </div>
        {/* <div style={{'display':'flex',gap:'30px'}}>
            <span onClick={() => setOnCheckSettingsModal(true)} style={{width:'unset',padding:'0 20px'}} className={"primary_button"}>Завантажити розклад</span>
        </div> */}
    </form>
}