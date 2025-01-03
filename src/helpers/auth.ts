import Cookies from "js-cookie";

export const setToken = (token:string) =>{
    Cookies.set("token",token);
}
export const getToken = () =>{
    return Cookies.get("token");
}
export const deleteTokenCookie = () =>{
    Cookies.remove("token");
}