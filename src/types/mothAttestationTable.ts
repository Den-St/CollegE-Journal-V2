export type MonthAttestationsTableT = {
      "attestation_list": [
        {
          "active": boolean,
          "end_date": number,
          "month": string,
          "start_date": number
        }
      ],
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
      ]
}

export type MonthAttestationsFilltersT = {
  group_id:string,
  month:string
}

export type MonthAttesationsTableAttestationsT = {
  active: boolean;
  end_date: number;
  start_date: number | string;
  month: string;
}