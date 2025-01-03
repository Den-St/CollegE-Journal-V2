import { PaperClip } from "../../assets/svgs/paperClip";
import { defaultAvatar } from "../../consts/defaultAvatar";
import "./sendHomeTask.scss";
import {Input} from 'antd';
import { useThemeStore } from "../../store/themeStore";
import { MagnifierSvg } from "../../assets/svgs/MagnifierSvg";
import { useState } from "react";
const {TextArea} = Input;

export const SendHomeTask = () => {
    const theme = useThemeStore().theme;
    type userT = {
        key: number;
        name: string;
        filesNumber: number;
        date: string;
        commentsNumber: number;
    }
    const [pickedPeople,setPickedPeople] = useState<null | userT>(null);
    const donePeople:userT[] = [{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },{
        key:1,
        name:'Степан Бондар',
        filesNumber:7,
        date:'12.10.23',
        commentsNumber:5
    },];

    return <div className={`sendHomeTaskMain__container ${theme}`}>
        <h1 className="sendHomeTaskMain__title">
            Домашнє завдання
        </h1>
        <section className="sendHomeTaskHomeTask__container">
            <div className="sendHomeTaskHomeTaskTopInfo__container">
                <p className="sendHomeTaskHomeTaskTitle">VPN ч.2</p>
                <p className="sendHomeTaskHomeTaskDate">23.09.2023</p>
            </div>
            <div className="sendHomeTaskHomeTaskText__container">
                <p className="sendHomeTaskHomeTaskText">
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію про проведення конференцій та семінарів, анонси важливих подій та оголошення.
                    Електронний щоденник дозволяє викладачам швидко та зручно вносити інформацію про оцінки, пропущені заняття та інші важливі події в житті коледжу, а  учням - дізнаватися про ці події негайно.
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію про проведення конференцій та семінарів, анонси важливих подій та оголошення.
                    Електронний щоденник дозволяє викладачам швидко та зручно вносити інформацію про оцінки, пропущені заняття та інші важливі події в житті коледжу, а  учням - дізнаватися про ці події негайно.
                </p>
            </div>
            <div className="sendHomeTaskHomeTaskAttachedInfo__container">
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
            <div className="sendHomeTaskHomeTaskAttachFileInput__container">
                <div className="sendHomeTaskHomeTaskAttachFileInput__styled">Завантажити файл</div>
                <input autoComplete="off"  className="sendHomeTaskHomeTaskAttachFile__input"/>
            </div>
        </section>
        <section className="sendHomeTaskPeopleDone__section">
            <div className="sendHomeTaskPeopleTitle_container">
                <h1 className="sendHomeTaskPeopleDone__title">Список виконавших</h1>
                <div className="studyMaterialsSearchInput__container">
                    <input autoComplete="off"  placeholder="Пошук" className="studyMaterialsSearch__input"/>
                    <MagnifierSvg/>
                </div>
            </div>
            {!pickedPeople && 
                <div className="sendHomeTaskPeopleDone__container">
                    {donePeople.map((item,i) => 
                        <div onClick={() => setPickedPeople(item)} key={i} className="sendHomeTaskPeople__container">
                            <img className="sendHomeTaskPeople__avatar" src={defaultAvatar}/>
                            <div className="sendHomeTaskPeopleFirst__container">
                                <p className="sendHomeTaskPeopleName">{item.name}</p>
                                <p className="sendHomeTaskPeopleFiles">Здано <p className="sendHomeTaskPeopleFilesNumber">{item.filesNumber}</p> файлів</p>
                            </div>
                            <div className="sendHomeTaskPeopleSecond__container">
                                <p className="sendHomeTaskPeopleComments">Коментарі: <p className="sendHomeTaskPeopleCommentsNumber">{item.commentsNumber}</p></p>
                                <p className="sendHomeTaskPeopleDone">Здано: <p className="sendHomeTaskPeopleDoneDate">{item.date}</p></p>
                            </div>
                        </div>
                    )}
                </div>}

                {pickedPeople && 
                    <div className="sendHomeTaskPickedPeople__container">
                        <div className="sendHomeTaskPickedPickedPeopleLeft__container">
                            <div className="sendHomeTaskPeople__container">
                                <img className="sendHomeTaskPeople__avatar" src={defaultAvatar}/>
                                <div className="sendHomeTaskPeopleFirst__container">
                                    <p className="sendHomeTaskPeopleName">{pickedPeople.name}</p>
                                    <p className="sendHomeTaskPeopleFiles">Здано <p className="sendHomeTaskPeopleFilesNumber">{pickedPeople.filesNumber}</p> файлів</p>
                                </div>
                            </div>
                            <div className="sendHomeTaskPeoplePickedStudentFiles_container">
                                <h1 className="sendHomeTaskPeopleDone__title">Файли від студента</h1>
                                <div className="sendHomeTaskHomeTaskAttachedFileItem">
                                    <PaperClip/>
                                    <div className="sendHomeTaskHomeTaskAttachedFileItemInfo__container">
                                        <span className="sendHomeTaskHomeTaskAttachedFileItemName">Назва файлу</span>
                                        <span className="sendHomeTaskHomeTaskAttachedFileItemFormat">PDF</span>
                                    </div>
                                </div>
                                <div className="sendHomeTaskHomeTaskAttachedFileItem">
                                    <PaperClip/>
                                    <div className="sendHomeTaskHomeTaskAttachedFileItemInfo__container">
                                        <span className="sendHomeTaskHomeTaskAttachedFileItemName">Назва файлу</span>
                                        <span className="sendHomeTaskHomeTaskAttachedFileItemFormat">PDF</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sendHomeTaskPeopleMarkSection_container">
                                <h1 className="sendHomeTaskPeopleDone__title">Оцінка студента</h1>
                                <div className="sendHomeTaskPickedPeopleMark_container">
                                    <p className="sendHomeTaskPickedPeopleMark">000</p>
                                    /
                                    <p className="sendHomeTaskPickedPeopleMark__100">100</p>
                                </div>
                            </div>
                        </div>
                        <section className="sendHomeTaskComments__section">
                            <h2 className="sendHomeTaskCommentsTitle">Коментарі</h2>
                            <div className="sendHomeTaskComments__container">
                                <div className="sendHomeTaskCommentItem__container">
                                    <TextArea className="commentTextArea"  autoSize placeholder="Коментар для викладача"/>
                                    <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                                </div>
                                <div className="sendHomeTaskCommentItem__container">
                                    <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                                    <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                                </div>
                                <div className="sendHomeTaskCommentItem__container">
                                    <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                                    <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                                </div>
                                <div className="sendHomeTaskCommentItem__container">
                                    <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                                    <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                                </div>
                            </div>
                        </section>
                    </div>
                }
        </section>
        <div className="sendHomeTaskBottom__container">
            <section className="sendHomeTaskComments__section">
                <h2 className="sendHomeTaskCommentsTitle">Коментарі</h2>
                <div className="sendHomeTaskComments__container">
                    <div className="sendHomeTaskCommentItem__container">
                        <TextArea className="commentTextArea"  autoSize placeholder="Коментар для викладача"/>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                </div>
            </section>
            <section className="sendHomeTaskOther__container">
                <h2 className="sendHomeTaskOther__title">Інші завдання викладача</h2>
                 <div className="sendHomeTaskOtherTasks__container">
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    </div>
}