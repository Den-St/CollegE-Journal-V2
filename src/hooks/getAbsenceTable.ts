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

export const useGetAbsenceTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<AbsenceTableT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const group_id = searchParams.get('group_id');
    const offset_param = (Number(searchParams.get('offset')) || 0) > 0 ? 0 : Number(searchParams.get('offset'));
    const [fillters,setFillters] = useState<AbsenceTableFilltersT>({
        group_id:group_id || '',
        offset:Number(offset_param) || 0
    });
    const formatedModaysAndSaturdays = useMemo(getMondaysAndSaturdays,[])
    const [startEnd,setStartEnd] = useState(getStartAndEnd(fillters.offset,formatedModaysAndSaturdays));

    const token = useUserStore().user.token;
    
    const fetch = async (_fillters?:AbsenceTableFilltersT) => {
        if(!fillters.group_id) return;
        setLoading(true);
        const {start,end} = getStartAndEnd(_fillters?.offset ?? fillters.offset,formatedModaysAndSaturdays)
        const endPlusOneDay = new Date(end+60*60*24);
        try{
            const res = await axiosConfig.post(endpoints.absenceTable,{group_id:_fillters?.group_id,start,end:end+60*60*24},{headers:{Authorization:token}});
            setTable(res.data.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    const debounceOnIncrementOffset = useCallback(_debounce(fetch, 300),[startEnd.end,startEnd.start]);

    useEffect(() => {
        fetch({'group_id':fillters.group_id,'offset':offset_param});
    },[])

    const onChangeOffset = (fieldName:'group_id' | 'offset',value:number | string) => {
        if(!group_id) return;
        if(fieldName === 'offset') {
            setStartEnd(getStartAndEnd(+value,formatedModaysAndSaturdays));
        }
        setFillters(prev => ({ ...prev,[fieldName]:value}));
        debounceOnIncrementOffset({...fillters,[fieldName]:value});
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('group_id',fillters.group_id); 
        params.set('offset',fillters.offset.toString()); 
    
        window.history.replaceState({}, '', routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
        // navigate(routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
    },[fillters]);

    return {table,start:startEnd.start,end:startEnd.end,loading,fillters,onChangeOffset,navigate,formatedModaysAndSaturdays}
}