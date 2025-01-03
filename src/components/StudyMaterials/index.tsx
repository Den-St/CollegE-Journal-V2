import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { MagnifierSvg } from "../../assets/svgs/MagnifierSvg";
import { useThemeStore } from "../../store/themeStore"
import './studyMaterialsStyles.scss';

export const StudyMaterials = () => {
    const theme = useThemeStore().theme;
    const studyMaterials = [
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        },
        {
            id:1,
            title:'Посібник по джаві для Чайників',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, на сторінках електронного журналу можна знайти матеріали ...',
            hashTags:[
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                },
                {
                    id:1,
                    name:'Сорока'
                }
            ]
        }
    ]

    return <div className={`studyMaterialsMain__container ${theme}`}>
        <section className="studyMaterialsSearch__container">
            <div className="studyMaterialsSearchInput__container">
                <input autoComplete="off"  placeholder="Пошук" className="studyMaterialsSearch__input"/>
                <MagnifierSvg/>
            </div>
            <button className="studyMaterialsSearch__button">
                <FilterIconSvg/>
            </button>
        </section>
        <section className="studyMaterialsItems__section">
            <div className="studyMaterialsItems__container">
                {studyMaterials.map(studyMaterial => 
                    <Link to={'#'} key={studyMaterial.id} className="studyMaterialsItem__container">
                        <h1 className="studyMaterialsItem__title">{studyMaterial.title}</h1>
                        <div className="studyMaterialsContent__container">
                            <p  className="studyMaterialsContent__text">{studyMaterial.text}</p>
                            <div className="studyMaterialsContentHashTags__container">
                                {studyMaterial.hashTags.map(hashTag => 
                                    <div key={hashTag.id} className="studyMaterialsContentHashTagItem__container">
                                        <p className="studyMaterialsContentHashTagItem__name">{hashTag.name}</p>
                                    </div>    
                                )}
                            </div>
                        <div className="studyMaterialsItemHoverAnimation"/>
                        </div>
                    </Link>
                )}
            </div>
        </section>
        <section className="studyMaterialsSeeMore__container">
            <button className="studyMaterialSeeMore__button">Дивитися більше</button>
        </section>
    </div>
}