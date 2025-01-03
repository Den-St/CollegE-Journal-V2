import { Link, useLocation } from 'react-router-dom';
import './headerStyles.scss';
import {CollegeLogoSvg} from '../../assets/svgs/college_logo';
import { Modal, Popover, Switch } from 'antd';
import { themes } from '../../consts/themes';
import { useThemeController } from '../../hooks/themeController';
import { sectionIds } from '../../consts/sectionIds';
import { headerRoutes, routes } from '../../consts/routes';
import { goToSection } from '../../helpers/goToSection';
import { useCallback, useEffect, useRef, useState } from 'react';
import _debounce from 'lodash/debounce';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { useSideMenu } from '../../hooks/sideMenu';
import { SideMenu } from '../SideMenu';
import { useUserStore } from '../../store/userStore';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { UserPopup } from '../UserPopup';
import { HeaderNavLinks } from './HeaderNavLinks';
import { useSideMenuStore } from '../../store/sideMenuStore';
import { securityLevels } from '../../consts/securityLevels';

const useHeaderVisibility = () => {
    const [headerVisibilityClass,setHeaderVisibilityClass] = useState<'visible' | 'hidden' | 'visible_on_scroll' | 'visible_on_touch'>('visible');
    const onTouchShowHeader = () => {
        setHeaderVisibilityClass('visible_on_touch');
    }
    const onMouseOutBlur = () => {
        const distanceFromTop = window.scrollY;

        distanceFromTop > 30 && setHeaderVisibilityClass('hidden');
    }
    const lastScrollPos = useRef(window.scrollY);
    const handleScroll = () => {
        const distanceFromTop = window.scrollY;

        setHeaderVisibilityClass(distanceFromTop > lastScrollPos.current ? 'hidden' : 'visible_on_scroll');
        distanceFromTop < 30 && setHeaderVisibilityClass('visible');
        lastScrollPos.current = window.scrollY;
    }
    const debounceHandleScroll = useCallback(_debounce(handleScroll, 100),[lastScrollPos.current]);

    useEffect(() => {
        window.addEventListener('scroll',debounceHandleScroll);
    },[]);

    return {headerVisibilityClass,onTouchShowHeader,onMouseOutBlur}
}

export const Header = () => {
    const {theme,onToggleThemeSwitch} = useThemeController();
    const route = useLocation().pathname.replace('/','');
    const user = useUserStore().user;
    const {headerVisibilityClass,onTouchShowHeader,onMouseOutBlur} = useHeaderVisibility();
    const {sideMenuOpened,onToggleSideMenu} = useSideMenuStore();
//${headerVisibilityClass}
    return <header className={`header ${theme} ${route+'home'} ${'sideMenu' + sideMenuOpened}`}>
            {/* <div onMouseOver={onTouchShowHeader} className='header_hover_trigger'></div> */}
            <SideMenu openedClass={sideMenuOpened} goToSection={goToSection} onToggleSideMenu={onToggleSideMenu}/>
            <div className={`header_container `}>
                <div onMouseLeave={onMouseOutBlur} className="header__wrapper">
                    <div className='headerLeft_mobile'>
                        <button onClick={onToggleSideMenu} className={`header_toggleMenu ${sideMenuOpened}`}>
                            <FilterIconSvg/>
                        </button>
                        <div className="logo__block">
                            <Link  to={routes.homePage} className="header__logo">
                                <CollegeLogoSvg/>
                            </Link>
                        </div>
                    </div>
                    <nav className="nav">
                        <HeaderNavLinks linksClassName='menu__button'/>
                    </nav>
                    <div className='headerRightButtons__container'>
                        {/* <Switch defaultChecked={true} onChange={onToggleThemeSwitch} checked={theme === themes.dark}/> */}
                        <div style={{'width':'50px'}}></div>
                        {!user.full_name 
                        ? <div className="signIn">
                            <Link to="/sign-in" className="signBtn">Вхід</Link>
                        </div> 
                        : <Popover rootClassName='userPopup' arrow={false} content={<UserPopup/>} placement={'bottomRight'}>
                            <Link to={user.security_level === securityLevels.admin ? routes.adminPanel + '?section=schedule' : routes.myProfile}>
                                <img className='header_avatar' src={user.avatar || defaultAvatar}/>
                            </Link>
                        </Popover>}
                    </div>
                </div>
            </div>
        </header>
}