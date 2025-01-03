import { useRef, useState } from "react";

export const useAbsenceTableTeacherSubjectsDragToScroll = () => {
    const teachersRef = useRef<HTMLDivElement>(null);
    const subjectsRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef<{x:number,y:number}>({x:0,y:0})
    const [isMouseDown,setIsMouseDown] = useState(false);
    const handleHorizontalScrollTeachers = () => {
        if(subjectsRef.current === null || teachersRef.current === null) return;
        subjectsRef.current.scrollLeft = teachersRef.current.scrollLeft;
    }
    const handleHorizontalScrollSubjects = () => {
        if(subjectsRef.current === null || teachersRef.current === null) return;
        teachersRef.current.scrollLeft = subjectsRef.current.scrollLeft;
    }

    const mouseDownHandler = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        setIsMouseDown(true);
        onMouseMove(e,true,{x:e.clientX,y:e.clientY});
    }
    const mouseUpHandler = () => {
        setIsMouseDown(false);
    }
    const onMouseMove = (e:React.MouseEvent<HTMLDivElement,MouseEvent>,localIsMouseDown?:boolean,localMousePos?:{x:number,y:number}) => {
        if(!isMouseDown && !localIsMouseDown) return;
        if(subjectsRef.current === null || teachersRef.current === null) return;
        
        const deltaX = !localMousePos ? e.clientX - mousePos.current.x : e.clientX - localMousePos.x;
        if(deltaX < 0){
            teachersRef.current.scrollLeft += 5 - deltaX;
            subjectsRef.current.scrollLeft += 5 - deltaX;
        }else if(deltaX > 0){
            teachersRef.current.scrollLeft -= 5 + deltaX;
            subjectsRef.current.scrollLeft -= 5 - deltaX;
        }
        mousePos.current.x = e.clientX;
    }

    return {teachersRef,subjectsRef,mousePos,onMouseMove,mouseUpHandler,mouseDownHandler,handleHorizontalScrollSubjects,handleHorizontalScrollTeachers}
}