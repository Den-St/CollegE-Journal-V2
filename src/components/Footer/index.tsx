import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CollegeLogoSvg } from '../../assets/svgs/college_logo';
import { routes } from '../../consts/routes';
import { sectionIds } from '../../consts/sectionIds';
import { goToSection } from '../../helpers/goToSection';
import { useThemeStore } from '../../store/themeStore'
import './footerStyles.scss'

export const Footer = () => {
    const theme = useThemeStore().theme;
    const route = useLocation().pathname.replace('/','');
    const year = new Date().getFullYear();
    
    return <><footer>
        <div className={`footer__content ${theme} ${route+'home'}`}>
            <div className="footer__logo">
                <Link to={routes.homePage} ><CollegeLogoSvg/></Link>
                <h1 className="footer__title">Електронний журнал - це журнал, який завжди поруч!</h1>
            </div>
            <div className="footer__circle"/>
            <div className="btn__lists">
                <ul className="footer__list">
                    <h1 className="fList__title">Більше Про Журнал</h1>
                    {/* <li><button className="fList__btn" onClick={() => goToSection(sectionIds.start.distanceTop)}>Головна</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.news.distanceTop)}>Новини</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.about.distanceTop)}>Про нас</button></li> */}
                    <li><Link  to={routes.homePage} className="fList__btn">Головна</Link></li>
                    {!route ?
                     <li><button className="fList__btn" onClick={() => goToSection(sectionIds.news.scrollTo)}>Новини</button></li> 
                    : <li><Link  className="fList__btn" to={routes.homePage + '?section=news'}>Новини</Link></li> }
                    {/* {!route ? 
                        <li><button className="fList__btn" onClick={() => goToSection(sectionIds.about.scrollTo)}>Про нас</button></li>
                    : <li><Link  className="fList__btn" to={routes.homePage + `?section=about`}>Про нас</Link></li>} */}
                    <li><Link  className="fList__btn" to={routes.teachers}>Викладачі</Link></li>
                    <li><Link  className="fList__btn" to={routes.faq}>FAQ</Link></li>
                </ul>
                <div>
                    <h1 className="fList__title">Ми У Соц. Мережах</h1>
                    <ul className="footer__list footer__list_socials">
                        <li><a className="fList__btn" href="https://www.instagram.com/college_suitt/" target={'_blank'}>Instagram</a></li>
                        <li><a className="fList__btn" href="https://t.me/kzinews" target={'_blank'}>Telegram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <div className="bottom__title"><h1 className="bottom__text">© Електронний щоденник, ФКЗІ ДУІТЗ. Всі права захищені, {year}.</h1></div>
    </>
}