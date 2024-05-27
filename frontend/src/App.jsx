import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/verify/VerifyEmail.jsx";
import VerifyWarden from "./pages/verify/VerifyWarden.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
// import Header from "./components/Header.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import Complaints from "./pages/Complaints.jsx";
import MonthlyBills from "./pages/MonthlyBills.jsx";
import NotFound from "./pages/NotFound.jsx";
// import Footer from "./components/Footer.jsx";

const App = () => {
  return(
    <div className="">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about-us" element={<AboutUsPage/>}/>
          <Route path="/login-student" element={<LoginPage/>}/>
          <Route path="/register-student" element={<RegisterPage/>}/>

            <Route path="complaints" element={<Complaints/>}/>
            <Route path="/monthly-bills" element={<MonthlyBills/>}/>
            <Route path="/verify-email" element={<VerifyEmail/>}/>
            <Route path="/verify-warden" element={<VerifyWarden/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>       
  )
}

export default App;