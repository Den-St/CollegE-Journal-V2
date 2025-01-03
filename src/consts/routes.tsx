import { Navigate, Route, Routes } from "react-router-dom";
import { EditProfile } from "../components/EditProfile";
import { Journal } from "../components/Journal";
import { StudentJournal } from "../components/Journal/StudentJournal";
import { SecurityLevelGuard } from "../components/SecurityLevelGuard";
import { TeacherSubjects } from "../components/PickJournalSubjects/TeacherSubjects";
import { StudentSubjects } from "../components/PickJournalSubjects/StudentSubjects";
import { HomePage, HomeTask, HomeTasks, SignIn, Registration, MissedClasses, MyProfile, Students, TeacherProfile, Rating, Groups, SendHomeTask, AdminPanel, StudyMaterials, EditGroup, CreateHomeTask, CreateStudyMaterials, FAQ, NoMatch, Schedule, StudyMaterialsCheckTeacher, TeacherJournal } from "../pages";
import { securityLevels } from "./securityLevels";
import { PickJournalSubjects } from "../components/PickJournalSubjects";
import { CreateTeacher } from "../components/CreateTeacher";
import { UserProfile } from "../components/UserProfile";
import { EditUser } from "../components/EditUser";
import { Teachers } from "../components/Teachers";
import { MyGroup } from "../components/MyGroup";
import { RecoveryPassword } from "../components/RecoveryPassword";
import { PrintForm } from "../components/Journal/PrintForm";
import { GoogleLogin } from "../components/GoogleLogin";
import { AbsenceTable } from "../components/Journal/AbsenceTable/AbsenceTable";
import { NotReadyPage } from "../assets/components/NotReadyPage";
import { MonthAttesationsTable } from "../components/Journal/MonthAttestations/MonthAttestationsTable";
import { SemesterAttesationsTable } from "../components/Journal/SemesterAttestations/SemesterAttestationsTable";
import { StudentSemesterAttesationsTable } from "../components/Journal/StudentSemesterAttestations/StudentSemesterAttestationsTable";
import { StudentMonthAttesationsTable } from "../components/Journal/StudentMonthAttestations/StudentMonthAttestationsTable";

export const navRoutes = {
}

export const routes = {
    signIn:"/sign-in",
    homePage:'/',
    profile:'/profile/:id',
    homeTasks:'/home-tasks',
    homeTask:'/home-task/:id',
    students:'/students',
    teacherProfile:'/teacher-profile/:id',
    schedule:'/schedule',
    missedClasses:'/missed-classes/:studentId',
    rating:'/rating',
    groups:'/groups',
    createHomeTask:'/create-home-task',
    sendHomeTask:'/send-home-task',
    createStudyMaterials:'/create-study-materials',
    adminPanel:'/admin-panel',
    studyMaterials:'/study-materials',
    studyMaterialsCheckTeacher:'/study-materials-check-teacher',
    scheduleCreate:'/schedule-create',
    faq:'/faq',
    createUser:'/create-user',
    editGroup:`/edit-group/:id`,
    pickJournalSubject:'/pick-journal-subject',
    myProfile:'/my-profile',
    editProfile:'/edit-profile',
    journal:'/journal',
    createTeacher:'/create-teacher',
    userProfile:'/user-profile/:id',
    editUser:'/edit-user/:id',
    teachers:'/teachers',
    myGroup:'/my-group',
    recovery:'/recovery-password',
    googleLogin:'/google/login',
    absenceTable:'/absence-table',
    monthAttestations:"/month-attestations",
    semesterAttestations:"/semester-attestations",
    semesterAttestationsStudent:"/semester-attestations-student",
    studentMonthAttestations:"/student-month-attestations",
} as const;

export const headerRoutes = {
    studentProfile:'/student-profile/:id',
    homeTasks:'/home-tasks',
    students:'/students',
    teacherProfile:'/teacher-profile/:id',
    schedule:'/schedule',
    missedClasses:'/missed-classes/:studentId',
    rating:'/rating',
    groups:'/groups',
    journal:'/journal',
    createHomeTask:'/create-home-task',
    sendHomeTask:'/send-home-task',
    createStudyMaterials:'/create-study-materials',
    adminPanel:'/admin-panel',
    studyMaterials:'/study-materials',
    studyMaterialsCheckTeacher:'/study-materials-check-teacher',
    scheduleCreate:'/schedule-create',
    faq:'/faq',
    signIn:''
} as const;

export const PublicRoutes = [
    <Route key={routes.signIn} element={<SignIn/>} path={routes.signIn}/>,   
    <Route key={routes.homePage} element={<HomePage/>} path={routes.homePage}/>,   
    <Route key={routes.myProfile} element={<SecurityLevelGuard blockedForAdmin isActiveRequired={false} securityLevel={securityLevels.student}><MyProfile/></SecurityLevelGuard>} path={routes.myProfile}/>,  
    <Route key={routes.userProfile} element={<SecurityLevelGuard securityLevel={securityLevels.student}><UserProfile/></SecurityLevelGuard>} path={routes.userProfile}/>,  
    // <Route key={routes.homeTasks} element={<HomeTasks/>} path={routes.homeTasks}/>,
    // <Route key={routes.homeTask} element={<HomeTask/>} path={routes.homeTask}/>,
    <Route key={routes.students} element={<NotReadyPage/>} path={routes.students}/>,
    <Route key={routes.teacherProfile} element={<TeacherProfile/>} path={routes.teacherProfile}/>,
    // <Route key={routes.schedule} element={<Schedule/>} path={routes.schedule}/>,
    // <Route key={routes.missedClasses} element={<MissedClasses/>} path={routes.missedClasses}/>,
    // <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
    <Route key={routes.groups} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.teacher}><Groups/></SecurityLevelGuard>} path={routes.groups}/>,    
    <Route key={routes.journal} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><Journal/></SecurityLevelGuard>} path={routes.journal}/>,
    <Route key={routes.createHomeTask} element={<NotReadyPage/>} path={routes.createHomeTask}/>,
    <Route key={routes.sendHomeTask} element={<NotReadyPage/>} path={routes.sendHomeTask}/>,
    <Route key={routes.createStudyMaterials} element={<NotReadyPage/>} path={routes.createStudyMaterials}/>,
    <Route key={routes.adminPanel} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><AdminPanel/></SecurityLevelGuard>} path={routes.adminPanel}/>,
    <Route key={routes.studyMaterials} element={<NotReadyPage/>} path={routes.studyMaterials}/>,
    <Route key={routes.studyMaterialsCheckTeacher} element={<NotReadyPage/>} path={routes.studyMaterialsCheckTeacher}/>,
    <Route key={routes.pickJournalSubject} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><PickJournalSubjects/></SecurityLevelGuard>} path={routes.pickJournalSubject}/>,
    // <Route key={routes.editProfile} element={<SecurityLevelGuard blockedForAdmin securityLevel={securityLevels.student}><EditProfile/></SecurityLevelGuard>} path={routes.editProfile}/>,
    <Route key={routes.teachers} element={<Teachers/>} path={routes.teachers}/>,
    <Route key={routes.myGroup} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><MyGroup/></SecurityLevelGuard>} path={routes.myGroup}/>,
    <Route key={routes.faq} element={<FAQ/>} path={routes.faq}/>,
    <Route key={routes.editGroup} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><EditGroup/></SecurityLevelGuard>} path={routes.editGroup}/>,
    <Route key={routes.editUser} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><EditUser/></SecurityLevelGuard>} path={routes.editUser}/>,
    <Route key={routes.createTeacher} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><CreateTeacher/></SecurityLevelGuard>} path={routes.createTeacher}/>,
    <Route key={routes.recovery} element={<RecoveryPassword/>} path={routes.recovery}/>,
    <Route key={routes.googleLogin} element={<GoogleLogin/>} path={routes.googleLogin}/>,
    <Route key={routes.absenceTable} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.teacher}><AbsenceTable/></SecurityLevelGuard>} path={routes.absenceTable}/>,
    <Route key={routes.studyMaterials} element={<NotReadyPage/>} path={routes.studyMaterials}/>,
    <Route key={routes.homeTasks} element={<NotReadyPage/>} path={routes.homeTasks}/>,
    <Route key={routes.schedule} element={<NotReadyPage/>} path={routes.schedule}/>,
    <Route key={routes.monthAttestations} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.teacher}><MonthAttesationsTable/></SecurityLevelGuard>} path={routes.monthAttestations}/>,
    <Route key={routes.semesterAttestations} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.teacher}><SemesterAttesationsTable/></SecurityLevelGuard>} path={routes.semesterAttestations}/>,
    <Route key={routes.semesterAttestationsStudent} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><StudentSemesterAttesationsTable/></SecurityLevelGuard>} path={routes.semesterAttestationsStudent}/>,
    <Route key={routes.studentMonthAttestations} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><StudentMonthAttesationsTable/></SecurityLevelGuard>} path={routes.studentMonthAttestations}/>,
    <Route key={'*'} element={<NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>} path={'*'}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}