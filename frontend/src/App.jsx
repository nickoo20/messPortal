import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/verify/VerifyEmail.jsx";
import VerifyWarden from "./pages/verify/VerifyWarden.jsx";
import VerifyUser from "./pages/verify/VerifyUser.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginStudent from "./pages/auth/Student/LoginStudent.jsx";
import RegisterStudent from "./pages/auth/Student/RegisterStudent.jsx";
import RegisterAdmin from "./pages/auth/Admin/RegisterAdmin.jsx";
import LoginAdmin from "./pages/auth/Admin/LoginAdmin.jsx";
import RegisterAccountant from "./pages/auth/Accountant/RegisterAccountant.jsx";
import LoginAccountant from "./pages/auth/Accountant/LoginAccountant.jsx";

import AboutUsPage from "./pages/AboutUsPage.jsx";
import MonthlyBills from "./pages/MonthlyBills.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import Profile from "./pages/ProfilePage.jsx";
import AllComplaints from "./pages/AllComplaints.jsx";
import MyComplaints from "./pages/MyComplaints.jsx";
import GenerateBill from "./pages/GenerateBill.jsx";
import UpdateCostPerDay from "./pages/UpdateCostPerDay.jsx";
import AddMenu from "./pages/menu/AddMenu.jsx";
import LatestMenu from "./pages/menu/LatestMenu.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Allcomplaints from "./pages/admin/Allcomplaints.jsx";
import NavigationButtons from "./pages/accountant/AccountantLanding.jsx";
import MarkLeave from "./pages/admin/Mark-leave.jsx";
import StudentBill from "./pages/accountant/SingleBill.jsx";
import Billcomp from "./pages/accountant/Allbills.jsx";
import ManageMr from "./pages/admin/ManageMr";

const App = () => {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route exact path="/student/dashboard" element={<StudentPage />}>
            <Route path="all-complaints" element={<AllComplaints />}/>
            <Route path="my-complaints/:id" element={<MyComplaints />} />
            <Route path="monthly-bills" element={<MonthlyBills />} />
              <Route path="mess-menu" element={<LatestMenu />} />
              <Route path="add-menu" element={<AddMenu />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-warden" element={<VerifyWarden />} />
          <Route path="/verify-admin" element={<VerifyUser />} />

          <Route path="/*" element={<NotFound />} />

          {/* <Route path="/login" element={<LoginAdmin />} /> */}
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/admin-landing" element={<AdminPage />}>
            <Route path="allcomplaints" element={<Allcomplaints />} />
            <Route path="mark-leave" element={<MarkLeave />} />
            <Route path="manage-mr" element={<ManageMr />} />
            <Route path="mess-menu" element={<LatestMenu />} />
          </Route>

          <Route path="/register-accountant" element={<RegisterAccountant />} />
          <Route path="/login-accountant" element={<LoginAccountant />} />
          <Route path="/generate-bill" element={<GenerateBill />} />
          <Route path="/update-cost" element={<UpdateCostPerDay />} />
          <Route path="/accountant-landing" element={<NavigationButtons />} />
          <Route path="/singlebill" element={<StudentBill />} />
          <Route path="/allbills" element={<Billcomp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
