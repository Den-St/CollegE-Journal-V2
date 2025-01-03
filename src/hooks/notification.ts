import { notification } from "antd";

export const useNotification = (message?:string | React.ReactNode,description?:string | React.ReactNode,messageError?:string | React.ReactNode,descriptionError?:string | React.ReactNode,) => {
    const [api, contextHolder] = notification.useNotification({});

    const openSuccessNotification = () => {
        api["success"]({
            message,
            description,
            placement:'topRight',
            'className':'letterSentNotification',
            'duration':4
        });
    };
    const openErrorNotification = () => {
        if(!messageError && !descriptionError) return;
        api["error"]({
            message:messageError,
            description:descriptionError,
            placement:'topRight',
            'className':'letterSentNotification',
            'duration':4
        });
    }

    return {openSuccessNotification,openErrorNotification,contextHolder}
}