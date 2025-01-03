import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../consts/routes";
import { sectionIds } from "../../consts/sectionIds";
import { goToSection } from "../../helpers/goToSection";
import { useUserStore } from "../../store/userStore";

type Props = {
    linksClassName:string,
    onGoToSection?:(scrollTo:number) => void,
}
export const HeaderNavLinks:React.FC<Props> = ({linksClassName,onGoToSection,}) => {
    const route = useLocation().pathname.replace('/','');
    const isActiveLink = (link:string) => '/' + route === link || route.includes(link) ? ' active_link' : '';
    const securityLevelToLinks:Record<number,JSX.Element> = {
        0:<></>,
        1:<>
            <Link  to={routes.pickJournalSubject} className={linksClassName + isActiveLink(routes.pickJournalSubject) + isActiveLink(routes.journal)}>Журнал
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
        </>,
        4:<>
            <Link  to={routes.groups} className={linksClassName + isActiveLink(routes.groups) + isActiveLink(routes.pickJournalSubject) + isActiveLink(routes.journal) + isActiveLink(routes.absenceTable)}>
                Журнал
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.homeTasks
                // '#'
                } className={linksClassName + isActiveLink(// routes.groups
                    ' ')}>
                Завдання
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.schedule
                // '#'
                } className={linksClassName + isActiveLink(// routes.groups
                ' ')}>
                Розклад
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.studyMaterials
                // '#'
                } className={linksClassName + isActiveLink(// routes.groups
                ' ')}>
                Осв. матеріали
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
        </>,
        5:<>
            <Link  to={routes.groups} className={linksClassName + isActiveLink(routes.groups) + isActiveLink(routes.pickJournalSubject) + isActiveLink(routes.journal) + isActiveLink(routes.absenceTable)}>Журнал
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.homeTasks} className={linksClassName + isActiveLink(routes.homeTasks)}>
                Завдання
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link to={routes.schedule} className={linksClassName + isActiveLink(routes.schedule)}>
                Розклад
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.studyMaterials} className={linksClassName + isActiveLink(routes.studyMaterials)}>
                Осв. матеріали
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
        </>
    }
    const user = useUserStore().user;

    return <>
        {(!route || !user.full_name) && <>
            <Link to={'https://college.suitt.edu.ua/'} target={'_blank'} className={linksClassName}>
                Сайт коледжу
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            </>}
            <>
            {user.is_active && securityLevelToLinks[user.security_level || 0]}
            {!route ? <button onClick={() => (onGoToSection || goToSection)(sectionIds.news.scrollTo)} className={linksClassName}>Новини
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </button>
            : <Link  className={linksClassName} to={routes.homePage + '?section=news'}>
                    Новини
                    <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                        <path d="M1 1H51" strokeLinecap="round"/>
                    </svg>
                </Link>}
            {!route &&  <Link  to={routes.faq} className={linksClassName + isActiveLink(routes.faq)}>
                FAQ
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>}
            {/* {!!route && !!user.full_name && <Link  className={linksClassName} to={routes.homePage + '?section=news'}>
                Новини
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>} */}
            </>
        </>
}