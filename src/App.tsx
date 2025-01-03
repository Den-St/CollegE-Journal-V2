import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RoutesSwitch } from "./consts/routes";
import { sectionIds, sectionsKeys } from "./consts/sectionIds";
import { themes } from "./consts/themes";
import "./globalStyles.scss";
import { goToSection } from "./helpers/goToSection";
import { AuthProdiver } from "./providers/authProvider";
import { useSideMenuStore } from "./store/sideMenuStore";
import { useThemeStore } from "./store/themeStore";
import { useUserStore } from "./store/userStore";

function App() {
    const theme = useThemeStore().theme;
    const { onCloseSideMenu } = useSideMenuStore();
    const route = useLocation().pathname;
    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get("section") as sectionsKeys | undefined;

    useEffect(() => {
        if (theme === themes.dark) {
            document.body.classList.remove(themes.light);
            document.body.classList.add(theme);
        } else {
            document.body.classList.remove(themes.dark);
            document.body.classList.add(theme);
        }
    }, [theme]);

    // useEffect(() => {
    //   window.scrollTo({top:0});
    //   onCloseSideMenu();
    //   if(section){
    //     goToSection(sectionIds[section]?.scrollTo);
    //   }
    // },[route]);

    const user = useUserStore().user;
    return (
        <Layout>
            <AuthProdiver>
                <RoutesSwitch />
            </AuthProdiver>
        </Layout>
    );
}

export default App;
