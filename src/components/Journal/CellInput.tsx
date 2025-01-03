import React, { useEffect } from "react"
import axiosConfig from "../../axiosConfig"
import { endpoints } from "../../consts/endpoints"
import { formatNumber } from "../../helpers/formatNumber"
import { useUserStore } from "../../store/userStore"

type Props = {
    defaultValue?:string,
    className:string,
    onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string,
        subject_system:number
    },
    pe_education?:boolean,
    token:string,
    rowIndex:number,
    columnIndex:number,
    date:string,
    onMouseUp:() => void,
    onMouseMove:(e:React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
    studentIndex:number,
    is_att?:boolean,
    month:number,
    lessonType?:string
}
const isValid = (value:string,pe_education?:boolean,is_att?:boolean) => {
    if(is_att && pe_education){
        if((value.length === 1 && value[0]?.toLowerCase() === 'з' || value.length === 2 && value[1] === 'а' || value.length === 3 && value[2]?.toLowerCase() === 'р') || ((value.length === 1 && value[0]?.toLowerCase() === 'з' || value.length === 2 && value[1] === 'в'))){
            value = value.toLocaleLowerCase();
            return true;
        }
    }
    if(value === "") return true;
    if(value === ".") return true;
    if(!isNaN(+value) && +value > 0 && +value <= 100) return true;
    if(isNaN(+value)){
        if(value.length === 1 && value[0]?.toLowerCase() === 'н' || value.length === 2 && value[1] === '/' || value.length === 3 && value[2]?.toLowerCase() === 'а') {
            value = value.toLocaleLowerCase();
            return true;
        }
    }
    return false;
}
const onChange = (e:React.ChangeEvent<HTMLInputElement>,pe_education?:boolean,is_att?:boolean) => {
    if(!isValid(e.target.value,pe_education,is_att)){
        e.preventDefault();
        e.stopPropagation();
        e.target.value = e.target.value.slice(0,e.target.value.length - 1);
        return;
    }
};
export const getColorByValue = (value:string,system:number) => {
    if(!value) return "white";
    if(system === 100){
        if(+value < 60) return "#ED3434";
        if(+value >= 74) return "#2DEF40";
        if(+value >= 60 && +value <= 73) return "white";
    }else{
        if(+value <= 12 && +value > 6) return "#2DEF40";
        if(+value < 6 && +value > 3) return "white";
        if(+value <= 3) return "#ED3434";
    }
    if(value?.toLowerCase() === "н") return "#EFB42D";
    if(value?.toLowerCase() === "н/а") return "#ED3434";
    if(value?.toLowerCase() === "зар") return "#2DEF40";
    if(value?.toLowerCase() === "зв") return "#2DEF40";
    if(value?.toLowerCase() === "н/в") return "#2DEF40";
    return "white";
}



export const CellInput:React.FC<Props> = ({defaultValue,className,onBlurData,token,rowIndex,columnIndex,date,
                                           onMouseUp,onMouseMove,studentIndex,pe_education,is_att,month,lessonType}) => {
    const keysToMoves:Record<string,() => void> = {
        'Enter':() => document.getElementById((rowIndex + 1) + ',' + columnIndex)?.focus(),
        'ArrowDown':() => document.getElementById((rowIndex + 1) + ',' + columnIndex)?.focus(),
        'ArrowUp':() => document.getElementById((rowIndex - 1) + ',' + columnIndex)?.focus(),
        'ArrowRight':() => document.getElementById((rowIndex) + ',' + (columnIndex + 1))?.focus(),
        'ArrowLeft':() => document.getElementById((rowIndex) + ',' + (columnIndex - 1))?.focus()
    }
    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        keysToMoves[e.key]?.();
    }
    const onFocus = () => {
        const columnSelect = document.getElementById('columnSelect_'+(columnIndex).toString());
        const columnDate = document.getElementById('columnDate_'+(columnIndex).toString());
        const student = document.getElementById('student_'+studentIndex);
        if(!columnDate || !student || !columnSelect) return;
        columnDate.style.border = "1px solid #EFB42D";
        columnSelect.style.border = "1px solid #EFB42D";
        student.style.border = "1px solid #EFB42D";
    }
    const onBlur = async (e:React.FocusEvent<HTMLInputElement>,onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string,
        rowIndex:number,
        columnIndex:number,
        subject_system:number
    },token:string,pe_education?:boolean,is_att?:boolean) => {
    const columnSelect = document.getElementById('columnSelect_'+(columnIndex).toString());
    const columnDate = document.getElementById('columnDate_'+(columnIndex).toString());
    const student = document.getElementById('student_'+studentIndex);
    if(columnDate && student && columnSelect) {
        columnSelect.style.border = "1px solid transparent";
        columnDate.style.border = "1px solid transparent";
        student.style.border = "1px solid transparent";
    }
    if(!isValid(e.target.value,pe_education,is_att)) return;

    try{
        await axiosConfig.post(endpoints.journalEditCell,{...onBlurData,value:e.target.value?.toUpperCase()},{headers:{Authorization:token}});
        const input = document.getElementById(onBlurData.rowIndex + ',' + onBlurData.columnIndex);
        const row = document.getElementById(`row_${rowIndex}`) as HTMLInputElement;
        if(!row) return;
        const inputs = Array.from(row.querySelectorAll("*")) as HTMLInputElement[];
        let summ = 0;
        let n = 0;

        let nAtts = 0;
        let summAtts = 0;
        let lastAtt = 0;
        inputs.map((input) => {
            const _lessonType = input.getAttribute("data-lesson-type");

            if(_lessonType !== "Атестаційна" && _lessonType !== "Коригуюча") {
                if(_lessonType === "Зошит") {
                    n++
                }else if(!isNaN(+input.value) && !!input.value) n++;
                summ += !isNaN(+input.value) ? +input.value : 0
            }
            if(_lessonType  === "Атестаційна" && !Number.isNaN(summ/n)){
                input.placeholder = `${Math.round(summ/n)}`;

                summ = 0;
                n = 0;
            }
            if(_lessonType === "Атестаційна" || _lessonType === "Коригуюча") {
                if(!isNaN(+input.value) && !!input.value) nAtts++;
                if(_lessonType === "Атестаційна") {
                    lastAtt = !isNaN(+input.value) ? +input.value : 0;
                }else if(!isNaN(+input.value) && !!input.value){
                    summAtts -= lastAtt;
                    !!lastAtt && nAtts--
                }
                summAtts += !isNaN(+input.value) ? +input.value : 0
            }
            if(_lessonType  === "Підсумкова" && !Number.isNaN(summAtts/nAtts)){
                if(+formatNumber(summAtts/nAtts) === Number(input.placeholder || 0)) return;
                input.placeholder = `${Math.round(summAtts/nAtts)}`;
                summAtts = 0;
                nAtts = 0;
            }
        })
        if(input) {
            input.style.color = getColorByValue(e.target.value,onBlurData.subject_system);
            input.style.caretColor = "white";
        }
    }catch(err){
        console.error(err);
    }   
    }
    const onCalculateAvgAtts = () => {
        if(lessonType !== "Атестаційна") return;
        const row = document.getElementById(`row_${rowIndex}`) as HTMLInputElement;
        if(!row) return;
        const inputs = Array.from(row.querySelectorAll("*")) as HTMLInputElement[];
        let summ = 0;
        let n = 0;
        
        inputs.map((input) => {
            const _lessonType = input.getAttribute("data-lesson-type");
            
            if(_lessonType !== "Атестаційна" && _lessonType !== "Коригуюча") {
                if(_lessonType === "Зошит") {
                    n++
                }else if(!isNaN(+input.value) && !!input.value) n++;
                
                summ += !isNaN(+input.value) ? +input.value : 0
            }
            if(_lessonType  === "Атестаційна" && !Number.isNaN(summ/n)){
                if(+formatNumber(summ/n) === Number(input.placeholder || 0)) return;
                input.placeholder = `${Math.round(summ/n)}`;
                summ = 0;
                n = 0;
            }
        })
    }
    const onCalculateAvgSemester = () => {
        if(lessonType !== "Підсумкова") return;
        const row = document.getElementById(`row_${rowIndex}`) as HTMLInputElement;
        if(!row) return;
        const inputs = Array.from(row.querySelectorAll("*")) as HTMLInputElement[];
        let summAtts = 0;
        let nAtts = 0;
        let lastAtt = 0;
        inputs.map((input) => {
            const _lessonType = input.getAttribute("data-lesson-type");
            
            if(_lessonType === "Атестаційна" || _lessonType === "Коригуюча") {
                if(!isNaN(+input.value) && !!input.value) nAtts++;
                if(_lessonType === "Атестаційна") {
                    lastAtt = !isNaN(+input.value) ? +input.value : 0;
                }else if(!isNaN(+input.value) && !!input.value){
                    summAtts -= lastAtt;
                    !!lastAtt && nAtts--
                }
                summAtts += !isNaN(+input.value) ? +input.value : 0
            }
            if(_lessonType  === "Підсумкова" && !Number.isNaN(summAtts/nAtts)){
                if(+formatNumber(summAtts/nAtts) === Number(input.placeholder || 0)) return;
                input.placeholder = `${Math.round(summAtts/nAtts)}`;
                summAtts = 0;
                nAtts = 0;
            }
        })
    }

    useEffect(() => {
        onCalculateAvgAtts();
        onCalculateAvgSemester();
    },[]);
    
    return <input onFocus={onFocus} onMouseMove={onMouseMove} onMouseDown={onMouseUp}
    data-month={month}
    data-lesson-type={lessonType}
    id={rowIndex + ',' + columnIndex} onKeyDown={onKeyDown} 
    style={{caretColor:'white',color:getColorByValue(defaultValue || "",onBlurData.subject_system),}}
    onBlur={(e) => onBlur(e,{...onBlurData,rowIndex,columnIndex},token,pe_education,is_att)} 
    onChange={(e) => onChange(e,pe_education,is_att)} 
    className={`journalRowItemCenterValue__input__text ${className}`} 
    defaultValue={defaultValue}/>
}