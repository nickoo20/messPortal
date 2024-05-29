import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/verify/VerifyEmail.jsx";
import VerifyWarden from "./pages/verify/VerifyWarden.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginStudent from "./pages/auth/Student/LoginStudent.jsx";
import RegisterStudent from "./pages/auth/Student/RegisterStudent.jsx";
import RegisterWarden from "./pages/auth/Warden/RegisterWarden.jsx";
import LoginWarden from "./pages/auth/Warden/LoginWarden.jsx";
import RegisterAccountant from './pages/auth/Accountant/RegisterAccountant.jsx' ;
import LoginAccountant from './pages/auth/Accountant/LoginAccountant.jsx' ;
// import Header from "./components/Header.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import MonthlyBills from "./pages/MonthlyBills.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import Profile from "./pages/ProfilePage.jsx";
import AllComplaints from "./pages/AllComplaints.jsx";
import MyComplaints from "./pages/MyComplaints.jsx";
import MessMenu from "./pages/MessMenu.jsx";
// import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/register-student" element={<RegisterStudent/>} />
        <Route path="/student/dashboard" element={<StudentPage />}>
          <Route path="my-complaints/:id" element={<MyComplaints />} />
          <Route path="all-complaints" element={<AllComplaints />} />
          <Route path="monthly-bills" element={<MonthlyBills />} />
          <Route path="mess-menu" element={<MessMenu />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-warden" element={<VerifyWarden />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/register-warden" element={<RegisterWarden/>}/>
        <Route path="/login-warden" element={<LoginWarden/>}/>
        <Route path="/register-accountant" element={<RegisterAccountant/>}/>
        <Route path="/login-accountant" element={<LoginAccountant/>}/>
      </Routes>
    </div>
  );
};

export default App;
