import "./cookiesNotificationStyles.scss";
import { CollegeLogoSvg } from "../../assets/svgs/college_logo";
import { useThemeStore } from "../../store/themeStore";
import { useState } from "react";

export const CookiesNotification = () => {
    const useCookies = () => {
        const [isCookiesAccepted,setIsCookiesAccepted] = useState(!!localStorage.getItem('cookiesAccepted'));

        const onAccept = () => {
            localStorage.setItem('cookiesAccepted','true');
            setIsCookiesAccepted(true);
        }
        return {onAccept,isCookiesAccepted}
    }
    const {isCookiesAccepted,onAccept} = useCookies();
    const theme = useThemeStore().theme;
    if(isCookiesAccepted) return <></>;

    return <div className={`cookies__container ${theme}`}>
        <div className="cookiesNotificationLeft_container">
            <div style={{'marginTop':'-10px'}}><CollegeLogoSvg/></div>
            <p className="cookiesInfo">Ми використовуємо Cookies, для покращення вашого досвіду користування сайтом та повного функціонування сайту</p>
        </div>
        <button className="cookiesAccept_button" onClick={onAccept}>Прийняти усе</button>
    </div>
}