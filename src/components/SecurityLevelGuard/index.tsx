import { securityLevels } from "../../consts/securityLevels";
import { useUserStore } from "../../store/userStore"
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";

type Props = {
    children:React.ReactNode,
    securityLevel:number,
    isActiveRequired?:boolean,
    blockedForAdmin?:boolean
}

export const SecurityLevelGuard:React.FC<Props> = ({children,securityLevel,isActiveRequired,blockedForAdmin}) => {
    const user = useUserStore().user;
    const userLoading = useUserStore().loading;
    if(userLoading) return <Loader/>;
    if(user.security_level === null || user.security_level < securityLevel) return <NoMatch errorCode={403} title="Хто ви такі?" description={<span>Якщо ви не студент або викладач, то доступ до цієї сторінки вам заборонено. <br/> Спробуйте отримати потрібні права або зверніться до адміністрації!</span>} is404/>;
    if(isActiveRequired && !user.is_active) return <NoMatch title="Активуйте свій запис" description="Щоб отримати доступ до функціоналу електронного журналу необхідно змінити пароль."/>;
    if(blockedForAdmin && user.security_level === securityLevels.admin) return <NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>;

    return <>{children}</>
}