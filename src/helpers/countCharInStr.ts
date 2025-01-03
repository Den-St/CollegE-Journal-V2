export const countCharInStr = (str:string,char:string) => {
    let count = 0;
    for(let i = 0;i < str.length;i++){
        if(char === str[i]) count++;
    }

    return count;
}