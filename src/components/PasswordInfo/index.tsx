import { useThemeStore } from "../../store/themeStore";
import "./passwordInfoStyles.scss";

export const PasswordInfo = () => {
    const theme = useThemeStore().theme;

    return <div className={`passwordInfo_container ${theme}`}>
        <h2 className="passwordInfo_header">Яким має бути пароль?</h2>
        <ul className="passwordInfo_list">
            <li className="passwordInfo_listItem">Довжина пароля має бути від 8 до 30 символів</li>
            <li className="passwordInfo_listItem">Має містити лише літери латинського алфавіту та хоча б одну велику літеру</li>
            <li className="passwordInfo_listItem">Має містити хоча б один спеціальний символ(!@#$%^&*+-/_) та хоча б одну цифру</li>
        </ul>
    </div>
}