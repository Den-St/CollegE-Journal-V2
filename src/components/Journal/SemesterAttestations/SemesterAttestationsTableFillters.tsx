import { Select, Spin } from "antd";
import { LinkBack } from "../../../assets/components/LinkBack/LinkBack";
import { FilterIconSvg } from "../../../assets/svgs/filterIconSvg";
import { LeftArrowSvg } from "../../../assets/svgs/leftArrowSvg";
import { RightArrowSvg } from "../../../assets/svgs/rightArrowSvg";
import { routes } from "../../../consts/routes";
import { securityLevels } from "../../../consts/securityLevels";
import { useAbsenceTableDownload } from "../../../hooks/absenceTableDownload";
import { useAbsenceTablePrintForm } from "../../../hooks/absenceTablePrintform";
import { useUserStore } from "../../../store/userStore";
import { AbsenceTableFilltersT, AbsenceTableT } from "../../../types/absenceTable";
import { JournalGroupT } from "../../../types/journalGroup";
import { MonthAttestationsTableT } from "../../../types/mothAttestationTable";
import { Loader } from "../../Loader/Loader";
import { SemesterAttestationsTablePrintForm } from "./SemesterAttestationsTablePrintForm";
const {Option} = Select;

type Props = {
    fillters:AbsenceTableFilltersT,
    loading:boolean,
    onChangeFillters:(fieldName:'group_id' | 'offset',value:number | string) => void,
    groups:JournalGroupT[],
    table?:MonthAttestationsTableT,
    start:number,
    end:number
}

export const SemesterAttestationsTableFillters:React.FC<Props> = ({groups,loading,fillters,onChangeFillters,table,start,end}) => {
    const group = groups.find(group => group.journal_group === fillters.group_id);
    const {handlePrint,componentRef} = useAbsenceTablePrintForm()
    const {downloadLoading,fetchFile} = useAbsenceTableDownload(start,end,group?.journal_group_full_name,group?.journal_group);
    const isAdmin = useUserStore().user.security_level === securityLevels.admin;
    const onDecrementOffset = () => {
        onChangeFillters('offset',fillters.offset - 1);
    }
    const onIncrementOffset = () => {
        onChangeFillters('offset',fillters.offset + 1);
    }  
    const onJumpToEnd = () => {
        onChangeFillters('offset',0);
    }

    return <>
        <section className='journalTop__container'>
            {/* {!!group?.journal_group_full_name && !!table && <MonthAttestationsTablePrintForm  ref={componentRef} table={table} />} */}
            <LinkBack title={"Список групи"} route={routes.pickJournalSubject + `?group_id=${fillters.group_id}`}/>
            <h1 className='journal__title'>Список відсутніх <p className='journalGroup_groupName'>{groups.find(group => group.journal_group === fillters.group_id)?.journal_group_full_name}</p></h1>
            <div className='journalFillters__container'>
                <div style={{'display':'flex','gap':'60px','flexWrap':'wrap'}}>
                    <div className="absenceTable_weekFillter">
                        <button className="absenceTable_fillterArrowButton" onClick={onDecrementOffset}><LeftArrowSvg/></button>
                        <p className="absenceTable_datesFillter">{new Date(start*1000).toLocaleDateString()+'-'+new Date(end*1000).toLocaleDateString()}</p>
                        <button className={`absenceTable_fillterArrowButton ${fillters.offset === 0 ? 'disabled' : ''}`}  disabled={fillters.offset === 0} onClick={onIncrementOffset}><RightArrowSvg/></button>
                        {/* <button  disabled={fillters.offset === 0} onClick={onJumpToEnd}><FastForwardFilled/></button> */}
                    </div>
                {isAdmin && <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
                        style={{height:'300px !important',overflow:'hidden'}}
                        >
                    {loading || !groups.length
                    ? <div style={{width:'100px',height:'50px'}}><Loader/></div>
                    : <Select 
                        placeholder={
                            <div className="fillterPlaceholder_container">
                                <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                            </div>
                        }
                        className="fillter_select"
                        style={{width:'300px !important'}}
                        // allowClear
                        loading={loading}
                        value={groups.find(group => group.journal_group === fillters.group_id)?.journal_group || ''}
                        onChange={(value) => onChangeFillters('group_id',value)}
                    >
                        {!!fillters.group_id && 
                        groups
                        .map(group =>
                            <Option key={group.journal_group} value={group.journal_group} label={group.journal_group_full_name}>{group.journal_group_full_name}</Option>
                        )}
                    </Select>}
                </div>}
                </div>
                <div style={{'display':'flex','gap':'30px'}}>
                    {!loading && !!table && <button disabled={downloadLoading} className='primary_button' onClick={fetchFile}>{!downloadLoading ? `Завантажити` : <Spin/>}</button>}
                    {!loading && !!table && <button className='primary_button'  style={{width:'177px'}} onClick={handlePrint}>Друк</button>}
                </div>
            </div>
        </section>
    </>
}