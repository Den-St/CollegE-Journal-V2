export type sectionType = {id:string,distanceBottom:number,title:string,distanceTop:number,scrollTo:number};
export type sectionsKeys = keyof typeof sectionIds;

export const sectionIds:Record<'start' | 'news' | 'info' | 'about',sectionType> = {
    start:{
        id:'#start',
        distanceTop:0,
        scrollTo:0,
        distanceBottom:400,
        title:"Старт"
    },
    news:{
        id:'#news',
        distanceTop:500,
        scrollTo:700,
        distanceBottom:1005,
        title:"Новини"
    },
    info:{
        id:'#info',
        distanceTop:1005,
        scrollTo:1305,
        distanceBottom:1720,
        title:"Журнал"
    },
    about:{
        id:'#about',
        distanceTop:1720,
        scrollTo:2120,
        distanceBottom:2550,
        title:"Про Нас"
    }
}