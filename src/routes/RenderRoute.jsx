import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "@app/components/loader/Loading";
import ErrorBoundary from "../layouts/error-Boundary";
import Layout from "@app/layouts";
import Authenticated from "@app/Guard/Authenticated.jsx";
import Guest from "@app/Guard/Guest.jsx";
import { useDispatch, useSelector } from "react-redux";



function RenderRoute() {
  const { GetMenuList } = useSelector((state) => state?.CommonSlice);
  const location = useLocation();
  const dispatch = useDispatch();
  const [waitForRoute, setWaitForRoute] = useState(true);

  // Retrieve the role from localStorage
  const userRole = localStorage.getItem("userRole");

  // Collect all valid URLs from the menu list
  const getAllUrls = [];
  GetMenuList?.forEach((menu) => {
    menu?.children.forEach((child) => {
      getAllUrls.push(child.url.toLowerCase());
    });
  });

  // Filter routes based on role
  const bindroutes = allRoutes["roleRoutes"].reduce((acc, current) => {
    // Check if the route path exists in menu URLs and if the route allows the current user role
    if (
      getAllUrls.includes(current?.path.toLowerCase()) &&
      current?.allowedRoles?.includes(userRole)
    ) {
      acc.push(current);
    }
    return acc;
  }, []);

  
  const firstRoleUrl = userRole == "b2b" 
    ? "/dashboard" 
    : bindroutes.length > 0 
      ? bindroutes[0]?.path 
      : "/login";

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {[...allRoutes["commonRoutes"], ...bindroutes]?.map(
            (route, index) => {
              const Component = route?.component;
              const Layout = route?.layout || Fragment;
              const Guard = route?.Guard || Fragment;
              return (
                <Route
                  path={route?.path}
                  exact={route?.exact}
                  key={index}
                  element={
                    <Guard>
                      <Layout>
                        <Component />
                      </Layout>
                    </Guard>
                  }
                />
              );
            }
          )}

          {/* Catch-all route: Redirect to first valid route or dashboard if role is b2b */}
          <Route path="*" element={<Navigate to={firstRoleUrl} />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}




export default RenderRoute;

const allRoutes = {
  commonRoutes: [
    // {
    //   Guard: Authenticated,
    //   layout: Layout,
    //   path: "*",
    //   component: lazy(() => import("@app/pages/NotFound.jsx")),
    //   exact: true,
    // },
    
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/QuotationMaster",
      component: lazy(() => import("@app/pages/QuotationMaster.jsx")),
      exact: true,
    },
    {
      Guard: Guest,
      path: "/login",
      component: lazy(() => import("../modules/login/Login")),
      exact: true,
    },
    {
      path: "/ForgetPassword",
      component: lazy(() => import("@app/modules/login/ForgetPassword.jsx")),
      exact: true,
    },
   
    
    
],
  roleRoutes: [
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/dashboard",
      component: lazy(() => import("@app/pages/Dashboard.jsx")),
      exact: true,
      allowedRoles:["b2b"]
    },
    {
      layout: Layout,
        path: "/ChangePassword",
        allowedRoles:["b2b"],
        component: lazy(
          () => import("@app/pages/changePassword/ChangePassword.jsx")
        ),
        exact: true,
      },
      {Guard:Authenticated,
       layout:Layout,
        path:'/DynamicLabSearch',
        allowedRoles:["b2b"],
        component:lazy(
         ()=> import("@app/pages/frontOffice/DynamicLabSearch/DynamicLabSearch.jsx")
        )
       },
       { Guard:Authenticated,
        layout: Layout,
        path: "/PatientLabSearch",
        allowedRoles:["b2b"],
        component: lazy(
          () => import("@app/pages/frontOffice/PatientLabSearch/PatientLabSearch.jsx")
        ),
        exact: true,
      },
      { Guard:Authenticated,
        layout: Layout,
        path: "/LedgerReport",
        allowedRoles:["b2b"],
        component: lazy(
          () => import("@app/pages/frontOffice/Re_Print/LedgerReport.jsx")
        ),
        exact: true,
      },
      { Guard:Authenticated,
        layout: Layout,
        path: "/LedgerInformation",
        allowedRoles:["b2b"],
        component: lazy(
          () => import("@app/pages/frontOffice/Re_Print/LedgerTransaction.jsx")
        ),
        exact: true,
      },
      { Guard:Authenticated,
        layout: Layout,
        path: "/OnlinePayment",
        allowedRoles:["b2b"],
        component: lazy(
          () => import("@app/pages/OnlinePayment/OnlinePaymentPage.jsx")
        ),
        exact: true,
      },
      { Guard:Authenticated,
        layout: Layout,
        allowedRoles:["b2b"],
        path: "/Clientbusinessreport",
        component: lazy(
          () => import("@app/pages/frontOffice/Reports/ClientReports.jsx")
        ),
        exact: true,
      },
    {
      // Guard: Authenticated,
      layout: Layout,
      path: "/ChangePassword",
      allowedRoles:["b2b"],
      component: lazy(
        () => import("@app/pages/changePassword/ChangePassword.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/RegistrationEdit",
      allowedRoles:["b2b"],
      component: lazy(
        () => import("@app/pages/RegistrationEdit/RegistrationEdit.jsx")
      ),
      exact: true,
    },
    { Guard:Authenticated,
      layout: Layout,
      path: "/PatientLabSearch",
      allowedRoles:["b2b"],
      component: lazy(
        () => import("@app/pages/frontOffice/PatientLabSearch/PatientLabSearch.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/InvoiceReprint",
      allowedRoles:["b2b"],
      component: lazy(
        () => import("@app/pages/frontOffice/Re_Print/InvoiceReprint.jsx")
      ),
      exact: true,
    },
    {
      layout: Layout,
      path: "/ReceiptSRSSettelment",
      allowedRoles:["b2b"],
      component: lazy(
        () => import("@app/pages/frontOffice/Re_Print/ReceiptSRSSettelment.jsx")
      ),
      exact: true,
    },
    
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["b2b"],
      path: "/DirectPatientReg",
      component: lazy(
        () => import("@app/components/front-office/PersonalDetails.jsx")
      ),
      exact: true,
    },
   
{
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["b2b"],
      path: "/ReceiptReprint",
      component: lazy(
        () => import("@app/pages/frontOffice/Re_Print/ReceiptReprint.jsx")
      ),
      exact: true,
    },
    
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["b2b"],
      path: "/DownloadRateList",
      component: lazy(
        () => import("@app/pages/frontOffice/tools/DownloadRateList.jsx")
      ),
      exact: true,
    },

    // Reports Section Start
   
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["b2b"],
      path: "/collection-report",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/CollectionReport.jsx")
      ),
      exact: true,
    },
    
    
    ///HomecollectionSections 
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/LocationMaster",
      component: lazy(() => import("@app/pages/CustomerCare/LocationMaster.jsx")),
      exact: true,
    },
    
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/PhleboRegistration",
      component: lazy(() => import("@app/pages/CustomerCare/PhlebotomistRegistration.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/PhlebotomistMapping",
      component: lazy(() => import("@app/pages/CustomerCare/PhlebotomistMapping.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/CallCentre",
      component: lazy(() => import("@app/pages/CustomerCare/CallCentre.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/CollectionSearch",
      component: lazy(() => import("@app/pages/CustomerCare/CollectionSearch.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/PatientEdit",
      component: lazy(() => import("@app/pages/CustomerCare/PatientEdit.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/ChangeBookingDetails",
      component: lazy(() => import("@app/pages/CustomerCare/ChangeBookingDetails.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/ChangePhlebo",
      component: lazy(() => import("@app/pages/CustomerCare/ChangePhlebo.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["hc"],
      path: "/ChangeDropLocation",
      component: lazy(() => import("@app/pages/CustomerCare/ChangeDropLocation.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      allowedRoles:["hc"],
      layout: Layout,
      path: "/PhlebotomistHoliday",
      component: lazy(() => import("@app/pages/CustomerCare/PhlebotomistHoliday.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      allowedRoles:["hc"],
      layout: Layout,
      path: "/PhleboCallTransfer",
      component: lazy(() => import("@app/pages/CustomerCare/PhleboCallTransfer.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      allowedRoles:["doc"],
      layout: Layout,
      path: "/DocApproval",
      component: lazy(() => import("@app/pages/DocApproval/DocApproval.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      allowedRoles:["pathscan"],
      path: "/PatientSearch",
      component: lazy(() => import("@app/pages/pathscan/PatientSearch.jsx")),
      exact: true,
    }
  
  ],
};
