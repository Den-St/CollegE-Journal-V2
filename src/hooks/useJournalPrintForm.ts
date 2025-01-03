import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export const useJournalPrintForm = (refetch:() => void) => {
    const componentRef = useRef(null);
    const [printLoading,setPrintLoading] = useState(false);
    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent:async () => {
          const printForm = document.getElementById('printForm');
          if(!printForm) return;
          printForm.style.display = 'flex';
        },
        onAfterPrint:() => {
          const printForm = document.getElementById('printForm');
          if(!printForm) return;
          printForm.style.display = 'none';
        },
      });
    const handlePrintAndRefetch = async () => {
        setPrintLoading(true);
        refetch();
        setTimeout(() => {
            handlePrint();
            setPrintLoading(false);
        },100);
    }

    return {handlePrintAndRefetch,printLoading,componentRef}
}