import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg";
import { useThemeStore } from "../../store/themeStore"
import './scheduleCreateStyles.scss';

export const ScheduleCreate = () => {
    const theme = useThemeStore().theme;

    return <main className={`scheduleCreate__main ${theme}`}>
        <h1 className="scheduleCreate__h1">Створення розділу</h1>
        <div className="scheduleCreateControllers__container">
            <div className="scheduleCreateControllers__item">
                <UploadSvg/>
                <h2 className="scheduleCreateControllerItem__title">Імпортувати Файл</h2>
                <h3 className="scheduleCreateControllerItem__text">XML, XLSM, XLSX</h3>
            </div>
            <div className="scheduleCreateControllers__item">
                <FilterIconSvg/>
                <h2 className="scheduleCreateControllerItem__title">Налаштування</h2>
                <h3 className="scheduleCreateControllerItem__text">Ви можете редагувати розклад власноруч, або створити новий</h3>
            </div>
        </div>
    </main>
}