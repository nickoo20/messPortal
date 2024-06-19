import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyEmailStudent from "./pages/verify/VerifyEmailStudent.jsx";
import VerifyWardenStudent from "./pages/verify/VerifyWardenStudent.jsx";
import VerifyEmailWarden from './pages/verify/VerifyEmailWarden.jsx' ;
import VerifyWardenDsw from './pages/verify/VerifyWardenDsw.jsx' ;
import VerifyUser from "./pages/verify/VerifyUser.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginStudent from "./pages/auth/Student/LoginStudent.jsx" ;
import RegisterStudent from "./pages/auth/Student/RegisterStudent.jsx" ;
import LoginAdmin from "./pages/auth/Admin/LoginAdmin.jsx" ;
import RegisterAdmin from './pages/auth/Admin/RegisterAdmin.jsx' ; 
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
import UpdtateBill from "./pages/UpdateBill.jsx";
import ExpenseManager from "./pages/accountant/Expenses.jsx";
import FestCharge from "./pages/accountant/Festival.jsx"
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

          <Route path="/verify-email" element={<VerifyEmailStudent />} />
          <Route path="/verify-warden" element={<VerifyWardenStudent />} />
          <Route path="/admin/verify-email" element={<VerifyEmailWarden/>} />
          <Route path="/admin/verify-dsw" element={<VerifyWardenDsw />} />
          <Route path="/verify-admin" element={<VerifyUser />} />

          <Route path="/*" element={<NotFound />} />

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
          
    <Route path="/accountant-landing" element={<NavigationButtons/>}/>
    <Route path="/mark-leave" element={<MarkLeave/>}/>
    <Route path="/singlebill" element={<StudentBill/>}/>
    <Route path="/allbills" element={<Billcomp/>}/>
    <Route path="/manage-mr" element={<ManageMr/>}/>
    <Route path="/updateBill" element={<UpdtateBill/>}/>
    <Route path="/expense" element={<ExpenseManager/>}/>
    <Route path="/fest-charge" element={<FestCharge/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
