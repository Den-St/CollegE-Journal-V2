import { MonthAttesationsTable } from './../components/Journal/MonthAttestations/MonthAttestationsTable';
import { JournalAttestationT } from './../types/journalAttestation';
import { MonthAttesationsTableAttestationsT, MonthAttestationsFilltersT, MonthAttestationsTableT } from './../types/mothAttestationTable';
import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { routes } from "../consts/routes";
import { getToken } from "../helpers/auth";
import { getMondaysAndSaturdays } from "../helpers/getModaysAndSaturdays";
import { getStartAndEnd } from "../helpers/getStartAndEndOfWeek";
import { useUserStore } from "../store/userStore";
import { AbsenceTableT, AbsenceTableFilltersT } from "../types/absenceTable";
import _debounce from 'lodash/debounce';



export const useGetMonthAttesationsTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<MonthAttestationsTableT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const group_id = searchParams.get('group_id');
    const [attestations,setAttestations] = useState<MonthAttesationsTableAttestationsT[]>();
   
    const [fillters,setFillters] = useState<MonthAttestationsFilltersT>({
        group_id:group_id || '',
        month:""
    });

    const token = useUserStore().user.token;
    const fetch = async (_fillters?:MonthAttestationsFilltersT) => {
        if(!fillters.group_id) return;
        setLoading(true);
        const month = _fillters?.month || fillters.month;
        try{
            const res = !month 
            ? await axiosConfig.post(endpoints.monthAttestations,{group_id:fillters.group_id,start:-1,end:-1},{headers:{Authorization:token}})
            : await axiosConfig.post(endpoints.monthAttestations,{group_id:fillters.group_id,start:attestations?.find(att => att.month === _fillters?.month)?.start_date || -1,end:attestations?.find(att => att.month === _fillters?.month)?.end_date || -1},{headers:{Authorization:token}});

            setTable(res.data.data);
            if(!month) setAttestations(res.data.data?.attestation_list);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    const onChangeFillters = (month:string) => {
        setFillters(prev => ({ ...prev,"month":month}));

        const newAtts = attestations?.map(att => att.month === month ? {...att,active:true} : {...att,active:false});
        setAttestations(newAtts);
        fetch({'group_id':fillters.group_id,'month':month,});
    }   

    useEffect(() => {
        fetch();
    },[fillters.group_id,])

   

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('group_id',fillters.group_id); 
    
        window.history.replaceState({}, '', routes.monthAttestations+`?group_id=${fillters.group_id}`);
        // navigate(routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
    },[fillters]);

    return {table,loading,fillters,navigate,onChangeFillters,attestations}
}