import { useState } from "react";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { useUserStore } from "../store/userStore";

export const useAbsenceTableDownload = (start:number,end:number,group_name?:string,group_id?:string,) => {
    const [downloadLoading,setDownloadLoading] = useState(false);
    const token = useUserStore().user.token;

    const fetchFile = async () => {
        if(!group_id || !group_name) return;
        setDownloadLoading(true);
        
        try{
            axiosConfig.post(endpoints.absenceTableFile,{group_id:group_id,start,end},{headers:{Authorization:token},responseType:'arraybuffer'})
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                const url = window.URL.createObjectURL(blob);  // Create a URL for the blob
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${group_name}_список_відсутніх_${new Date(start*1000).toLocaleDateString()+'-'+new Date(end*1000).toLocaleDateString()}.xls`;  // Set the file name for download
                document.body.appendChild(a);
                a.click();  // Programmatically click the anchor to trigger the download
                window.URL.revokeObjectURL(url);  // Clean up the URL object
                document.body.removeChild(a);  // Remove the anchor element
            })
            .catch(error => console.error('Error downloading the file:', error));
        }catch(err){
            console.error(err);
        }
        setDownloadLoading(false);
    }

    return {downloadLoading,fetchFile}
}