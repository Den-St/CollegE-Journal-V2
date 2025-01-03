export type NewsT = {
    body:string 
    data:string
    id: number
    topic: string
}

export type HomePageDataT = {
    about_journal: string,
    about_us: { 
        body:string,
        topic: string
    },
    news:NewsT[]
    topic: string
}