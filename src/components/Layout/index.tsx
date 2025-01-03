import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../consts/routes";
import { useThemeStore } from "../../store/themeStore";
import { CookiesNotification } from "../CookiesNotification";
import { Footer } from "../Footer";
import { Header } from "../Header"
import "./layoutStyles.scss";
type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const theme = useThemeStore().theme;
    const route = useLocation().pathname;

    return <div className={`layout__container ${theme}`}>
            {route !== routes.googleLogin && <Header/>}
            <main>{children}</main>
            {route !== routes.googleLogin && <Footer/>}
            {route !== routes.googleLogin && <CookiesNotification/>}
        </div>
}