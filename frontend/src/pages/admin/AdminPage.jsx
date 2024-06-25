import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SidebarAdmin from '../../pages/admin/SidebarAdmin' ; 

const AdminPage = () => {
  return(
    <div className="w-full flex flex-col bg-gradient-to-r from-gray-100 to-gray-700 min-h-screen">
      <Header />
      <div className="flex ">
          <SidebarAdmin />
          {/* <MainContent/> */}
        <div className="flex-1 p-4 bg-gray-50 shadow-lg rounded-lg m-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage;