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

export type StudentMonthAttestationTableT = {
    attestation_list: [
      {
        active:boolean
        end_date: number
        month:string
        start_date:number
      }
    ],
    columns: [
      {
        students: [
          {
            grade: string
            student_id: string
          }
        ],
        subject_name: string
        subject_system: number
        subject_teacher: string
      }
    ],
    group_name: string
    student_list: [
      {
        full_name: string
        student_id: string
      }
    ]
}

export const useGetStudentMonthAttesationsTable = () => {
    const [table,setTable] = useState<StudentMonthAttestationTableT>();
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;
    const id = useUserStore().user.user_id;

    const fetch = async () => {
      if(!token) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.studentMonthAttestations,{user_id:id},{headers:{Authorization:token}});

            setTable(res.data.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {fetch()},[token]);

    return {table,loading}
}