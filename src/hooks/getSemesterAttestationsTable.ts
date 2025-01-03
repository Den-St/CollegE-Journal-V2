import { MonthAttesationsTable } from '../components/Journal/MonthAttestations/MonthAttestationsTable';
import { JournalAttestationT } from '../types/journalAttestation';
import { MonthAttesationsTableAttestationsT, MonthAttestationsFilltersT, MonthAttestationsTableT } from '../types/mothAttestationTable';
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

export type SemesterAttestationsT = {
    "columns": [
        {
          "students": [
            {
              "grade": string,
              "student_id": string
            }
          ],
          "subject_name": string,
          "subject_system": number,
          "subject_teacher": string
        }
      ],
      "group_name": string,
      "student_list": [
        {
            "full_name": string,
            "student_id": string
        }
      ],
      year:string
}

export type SemesterAttestationsFilltersT = {
    group_id:string
}

export const useGetSemesterAttesationsTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<SemesterAttestationsT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const group_id = searchParams.get('group_id');
   
    const [fillters,setFillters] = useState<SemesterAttestationsFilltersT>({
        group_id:group_id || '',
    });

    const token = useUserStore().user.token;
    const fetch = async (_fillters?:MonthAttestationsFilltersT) => {
        if(!fillters.group_id) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.semesterAttestationsAdmin,{group_id:fillters.group_id,},{headers:{Authorization:token}})

            setTable(res.data.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
   

    useEffect(() => {
        fetch();
    },[fillters.group_id,])

   

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('group_id',fillters.group_id); 
    
        window.history.replaceState({}, '', routes.semesterAttestations+`?group_id=${fillters.group_id}`);
        // navigate(routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
    },[fillters]);

    return {table,loading,fillters,navigate}
}