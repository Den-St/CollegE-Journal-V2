import { StudentJournalFilltersT } from './../types/studentJournalFillters';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';
import { useStudentJournalSubjectsStore } from '../store/studentJournalSubjects';
import { JournalColumnT, StudentJournalT } from '../types/studentJournal';
import { routes } from '../consts/routes';

export const useStudentJournal = () => {
    const navigate = useNavigate();
    const [journal,setJournal] = useState<StudentJournalT>();
    const [columnByMonth,setColumnsByMonth] = useState<JournalColumnT[][]>([[]]);
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [attestations,setAttestations] = useState<{
        active:boolean,
        end:number,
        start:number,
        name:string
    }[]>();
    const subject_id_param = searchParams.get('subject_id');
    const attestationsParam = searchParams.get('attestations');
    const [fillters,setFillters] = useState<StudentJournalFilltersT>({
        subject_id:subject_id_param || '',
        month: '',
        onlyAtts:attestationsParam ? +attestationsParam === 1 : false,
    });

    const token = useUserStore().user.token;
    const getColumnsByDate = (res:any,onlyAtts:boolean) => {
        const _columnsByDate:JournalColumnT[][] = [[res.data.columns[0]]];
        for(let i = 1;i < res.data.columns.length;i++){
            if(!onlyAtts){
                if(res.data.columns[i].date.split('.')?.[1]?.slice(0,2) === res.data.columns[i - 1].date.split('.')?.[1]?.slice(0,2) || !res.data.columns[i].date.includes('\n')){
                    _columnsByDate[_columnsByDate.length - 1].push(res.data.columns[i]);
                }else{
                    _columnsByDate.push([res.data.columns[i]]);
                }
            }else{
                if(res.data.columns[i].date === res.data.columns[i - 1].date){
                    _columnsByDate[_columnsByDate.length - 1].push(res.data.columns[i]);
                }else{
                    _columnsByDate.push([res.data.columns[i]]);
                }
            }
        }
        setColumnsByMonth(_columnsByDate);
    }
    const fetch = async (_fillters?:{subject_id:string,month:string | undefined,onlyAtts:boolean}) => {
        if(!fillters.subject_id) return;
        setLoading(true);
        try{
            const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
            ? await axiosConfig.post(endpoints.studentJournal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1,attestations:_fillters.onlyAtts !== undefined ? +_fillters.onlyAtts : fillters.onlyAtts ? 1 : 0},{headers:{Authorization:token}}) 
            : await axiosConfig.post(endpoints.studentJournal,{end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),journal_id:_fillters?.subject_id || fillters?.subject_id,start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1),attestations:_fillters?.onlyAtts !== undefined ? +_fillters.onlyAtts : fillters.onlyAtts ? 1 : 0},{headers:{Authorization:token}});
            
            if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
            if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
            setJournal(res.data);
            if(_fillters?.month === '' || _fillters?.month === undefined) {
                getColumnsByDate(res,_fillters?.onlyAtts !== undefined ? _fillters.onlyAtts : fillters.onlyAtts);
            }
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetch();
    },[]);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('subject_id',fillters.subject_id); 
        params.set('attestations',(+fillters.onlyAtts).toString()); 
    
        window.history.replaceState({}, '', routes.journal+`?subject_id=${fillters.subject_id}&attestations=${+fillters.onlyAtts}`);
        // navigate(routes.journal+`?subject_id=${fillters.subject_id}&attestations=${+fillters.onlyAtts}`);
    },[fillters]);

    const onChangeFillters = (fieldName:'subject_id' | 'month' | 'onlyAtts',value:string | boolean | undefined) => {
        setFillters(prev => ({...prev,[fieldName]:value}));

        if(fieldName === 'month'){
            const newAtts = attestations?.map(att => att.name === value ? {...att,active:true} : {...att,active:false});
            setAttestations(newAtts);
            fetch({'subject_id':fillters.subject_id,'month':(value || '').toString(),onlyAtts:fillters.onlyAtts});
        }else{
            fetch({'subject_id':fillters.subject_id,'month':attestations?.find(att => att.active)?.name || '',onlyAtts:fillters.onlyAtts,[fieldName]:value});
        }

    }

    return {loading,journal,fillters,onChangeFillters,columnByMonth,attestations};
}