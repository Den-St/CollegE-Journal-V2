import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const useAbsenceTablePrintForm = () => {
    const componentRef = useRef(null);
    
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
        }
      });


    return {handlePrint,componentRef}
}