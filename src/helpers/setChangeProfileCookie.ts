import Cookies from "js-cookie";

export const setChangeProfileCookie = () => {
    Cookies.set('comfirmedPassword','true',{expires:new Date(new Date().getTime() + 10 * 1000)});
}