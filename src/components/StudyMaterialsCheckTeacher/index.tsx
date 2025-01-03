import { PaperClip } from '../../assets/svgs/paperClip';
import { useThemeStore } from '../../store/themeStore';
import './studyMaterialsCheckTeacherStyles.scss';

export const StudyMaterialsCheckTeacher = () => {
    const theme = useThemeStore().theme;
    const hashTags = [{
        id:1,
        name:'Сорока'
    },{
        id:2,
        name:'РКСЗ'
    },{
        id:3,
        name:'Java'
    },{
        id:4,
        name:'Кн-41'
    },{
        id:5,
        name:'Кб-41'
    },{
        id:6,
        name:'З-41'
    },];

    return <main className={`smCheck__main ${theme}`}>
        <h1 className='smCheck__title'>Освітні матеріали</h1>
        <section className='smCheckHashTags__section'> 
            <h3 className='smCheckSection__title'>Посібнік по джаві для Чайників</h3>
            <div className='smCheckHashTags__container'>
                {hashTags.map(hashTag => <p key={hashTag.id} className={'smCheckHashTag__item'}>{hashTag.name}</p>)}
            </div>
        </section>
        <section className='smCheckDescription__section'> 
            <h3 className='smCheckSection__title'>Опис:</h3>
            <div className='smCheckxxxl_container'>
                <p className='smCheckdescription__text'>
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів,
                </p>
                <div className="smCheckAttachFileInput__container">
                    <div className="sendHomeTaskHomeTaskAttachedFiles__container">
                        <div className="sendHomeTaskHomeTaskAttachedFileItem">
                            <PaperClip/>
                            <div className="sendHomeTaskHomeTaskAttachedFileItemInfo__container">
                                <span className="sendHomeTaskHomeTaskAttachedFileItemName">Назва файлу</span>
                                <span className="sendHomeTaskHomeTaskAttachedFileItemFormat">PDF</span>
                            </div>
                        </div>
                    </div>
                    <div className="sendHomeTaskHomeTaskAttachedLinks__container">
                        <div className="sendHomeTaskHomeTaskAttachedLinkItem">
                            <PaperClip/>
                            <div className="sendHomeTaskHomeTaskAttachedLinkItemInfo__container">
                                <span className="sendHomeTaskHomeTaskAttachedLinkItemName">Назва сторінки</span>
                                <span className="sendHomeTaskHomeTaskAttachedLinkItemUrl">google.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='smCheckxxl_container'>
                <p className='smCheckdescription__text'>
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів,
                </p>
                <div className="smCheckAttachFileInput__container">
                    <div className="sendHomeTaskHomeTaskAttachedFiles__container">
                        <div className="sendHomeTaskHomeTaskAttachedFileItem">
                            <PaperClip/>
                            <div className="sendHomeTaskHomeTaskAttachedFileItemInfo__container">
                                <span className="sendHomeTaskHomeTaskAttachedFileItemName">Назва файлу</span>
                                <span className="sendHomeTaskHomeTaskAttachedFileItemFormat">PDF</span>
                            </div>
                        </div>
                    </div>
                    <div className="sendHomeTaskHomeTaskAttachedLinks__container">
                        <div className="sendHomeTaskHomeTaskAttachedLinkItem">
                            <PaperClip/>
                            <div className="sendHomeTaskHomeTaskAttachedLinkItemInfo__container">
                                <span className="sendHomeTaskHomeTaskAttachedLinkItemName">Назва сторінки</span>
                                <span className="sendHomeTaskHomeTaskAttachedLinkItemUrl">google.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sendHomeTaskHomeTaskAttachFileInput__container">
                <div className="sendHomeTaskHomeTaskAttachFileInput__styled">Завантажити файл</div>
                <input autoComplete="off"  className="sendHomeTaskHomeTaskAttachFile__input"/>
            </div>
        </section>
    </main>
}