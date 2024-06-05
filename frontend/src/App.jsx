import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/verify/VerifyEmail.jsx";
import VerifyWarden from "./pages/verify/VerifyWarden.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginStudent from "./pages/auth/Student/LoginStudent.jsx";
import RegisterStudent from "./pages/auth/Student/RegisterStudent.jsx";
import RegisterWarden from "./pages/auth/Warden/RegisterWarden.jsx";
import LoginWarden from "./pages/auth/Warden/LoginWarden.jsx";
import RegisterAccountant from "./pages/auth/Accountant/RegisterAccountant.jsx";
import LoginAccountant from "./pages/auth/Accountant/LoginAccountant.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import MonthlyBills from "./pages/MonthlyBills.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import Profile from "./pages/ProfilePage.jsx";
import AllComplaints from "./pages/AllComplaints.jsx";
import MyComplaints from "./pages/MyComplaints.jsx";
import GenerateBill from './pages/GenerateBill.jsx' ;
import UpdateCostPerDay from './pages/UpdateCostPerDay.jsx';
import AddMenu from './pages/menu/AddMenu.jsx'
import LatestMenu from "./pages/menu/LatestMenu.jsx";
import LoginAdmin from "./pages/admin/Login.jsx"
import AdminLanding from "./pages/admin/Landing.jsx";
import Allcomplaints from "./pages/admin/Allcomplaints.jsx"
import NavigationButtons from "./pages/accountant/AccountantLanding.jsx";
import MarkLeave from "./pages/admin/Mark-leave.jsx";
import StudentBill from "./pages/accountant/SingleBill.jsx";
import Billcomp from "./pages/accountant/Allbills.jsx";
import ManageMr from "./pages/admin/ManageMr";

import RegisterAdmin from "./pages/admin/Register.jsx"
import LoginAdmin from "./pages/admin/Login.jsx"
import AdminLanding from "./pages/admin/Landing.jsx";
import Allcomplaints from "./pages/admin/Allcomplaints.jsx"
import NavigationButtons from "./pages/accountant/AccountantLanding.jsx";
import MarkLeave from "./pages/admin/Mark-leave.jsx";
import StudentBill from "./pages/accountant/SingleBill.jsx";
import Billcomp from "./pages/accountant/Allbills.jsx";
import ManageMr from "./pages/admin/ManageMr";
const App = () => {

  
  //const navigate = useNavigate();
 


  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/student/dashboard" element={<StudentPage />}>
            <Route path="my-complaints/:id" element={<MyComplaints />} />
            <Route path="all-complaints" element={<AllComplaints />} />
            <Route path="monthly-bills" element={<MonthlyBills />} />
            <Route path="mess-menu" element={<LatestMenu />} />
            <Route path="add-menu" element={<AddMenu/>}/>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-warden" element={<VerifyWarden />} />
          <Route path="/*" element={<NotFound />} />
<<<<<<< HEAD
          <Route path="/login" element={<LoginAdmin/>}/>
          <Route path="/admin-landing" element={<AdminLanding/>}/>
          <Route path="/allcomplaints" element={<Allcomplaints/>}/>
=======
{/* <Route path="/signup-admin" element={<RegisterAdmin />} /> */}
    <Route path="/login" element={<LoginAdmin/>}/>
    <Route path="/admin-landing" element={<AdminLanding/>}/>
    <Route path="/allcomplaints" element={<Allcomplaints/>}/>
>>>>>>> d06c04a85e27f4d60f0491134fc3eb445724f74b
          <Route path="/register-warden" element={<RegisterWarden />} />
          <Route path="/login-warden" element={<LoginWarden />} />
          <Route path="/register-accountant" element={<RegisterAccountant />} />
          <Route path="/login-accountant" element={<LoginAccountant />} />
<<<<<<< HEAD

          <Route path="/generate-bill" element={<GenerateBill/>}/>
          <Route path='/update-cost' element={<UpdateCostPerDay/>}/>
          <Route path="/accountant-landing" element={<NavigationButtons/>}/>
          <Route path="/mark-leave" element={<MarkLeave/>}/>
          <Route path="/singlebill" element={<StudentBill/>}/>
          <Route path="/allbills" element={<Billcomp/>}/>
          <Route path="/manage-mr" element={<ManageMr/>}/>
          </Routes>
=======
    <Route path="/accountant-landing" element={<NavigationButtons/>}/>
    <Route path="/mark-leave" element={<MarkLeave/>}/>
    <Route path="/singlebill" element={<StudentBill/>}/>
    <Route path="/allbills" element={<Billcomp/>}/>
    <Route path="/manage-mr" element={<ManageMr/>}/>
        </Routes>
>>>>>>> d06c04a85e27f4d60f0491134fc3eb445724f74b
      </div>
    </BrowserRouter>
  );
};

export default App;
