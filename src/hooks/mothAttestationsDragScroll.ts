import { useRef, useState } from "react";

export const useMonthAttestationDragScroll = () => {
    const cellsRef = useRef<HTMLDivElement>(null);
    const lessonTypesRef = useRef<HTMLDivElement>(null);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const teachersRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef<{x:number,y:number}>({x:0,y:0})
    const [isMouseDown,setIsMouseDown] = useState(false);
    const handleHorizontalScroll = (elementName:"cells" | "lessonTypes" | "teachers" | "subjects") => {
        if(lessonTypesRef.current === null || cellsRef.current === null || teachersRef.current === null) return;
        if(elementName === "cells"){
            lessonTypesRef.current.scrollLeft = cellsRef.current.scrollLeft;
            teachersRef.current.scrollLeft = cellsRef.current.scrollLeft;
        }else if(elementName === "lessonTypes"){
            cellsRef.current.scrollLeft = lessonTypesRef.current.scrollLeft;
            teachersRef.current.scrollLeft = lessonTypesRef.current.scrollLeft;
        } else if(elementName === "teachers"){
            cellsRef.current.scrollLeft = teachersRef.current.scrollLeft;
            lessonTypesRef.current.scrollLeft = teachersRef.current.scrollLeft;
        } 
    }
    const handleHorizontalScrollLessonTypes = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null) return;
        cellsRef.current.scrollLeft = lessonTypesRef.current.scrollLeft;
    }
    const handleVerticalScroll = () => {
        if(mainContainerRef.current === null || cellsRef.current === null) return;
        cellsRef.current.scrollTop = mainContainerRef.current.scrollTop;
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
        if(lessonTypesRef.current === null || cellsRef.current === null || mainContainerRef.current === null) return;
        
        const deltaX = !localMousePos ? e.clientX - mousePos.current.x : e.clientX - localMousePos.x;
        const deltaY = !localMousePos ? e.clientY - mousePos.current.y : e.clientY - localMousePos.y;
        if(deltaX < 0){
            cellsRef.current.scrollLeft += 5 - deltaX;
            lessonTypesRef.current.scrollLeft += 5 - deltaX;
        }else if(deltaX > 0){
            cellsRef.current.scrollLeft -= 5 + deltaX;
            lessonTypesRef.current.scrollLeft -= 5 - deltaX;
        }
        if(deltaY < 0){
            cellsRef.current.scrollTop += 5 - deltaY;
            mainContainerRef.current.scrollTop += 5 - deltaY;
        }else if(deltaY > 0){
            cellsRef.current.scrollTop -= 5 + deltaY;
            mainContainerRef.current.scrollTop -= 5 + deltaY;
        }
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
    }

        
    return {cellsRef,lessonTypesRef,mainContainerRef,mousePos,onMouseMove,mouseUpHandler,
           mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,
           handleVerticalScroll,teachersRef,}
}