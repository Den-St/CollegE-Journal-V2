export const getStartAndEnd = (offset:number,formatedModaysAndSaturdays:(Date | undefined)[]) => {
    const currentMonday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2 - 1)];
    const currentSaturday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2)];

    return {start:Math.round((currentMonday?.getTime() || 0)/1000),end:Math.round((currentSaturday?.getTime() || 0)/1000)};
}
