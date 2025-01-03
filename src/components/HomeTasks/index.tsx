import { useThemeStore } from "../../store/themeStore";
import './homeTaskStyles.scss';
import {MoreOutlined} from "@ant-design/icons";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { Select } from "antd";
const {Option} = Select;

export const HomeTasks = () => {
  const theme = useThemeStore().theme;
  const subjects = [{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:false},];

  return <div className={`homeTaskMain__container ${theme}`}>
    <section className="homeTaskSubjects_main">
      <h2 className="header">Предмети</h2>
      <div className="homeTaskSubjects_container">
        {subjects.map((subject,i) => <p className={`homeTasks_subject ${!subject.isActive && 'inactive'}`}>{subject.name}{i === 2 && <div className="newTask"/>}</p>)}
      </div>
    </section>
    <div className="homeTaskTop__container">
      <h1 className="homeTaskTitle">Домашнє завдання</h1>
      <div className="homeTaskFilters__container">
        <div className="adminPanelStudentList_fillterContainer fillter_container">
            <Select 
            placeholder={<div className="fillterPlaceholder_container">
                <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
            </div>} 
            className="fillter_select"
            allowClear

            >
                <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
            </Select>
          </div>
          <div className="adminPanelStudentList_fillterContainer fillter_container">
              <Select 
              placeholder={<div className="fillterPlaceholder_container">
                  <p className="fillter_placeholder">Завдання</p><FilterIconSvg/>
              </div>} 
              className="fillter_select"
              allowClear

              >
                  <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                  <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                  <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                  <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
              </Select>
          </div>
          <div className="adminPanelStudentList_fillterContainer fillter_container">
              <Select 
              placeholder={<div className="fillterPlaceholder_container">
                  <p className="fillter_placeholder">Місяць</p><FilterIconSvg/>
              </div>} 
              className="fillter_select"
              allowClear

              >
                  <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                  <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                  <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                  <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
              </Select>
          </div>
          <div className="adminPanelStudentList_fillterContainer fillter_container">
              <Select 
              placeholder={<div className="fillterPlaceholder_container">
                  <p className="fillter_placeholder">Здача</p><FilterIconSvg/>
              </div>} 
              className="fillter_select"
              allowClear
              >
                  <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                  <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                  <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                  <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
              </Select>
          </div>
      </div>
    </div>
    <div className="homeTaskTasks__container">
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
    </div>
  </div>
}
