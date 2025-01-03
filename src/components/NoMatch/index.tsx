import { NoMatchRobot } from "../../assets/svgs/noMatchRobot"
import { useThemeStore } from "../../store/themeStore";
import './noMatchStyles.scss';

type Props = {
    title?:string;
    description?:string | React.ReactNode
    is404?:boolean,
    isChildren?:boolean,
    errorCode?:number | null
}

export const NoMatch:React.FC<Props> = ({title,description,is404,isChildren,errorCode = 404}) => {
    const theme = useThemeStore().theme;
    
    return <main className={`noMatch__container ${theme} ${(!isChildren || is404) && `no_match`}`}>
        <div className="noMatchImages__container">
            <NoMatchRobot/>
            {is404 && <span className="noMatch__404">{errorCode}</span>}
        </div>
        <h1 className="noMatchImages__title">{title}</h1>
        <p className="noMatchImages__description">{description}</p>
    </main>
}