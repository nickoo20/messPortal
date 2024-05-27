import { Route, Routes } from "react-router-dom";

import VerifyEmail from "./pages/VerifyEmail";
import VerifyWarden from "./pages/VerifyWarden.jsx";

import RegisterAdmin from "./pages/admin/Register.jsx"
import LoginAdmin from "./pages/admin/Login.jsx"
import AdminLanding from "./pages/admin/Landing.jsx";
import Allcomplaints from "./pages/admin/Allcomplaints.jsx"

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
        </Routes>

    
    
    
      

    </>       
  )
}

export default App;