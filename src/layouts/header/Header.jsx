import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarMenu } from "@app/store/reducers/ui";
import NotificationsDropdown from "@app/layouts/header/notifications-dropdown/NotificationsDropdown";

import Themedropdown from "@app/layouts/header/Theme-dropdown";
import { toggleFullScreen } from "../../utils/helpers";
import SubMenuDropdown from "@app/layouts/header/submenu-dropdown/SubMenuDropdown";

import { useNavigate } from "react-router-dom";

import UserDropdown from "./user-dropdown/UserDropdown";
import ReactSelectHead from "../../components/formComponent/ReactSelectHead";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

import { logoutAction } from "../../store/reducers/AuthSlice/logoutSlice";
import { updateClaims } from "../../networkServices/HeaderApi";
import logoitdose from "../../assets/image/logoitdose.png";
import { getBindCategory } from "../../store/reducers/TokenManagementSlice/CommonExportFunction";
import axios from "axios";
import { notify } from "../../utils/utils";
import Input from "../../components/formComponent/Input";
import { headers } from "../../utils/apiCalls";
import { toast } from "react-toastify";
import { getCentres } from "../../utils/helperfunctions";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { CentreWiseCacheByCenterID } from "../../store/reducers/common/CommonExportFunction";
 

const Header = React.memo(() => {
  const [routeFlag, setRouteFlag] = useState(false);
  // get Data from localStorage
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {CentreWiseCache} = useSelector((state)=>state?.CommonSlice);
  const [Sample, setSample] = useState("");
  const navbarVariant = useSelector((state) => state.ui.navbarVariant);
  const headerBorder = useSelector((state) => state.ui.headerBorder);
  const screenSize = useSelector((state) => state.ui.screenSize);

  const signout = useSelector((state) => state.logoutSlice);
  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  /**
   * Logout function to handle user logout API Implement.
   */

  const logOut = () => {
    // dispatch(
    //   logoutAction({
    //     roleID: localData?.defaultRole,
    //     employeeID: localData?.employeeID,
    //     centreID: localData?.centreID,
    //   })
    // );
    setRouteFlag(true);
    localStorage.clear();
    navigate("/login");
    notify("Sucessfully logout", "success");
  };

  const handleUpdateClaims = async (roleID, centreID) => {
    const data = await updateClaims(roleID, centreID);
  };
  const convertToFormData = (obj) => {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(`Appending ${key}: ${obj[key]}`);
        formData.append(key, obj[key]);
      }
    }

    // Debug: Log FormData entries
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    return formData;
  };

  const handleChangeCentre = async (e) => {
    const { value } = e;
    console.log(value)
    window.location.reload()
    localStorage.setItem('defaultcentre',value)
  };

  /**
   * Make an API request for MasterPage/EmployeeWiseCentreList.
   *
   * @param {parametre} EmployeeID - The parametre for EmployeeID from localStorage
   * @param {API Implement Name} options - API for MasterPage/EmployeeWiseCentreList.
   */
  // useEffect(() => {
  //   if (localData?.employeeID) {
  //     dispatch(getEmployeeWise({ employeeID: localData?.employeeID }));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(
  //     getNotification({
  //       RoleID: localData?.defaultRole,
  //       EmployeeID: localData?.employeeID,
  //       CentreID: localData?.defaultCentre,
  //     })
  //   );
  // }, []);

  // role bind
 

  const handleDynamiclabsearch = (event) => {
    if (event.key !== "Enter") return; // Only proceed if the Enter key is pressed

    if (Sample.length > 0) {
      const form = new FormData();
      form.append("DynamicSearch", Sample);
      form.append("SessionPanelID", localStorage.getItem("PanelId") || "");
      form.append("SessionCentreID", localStorage.getItem("CentreId") || "");
      form.append(
        "SessionEmployeeID",
        localStorage.getItem("employeeId") || ""
      );

      axios
        .post(apiUrls?.DynamicSearch, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            navigate("/DynamicLabSearch", {
              state: {
                data: res.data.data,
                sample: Sample,
              },
            });
          } else if (res?.data?.status === false) {
            console.log(res?.data);
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  useEffect(() => {
    routeFlag && signout.success && navigate("/login");
  }, [signout.success]);
  useEffect(()=>{
    dispatch(CentreWiseCacheByCenterID({Id:localStorage.getItem('employeeId')}))
  },[dispatch])
 console.log(screenSize);
  return (
    <>
      <nav className={getContainerClasses()} style={{ position: "relative" }}>
        <ul className="navbar-nav">
          {["lg", "md"].includes(screenSize) ? (
            <div className="img-conatiner">
              <div style={{ width: "70%", margin: "auto" }}>
                <img src={logoitdose} className="img-fluid" />
              </div>
            </div>
          ) : (
            <li className="nav-item">
              <button
                onClick={handleToggleMenuSidebar}
                type="button"
                className="nav-link mobilerespBars"
              >
                <i className="fas fa-bars" />
              </button>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item savetheme" >
            <div type="button" className=" headerboxsize">
              <ReactSelectHead
                placeholderName="Select Centre"
                dynamicOptions={CentreWiseCache}
                searchable={true}
                value={Number(localStorage.getItem("defaultcentre"))}
                respclass="roll-off"
                handleChange={handleChangeCentre}
                plcN="center"
                isDisabled={true}
              />
            </div>
          </li>
<li className="nav-item">
  
    <Input
      type="text"
      className="form-control"
      id="searchInput"
      name="searchInput"
      value={Sample}
      lable="Sample Tracker"
      placeholder=""
      respclass=""
      onChange={(e) => setSample(e.target.value)}
      onKeyDown={handleDynamiclabsearch}
      style={{
        height: screenSize === 'lg' || screenSize === 'md' ? '35px' : '25px', // Adjust the height for larger screens
        margin: "2px",
        padding: screenSize === 'lg' || screenSize === 'md' ? '8px' : '5px', // Adjust padding for smaller screens
        fontSize: screenSize === 'lg' || screenSize === 'md' ? '14px' : '12px', // Adjust font size for readability
        width: "100%", // Make sure the input takes up the full width of its container
      }}
    />
 
</li>



          {/* {["lg", "md"].includes(screenSize) && (
            <li className="nav-item savetheme">
              <div type="button" className=" headerboxsize">
                <ReactSelectHead
                  placeholderName="Select Role"
                  dynamicOptions={GetRoleList?.map((ele) => {
                    return {
                      label: ele?.roleName,
                      value: ele?.roleID,
                    };
                  })}
                  searchable={true}
                  respclass="col-12 roll-off"
                  value={Number(localData?.defaultRole)}
                  handleChange={handleChangeRole}
                  //  respclass="roll-off"
                  plcN="center"
                />
              </div>
            </li>
          )} */}

          <li className="nav-item d-md-none">
            <div type="button">
              <SubMenuDropdown />
            </div>
          </li>
          <li className="nav-item position-relative d-none d-md-flex px-1">
            <Themedropdown />
          </li>
          {/* <li className="nav-item">
          <OverLay />
          </li> */}
          {/* <li className="nav-item">
            <button type="button" className="nav-link">
              <i className="fa fa-solid fa-star"></i>
            </button>
          </li> */}

          <li className="nav-item d-none d-md-flex px-2">
            <div onClick={toggleFullScreen}>
              <i className="fa fa-arrows-alt text-white" aria-hidden="true"></i>
            </div>
          </li>
          <li className="nav-item  d-md-flex">
            <button type="button" className="nav-link" onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </li>

          <li className="nav-item d-none d-md-flex">
            <button type="button" className="nav-link d-flex">
              <UserDropdown />
              <label className="control-label ml-1 d-none d-lg-block text-white">
                {localStorage.getItem("employeeName")}
              </label>
            </button>
          </li>
          {/* <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li> */}
        </ul>
      </nav>
      {/* <Header1 /> */}
    </>
  );
});

export default Header;
