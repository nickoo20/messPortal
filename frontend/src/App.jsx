import { Route, Routes } from "react-router-dom";

import VerifyEmail from "./pages/VerifyEmail";
import VerifyWarden from "./pages/VerifyWarden.jsx";

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
  return(
    <>

        <Routes>
            <Route path="/verify-email" element={<VerifyEmail/>}/>
            <Route path="/verify-warden" element={<VerifyWarden/>}/>
            <Route path="/signup-admin" element={<RegisterAdmin />} />
    <Route path="/login" element={<LoginAdmin/>}/>
    <Route path="/admin-landing" element={<AdminLanding/>}/>
    <Route path="/allcomplaints" element={<Allcomplaints/>}/>
    <Route path="/accountant-landing" element={<NavigationButtons/>}/>
    <Route path="/mark-leave" element={<MarkLeave/>}/>
    <Route path="/singlebill" element={<StudentBill/>}/>
    <Route path="/allbills" element={<Billcomp/>}/>
    <Route path="/manage-mr" element={<ManageMr/>}/>
        </Routes>

    
    
    
      

    </>       
  )
}

export default App;