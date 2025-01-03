import axios from "axios";
import Cookies from "js-cookie";
import {getToken} from "./helpers/auth";

export const getConfig = () => {
    const token = getToken();
    return {
        headers: {Authorization: token}
    }
};

const instance = axios.create({
    baseURL:"https://collegejournal.ovh/api/",
    ...getConfig(),
});


export default instance;