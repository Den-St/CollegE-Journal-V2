import { Footer } from "../Footer";
import { HeaderNavLinks } from "../Header/HeaderNavLinks";
import "./sideMenuStyles.scss";

type Props = {
    openedClass:"shown" | "hidden",
    goToSection:(sectionLocation:number) => void,
    onToggleSideMenu:() => void
}

export const SideMenu:React.FC<Props> = ({openedClass,goToSection,onToggleSideMenu}) => {
    const onGoToSection = (sectionLocation:number) => {
        onToggleSideMenu();
        goToSection(sectionLocation);
    }

    return <div id={'sideMenu_container'} className={`sideMenu_container ${openedClass}`}>
        <nav className="sideMenu_nav">
            <HeaderNavLinks onGoToSection={onGoToSection} linksClassName={'sideMenu_nav__link'}/>
        </nav>
        <Footer/>
    </div>
}