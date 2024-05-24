import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyWarden from "./pages/VerifyWarden.jsx";

const App = () => {
  return(
    <>
        <Routes>
            <Route path="/verify-email" element={<VerifyEmail/>}/>
            <Route path="/verify-warden" element={<VerifyWarden/>}/>
        </Routes>
    </>       
  )
}

export default App;