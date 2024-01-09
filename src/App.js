import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./component/layout/Layout";
import Profile from "./component/profile/Profile";
import Course from "./component/course/Course";
import Login from "./component/login/Login";
// import SignUp from "./component/signup/SignUp";
import GetOtp from "./component/getotp/GetOtp";
import { store } from "./store/Store";
import Notification from "./component/notification/Notification";
import RaiseFundRequest from "./component/raisefundrequest/RaiseFundRequest";

import Donated from "./component/donated/Donated";
import Donar from "./component/donar/Donar";
import OpenSourceData from "./component/openDonarData/OpenSourceData";
import Student from "./component/student/Student";
import StudentProfile from "./component/student/studentprofile/StudentProfile";
import CourseTab from "./component/adminCourse/CourseTab";
import InvoiceTab from "./component/invoice/InvoiceTab";
import DonarProfile from "./component/donar/donarProfile/DonarProfile";
import UpdateCourse from "./component/adminCourse/updateAdminCourse/UpdateCourse";
import UpdateLesson from "./component/adminCourse/updateLesson/UpdateLesson";
import AccountTab from "./component/accountRequest/AccountTab";
import ProfileTab from "./component/profileRequest/ProfileTab";
import QualificationTab from "./component/qualificationRequest/QualifucationTab";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Layout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course" element={<Course />} />
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<Student />} />
          <Route path="/donated" element={<Donated />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/getotp" element={<GetOtp />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/raise-fund-request" element={<RaiseFundRequest />} />
          <Route path="/account-request" element={<AccountTab />} />
          <Route path="/profile-request" element={<ProfileTab />} />
          <Route path="/qualification-request" element={<QualificationTab />} />
          <Route path="/open-donar-data" element={<OpenSourceData />} />
          <Route path="/course-offered" element={<CourseTab />} />
          <Route path="/invoice" element={<InvoiceTab />} />
          <Route path="/student/profile/:UID" element={<StudentProfile />} />
          <Route path="/raise-fund-request/:UID" element={<StudentProfile />} />
          <Route path="/donar/profile/:ID" element={<DonarProfile />} />
          <Route path="course-offered/:id" element={<UpdateCourse />} />
          <Route path="course-offered/lesson/:id" element={<UpdateLesson />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
