import { eachDayOfInterval, nextSaturday, format } from "date-fns";

export const getMondaysAndSaturdays = () => {
    const today = new Date();
    today.setHours(6);
    const days = eachDayOfInterval({
        start: new Date(today.getFullYear(), 0, 1,6),
        end: nextSaturday(today)
    });

    const formatedModaysAndSaturdays = days.map(el => { 
        if(format(el, 'EEEE') !== "Monday" &&  format(el, 'EEEE') !== 'Saturday') return;

        const date = new Date(el);
        if(format(el, 'EEEE') === "Monday") date.setHours(6);
        if(format(el, 'EEEE') === "Saturday") date.setHours(10);
        return date;
    }).filter(date => !!date);

    return formatedModaysAndSaturdays;
}