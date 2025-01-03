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

export type StudentSemesterAttestationsT = {
    "columns": [
        {
          "attestations": [
            {
              "grade": string,
              "name": string
            }
          ],
          "subject_name": string,
          "subject_system": number,
          "subject_teacher": string
        }
      ],
      "group_name": string,
      year:string
}

export const useGetStudentSemesterAttesationsTable = () => {
    const [table,setTable] = useState<StudentSemesterAttestationsT>();
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;
    const fetch = async () => {
      if(!token) return
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.studentSemesterAttestations,{headers:{Authorization:token}})

            setTable(res.data.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
   

    useEffect(() => {
        fetch();
    },[token])

    return {table,loading}
}