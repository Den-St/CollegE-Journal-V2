import { useRef, useState } from "react";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import "./checkScheduleModal.scss";

type Props = {
    onClose:() => void
}

const groups = Array.from(Array(20).keys());
const days = ["Понеділок","Вівторок","Середа","Четвер","П'ятниця"];
const lessons = ["ЛА та АГ","Історія України","Захист України","Фізика та Астрономія","-"];

const useScrollAndDrag = () => {
    const cellsRef = useRef<HTMLDivElement>(null);
    const lessonTypesRef = useRef<HTMLDivElement>(null);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const datesRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef<{x:number,y:number}>({x:0,y:0})
    const [isMouseDown,setIsMouseDown] = useState(false);
    
    const handleHorizontalScroll = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null || datesRef.current === null) return;
        lessonTypesRef.current.scrollLeft = cellsRef.current.scrollLeft;
        datesRef.current.scrollTop = cellsRef.current.scrollTop;
    }
    const handleDatesScroll = () => {
        if(cellsRef.current === null || datesRef.current === null) return;
        cellsRef.current.scrollTop = datesRef.current.scrollTop;
    }
    const handleHorizontalScrollLessonTypes = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null) return;
        cellsRef.current.scrollLeft = lessonTypesRef.current.scrollLeft;
    }
    const handleVerticalScroll = () => {
        if(mainContainerRef.current === null || cellsRef.current === null || datesRef.current === null) return;
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

    return {cellsRef,lessonTypesRef,mainContainerRef,mousePos,handleHorizontalScroll,
            handleHorizontalScrollLessonTypes,handleVerticalScroll,mouseDownHandler,
            mouseUpHandler,onMouseMove,datesRef,handleDatesScroll}
}

export const CheckScheduleModal:React.FC<Props> = ({onClose}) => {
    const {cellsRef,lessonTypesRef,mainContainerRef,mousePos,handleHorizontalScroll,
        handleHorizontalScrollLessonTypes,handleVerticalScroll,mouseDownHandler,
        mouseUpHandler,onMouseMove,datesRef,handleDatesScroll} = useScrollAndDrag();

    return <div className="checkScheduleModal_container">
        <div className="checkScheduleModal_header">
            <div style={{display:'flex','flexDirection':'column','gap':'30px'}}>
                <h1 className="header">Перевірка розкладу</h1>
                <LinkBack goTo={onClose} title="Налаштування розкладу"/>
            </div>
            <p className="checkScheduleModal_errorMessage">Отримані дані для розкладу некоректні. Перевірте файл та спробуйте знову.</p>
            <button className="primary_button" style={{'width':'312px'}}>Підтвердити розклад</button>
        </div>
        <div className="checkScheduleModal_main">
            <div className="checkScheduleModal_top" onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler} >
                <div className="checkScheduleModal_top">
                    <p className="checkScheduleModal_columnName">День</p>
                    <p className="checkScheduleModal_columnName">Год</p>
                </div>
                <div className="checkScheduleModal_groups" onScroll={handleHorizontalScrollLessonTypes} ref={lessonTypesRef}>
                    {groups.map(group => <p className="checkScheduleModal_group">3-11</p>)}
                </div>
            </div>
            <div className="checkScheduleModal_center" ref={mainContainerRef} onScroll={handleVerticalScroll}>
                <div className="checkScheduleModal_dates"
                ref={datesRef}
                onScroll={handleDatesScroll}
                onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler} 
                // onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                // onMouseMove={onMouseMove}
                // // onDrag={onMouseMove}
                // // draggable
                // // style={{width:!!journalWidth ? (+journalWidth - 332)+'px' : 'unset'}}
                // ref={cellsRef} onScroll={handleVerticalScroll}
                >
                    {days.map(day => <div className="checkScheduleModal_daySchedule_container">
                        <p className="checkScheduleModal_daySchedule_day">{day}</p>
                        <div className="checkScheduleModal_dayTimings_container">
                            <p className="checkScheduleModal_dayTiming">08:00<br/>09:20</p>
                            <p className="checkScheduleModal_dayTiming">09:45<br/>11:05</p>
                            <p className="checkScheduleModal_dayTiming">11:30<br/>12:50</p>
                            <p className="checkScheduleModal_dayTiming">13:15<br/>14:35</p>
                            <p className="checkScheduleModal_dayTiming">15:00<br/>16:20</p>
                        </div>
                    </div>)}
                </div>
                <div className="checkScheduleModal_lessons"
                 onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                 onMouseMove={onMouseMove}
                 // onDrag={onMouseMove}
                 // draggable
                 // style={{width:!!journalWidth ? (+journalWidth - 332)+'px' : 'unset'}}
                 ref={cellsRef} onScroll={handleHorizontalScroll}>
                    {groups.map(group => 
                        <div className="checkScheduleModal_lessons_group_container">
                            {days.map(day => 
                                <div className="checkScheduleModal_lessons_group_day_lessons_container">
                                    {lessons.map(lessons => <p className="checkScheduleModal_lesson">{lessons}</p>)}
                                </div>
                            )}
                        </div>
                    )}
                </div>  
            </div>
        </div>
    </div>
}