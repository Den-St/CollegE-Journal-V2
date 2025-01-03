import './createStudyMaterials.scss';
import {Select} from 'antd';
import ReactQuill from 'react-quill';
import { useThemeStore } from '../../store/themeStore';
import { PaperClip } from '../../assets/svgs/paperClip';
const {Option} = Select;

export const CreateStudyMaterials = () => {
    const theme = useThemeStore().theme;

    return <div className={`createStudyMaterialsMain__container ${theme}`}>
        <h1 className='createStudyMaterialsTitle'>Освітні Матеріали</h1>
        <div className='createStudyMaterialsInputs__container'>
            <div className='createStudyMaterialsInput__container'>
                <h2 className='createStudyMaterialsInput__title'>Заголовок</h2>
                <input autoComplete="off"  className="createStudyMaterialsHeader__input" placeholder='Введіть заголовок завдання'/>
            </div>
            <div className='createStudyMaterialsSelects__container'>
                <div className='createStudyMaterialsSelect__container'>
                    <h2 className='createStudyMaterialsInput__title'>Фільтри</h2>
                    {/* <input autoComplete="off"  className="createStudyMaterialsFilters__input" placeholder='Введіть теги, за допомогою “Enter”'/> */}
                    <div className='select_wrapper'>
                        <Select
                        placeholder={'Оберіть хеш-теги'}
                        mode="multiple"
                        optionLabelProp="label"
                        //onSearch={search}
                        >
                            {/* {hashTags && hashTags.map(hashTag => 
                            <Option value={hashTag.name} label={hashTag.name}>
                            </Option>
                            )} */}
                            <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                            <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                            <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                            <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                        </Select>
                    </div>
                </div>
                <div className='createStudyMaterialsSelect__container'>
                    <h2 className='createStudyMaterialsInput__title'>Налаштування доступу</h2>
                    <div className='select_wrapper'>
                        <Select
                        placeholder={'Оберіть рівень доступу'}
                        mode="multiple"
                        optionLabelProp="label"
                        //onSearch={search}
                        >
                            {/* {hashTags && hashTags.map(hashTag => 
                            <Option value={hashTag.name} label={hashTag.name}>
                            </Option>
                            )} */}
                            <Option value={'access type'} label={'access type'}>'access type'</Option>
                            <Option value={'access type1'} label={'access type1'}>'access type1'</Option>
                            <Option value={'access type2'} label={'access type2'}>'access type2'</Option>
                            <Option value={'access type3'} label={'access type3'}>'access type3'</Option>
                            <Option value={'access type4'} label={'access type4'}>'access type4'</Option>
                        </Select>
                    </div>
                </div>
            </div>

            <div className='createStudyMaterialsInput__container'>
                <h2 className='createStudyMaterialsInput__title'>Опис</h2>
                <ReactQuill placeholder='Введіть опис завдання'/>
            </div>
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
    </div>
}