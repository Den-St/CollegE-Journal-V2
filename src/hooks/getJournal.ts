import { routes } from './../consts/routes';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { TeacherJournalT } from '../types/teacherJournal';
import { JournalAttestationT } from '../types/journalAttestation';
import { TeacherJournalFilltersT } from '../types/teacherJournalFillters';
import { closestIndexTo, parse } from 'date-fns';

export const useGetTeacherJournal = () => {
    const navigate = useNavigate();
    const [journal,setJournal] = useState<TeacherJournalT>();
    const [loading,setLoading] = useState(false);
    const [attestations,setAttestations] = useState<JournalAttestationT[]>();
    const [searchParams,setSearchParams] = useSearchParams();
    const groupId_param = searchParams.get('group_id');
    const subject_id_param = searchParams.get('subject_id');
    const attestationsParam = searchParams.get('attestations');

    const [fillters,setFillters] = useState<TeacherJournalFilltersT>({
        group_id:groupId_param || '',
        subject_id:subject_id_param || '',
        onlyAtts:attestationsParam ? +attestationsParam === 1 : false,
        month:''
    });

    const token = useUserStore().user.token;
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    const focusNearestInputCell = () => {
        if(!journal) return;
        const datesElements = journal?.columns.map(col => ({date:col.date.split("\n")[1],index:col.column_index})).filter(date => !!date.date);
        const dates = datesElements.map(date => new Date(new Date().getFullYear(),(+date.date.split(".")[1] - 1),(+date.date.split(".")[0])));
        const nearestDateIndex = closestIndexTo(new Date(),dates);

        if(nearestDateIndex === undefined) return;
        const nearestDate = datesElements[nearestDateIndex];

        const container = document.getElementById('journalRightRowsContainer');
        const cell = document.getElementById(`0,${nearestDate.index - 1}`); 

        if(cell?.tagName === "input"){
            cell?.focus();
        }else if(container && cell){
            container.scrollLeft = cell.offsetLeft - container.offsetLeft;
        }
    }
    const fetch = async (_fillters?:{group_id:string,subject_id:string,month:string | undefined,onlyAtts:boolean}) => {
        if(!fillters.subject_id && !_fillters?.subject_id) return;
        setLoading(true);
        try{
            const onlyAtts = _fillters?.onlyAtts === undefined ? + fillters.onlyAtts : +_fillters?.onlyAtts
            const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
            ? await axiosConfig.post(endpoints.journal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1,attestations:onlyAtts },{headers:{Authorization:token}}) 
            : await axiosConfig.post(endpoints.journal,{end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),journal_id:_fillters?.subject_id || fillters?.subject_id,start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1),attestations:onlyAtts},{headers:{Authorization:token}});
            if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
            if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

   useEffect(() => {
    if(journal && fillters.month === "") focusNearestInputCell();
   },[journal])

    const refetch = async (_fillters?:TeacherJournalFilltersT) => {
        if(!fillters.subject_id && !_fillters?.subject_id) return;
        setLoading(true);
        try{
            const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
            ? await axiosConfig.post(endpoints.journal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1,attestations:+_fillters.onlyAtts ? 1 : 0},{headers:{Authorization:token}}) 
            : await axiosConfig.post(endpoints.journal,{
                end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),
                journal_id:_fillters?.subject_id || fillters?.subject_id,
                start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1),
                attestations:+(_fillters?.onlyAtts || fillters?.onlyAtts) ? 1 : 0
            },{headers:{Authorization:token}});
            if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
            if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

  
    useEffect(() => {
        fetch();
    },[])

    const onChangeFillters = (fieldName:'group_id' | 'subject_id' | 'month' | 'onlyAtts',value:string | number | undefined | boolean) => {
        //@ts-ignore
        setFillters(prev => ({ ...prev,[fieldName]:value}));

        if(fieldName === 'month'){
            const newAtts = attestations?.map(att => att.name === value ? {...att,active:true} : {...att,active:false});
            setAttestations(newAtts);
            fetch({'group_id':fillters.group_id,'subject_id':fillters.subject_id,'month':(value || '').toString(),onlyAtts:fillters.onlyAtts});
        }else{
            fetch({'group_id':fillters.group_id,'subject_id':fillters.subject_id,'month':attestations?.find(att => att.active)?.name || '',onlyAtts:fillters.onlyAtts,[fieldName]:value});
        }
    }

    const isDisabledByDate = (dateString:string) => {
        // console.log(dateString,currentMonth,currentDate)
        // if(!+dateString.includes('\n') || +dateString.split('\n')?.[1].split('.')[1] > currentMonth) {
        //     return true;
        // }
        // if(+dateString.split('\n')?.[1].split('.')[1] === currentMonth && +dateString.split('\n')[1].split('.')[0] > currentDate){
        //     return true;
        // }
        return false;
    }
    const onChangeLessonType = async (column_id:string,lesson_type:string,column_index:number) => {
        try{
            await axiosConfig.post(endpoints.journalEditCellType,{column_id,lesson_type,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
            const lessonTypeP = document.getElementById('lessonTheme'+column_index.toString());
            if(lessonTypeP?.innerText){
                lessonTypeP.innerText = lesson_type;
            }
        }catch(err){    
            console.error(err);
        }
    }
    const onBlurChangeLessonTopic = async (column_id:string,lesson_topic:string) => {
        try{
            await axiosConfig.post(endpoints.journalEditCellTopic,{column_id,lesson_topic,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('group_id',fillters.group_id); 
        params.set('subject_id',fillters.subject_id); 
        params.set('attestations',(+fillters.onlyAtts).toString()); 
    
        window.history.replaceState({}, '', routes.journal+`?group_id=${fillters.group_id}&subject_id=${fillters.subject_id}&attestations=${+fillters.onlyAtts}`);
        // navigate(routes.journal+`?group_id=${fillters.group_id}&subject_id=${fillters.subject_id}&attestations=${+fillters.onlyAtts}`);
    },[fillters]);

    return {loading,journal,fillters,onChangeFillters,token,isDisabledByDate,
            onChangeLessonType,onBlurChangeLessonTopic,currentMonth,attestations,
            refetch,};
}