import React, { useState } from "react";
import SubmenuComponent from "./SubmenuComponent";
import Themedropdown from "@app/layouts/header/Theme-dropdown";
import { toggleFullScreen } from "../../../utils/helpers";
import LanguagesDropdown from "@app/layouts/header/languages-dropdown/LanguagesDropdown";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/utils";
import UserDropdown from "../user-dropdown/UserDropdown";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { SplitButton } from 'primereact/splitbutton';
const SubMenuDropdown = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const localData = useLocalStorage("userData", "get"); // get Data from localStorage
  const navigate = useNavigate();
  const toggleSidebar = () => {
    console.log("sadas")
    setIsSidebarOpen((prev) => !isSidebarOpen);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    notify("Sucessfully logout", "success");
  };


  // const toast = useRef(null);
  const items = [
      {
          label: 'Notifications',
          icon: 'pi pi-bell',
          // command: () => {
          //     toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
          // }
      },
      {
          label: 'Full screen',
          icon: 'pi pi-arrows-alt',
      },
      {
          label: 'Logout',
          icon: 'pi pi-sign-out',
      },
      // {
      //     label: 'React Website',
      //     icon: 'pi pi-external-link',
      //     command: () => {
      //         window.location.href = 'https://reactjs.org/';
      //     }
      // },
      // {
      //     label: 'Upload',
      //     icon: 'pi pi-upload',
      //     command: () => {
      //         //router.push('/fileupload');
      //     }
      // }
  ];


  return (
    <div>
    
     <div className="mobileResp">
     {/* <span
        className="pi pi-cog"
        onClick={toggleSidebar}
        style={{color:"#fff" , fontSize:"2.5rem", position:"relative", zIndex:"10"}}
      ></span> */}
     
      <span className="pi pi-arrows-alt"  style={{color:"#fff" , fontSize:"2.5rem" }}></span>
      

            <div type="button">
              <Themedropdown />
            </div>
           
      
            
              {/* <span className="pi pi-user"  style={{color:"#fff" , fontSize:"2.5rem" }}></span> */}
              {/* <span className="pi pi-bell"  style={{color:"#fff" , fontSize:"2.5rem" }}></span> */}
              {/* <label className="control-label text-white ml-4" onClick={logOut}>Logout</label> */}

             
           
          
     </div>

      <SubmenuComponent isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <ul className="navbar-nav d-block sidebarmobile">
        
          <li className="nav-item">
            <button type="button" className="nav-link ">
              <i className="fa fa-solid fa-star  text-white"></i>
              <label className="control-label text-white ml-4" onClick={logOut}>Logout</label>
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link">
              <i className="fa fa-home text-white" aria-hidden="true"></i>
              <label className="control-label text-white ml-4">Home</label>
            </button>
          </li>
          

       
          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              onClick={toggleFullScreen}
            >
              <i className="fa fa-arrows-alt text-white" aria-hidden="true"></i>{" "}
              <label className="control-label text-white ml-4">
                FullScreen
              </label>
            </button>
          </li>
          {/* <li className="nav-item">
            <button type="button" className="nav-link" onClick={logOut}>
              <i className="fas fa-sign-out-alt text-white"></i>
              <label className="control-label text-white ml-4">Logout</label>
            </button>
          </li> */}
          {/* <li className="nav-item">
            <button
              type="button"
              className="nav-link d-flex justify-content-space-between p-0"
            >
              <LanguagesDropdown />
              <label className="control-label text-white">Languages</label>
            </button>
          </li> */}
        
          {/* <li className="nav-item theme_dropdown">
            <Themedropdown />
            <label className="control-label text-white">Languages</label>
          </li> */}
        </ul>
      </SubmenuComponent>
    </div>
  );
};

export default SubMenuDropdown;
