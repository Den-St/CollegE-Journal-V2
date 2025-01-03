import { useState } from 'react';
export const useSideMenu = () => {
    const [sideMenuOpened,setSideMenuOpened] = useState<"shown" | "hidden">("hidden");
    
    const onToggleSideMenu = () => {
        setSideMenuOpened(sideMenuOpened === "hidden" ? "shown" : "hidden");
        if(sideMenuOpened === "hidden"){
            document.body.classList.add('scrollOff');
            document.body.classList.remove('scrollOn');
        }else{
            document.body.classList.add('scrollOn');
            document.body.classList.remove('scrollOff');
        }
    }

    return {sideMenuOpened,onToggleSideMenu};
}