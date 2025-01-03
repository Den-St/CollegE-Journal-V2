import { Link } from "react-router-dom"
import { LeftArrowSvg } from "../../svgs/leftArrowSvg"
import './styles.scss';

type Props = {
    route?:string,
    title:string,
    goTo?:() => void
}

export const LinkBack:React.FC<Props> = ({route,title,goTo}) => {
    return !goTo && !!route 
    ? <Link className="linkBackContainer" to={route}><LeftArrowSvg/><h2 className="linkBackTitle">{title}</h2></Link>
    : <button className="linkBackContainer" onClick={goTo}><LeftArrowSvg/><h2 className="linkBackTitle">{title}</h2></button>
}