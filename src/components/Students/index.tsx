import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { NotReadyPage } from '../../assets/components/NotReadyPage';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { useThemeStore } from '../../store/themeStore';
import { NoMatch } from '../NoMatch';
import './studentsStyle.scss';
const {Option} = Select;

export const Students = () => {
    const theme = useThemeStore().theme;

    return <NotReadyPage/>
    return <div className={`main__container ${theme}`}>
            <section className="studentTitle__container">
                <h1 className="studentTitle">Список студентів</h1>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                    </div>}
                    className="fillter_select"
                    allowClear
                    >
                        <Option value={'3-11'} label={'3-11'}>3-11 <FilterIconSvg/></Option>
                        <Option value={'3-21'} label={'3-21'}>3-21 <FilterIconSvg/></Option>
                        <Option value={'3-31'} label={'3-31'}>3-31 <FilterIconSvg/></Option>
                        <Option value={'3-41'} label={'3-41'}>3-41 <FilterIconSvg/></Option>
                    </Select>
                </div>
            </section>
            <section className="studentList__container">
                <div className="studentItems__container">
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                    <div className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                            <p className="studentName">Прізвище І.Б.</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                </div>
            </section>
        </div>
}