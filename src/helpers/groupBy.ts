export const myGroupBy = (array:any[],fn:(field:any) => any) => {
    let result = {};

    //@ts-ignore
    array.forEach(x => {
    //@ts-ignore
        if (result[fn(x)]) result[fn(x)].push(x);
    //@ts-ignore
        else result[fn(x)] = [x];
    });

    return result;
}