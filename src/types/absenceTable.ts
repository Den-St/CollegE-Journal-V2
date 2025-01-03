export type AbsenceTableT = {
    dates:string[],
    group_leader_data: {
        full_name: string,
        phone_number: string
    },
    supervisor_data: {
        full_name: string
        phone_number: string
    },
    teachers:string[][],
    subjects:string[][],
    student_list:{
        columns: string[][] 
        full_name:string
        total: number
    }[],
    group_name:string,
}

export type AbsenceTableFilltersT = {
    group_id:string,
    offset:number,
}
