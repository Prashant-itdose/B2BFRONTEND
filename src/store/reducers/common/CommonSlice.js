import {  createSlice } from "@reduxjs/toolkit";
import { isArrayFunction, notify, renameKeys } from "../../../utils/utils";
import {
  CentreWiseCacheByCenterID
} from "./CommonExportFunction";

const initialState = {
  CentreWiseCache: [],
  
  GetMenuList:[
    {
        "menuName": "Accession",
        "menuOrder": "1",
        "menuID": "84",
        "menuIcon": "fas fa-regular fa-users",
        "role":["b2b"],
        "children": [
            {
                "childrenName": "WorkOrder",
                "url": "/DirectPatientReg",
                "childrenOrder": "1",
                "breadcrumb": "Accession / WorkOrder"
            },
            {
                "childrenName": "Edit Info of Accession",
                "url": "/RegistrationEdit",
                "childrenOrder": "2",
                "breadcrumb": "Accession / Edit Info of Accession"
            }
        ]
    },
    {
        "menuName": "ChangePassword",
        "menuOrder": "2",
        "menuID": "4",
        "menuIcon": "fas fa-regular fa-key",
        "role":['b2b'],
        "children": [
            {
                "childrenName": "ChangePassword",
                "url": "/ChangePassword",
                "childrenOrder": "1",
                "breadcrumb": "ChangePassword / ChangePassword"
            }
        ]
    },
    {
        "menuName": "Dispatch",
        "menuOrder": "3",
        "menuID": "94",
        "menuIcon": "fas fa-regular fa-truck",
        "role":["b2b"],
          "children": [
            {
                "childrenName": "PatientLabSearch",
                "url": "/PatientLabSearch",
                "childrenOrder": "1",
                "breadcrumb": "Dispatch / PatientLabSearch"
            }
        ]
    },
    {
        "menuName": "Invoice",
        "menuOrder": "4",
        "menuID": "13",
        "menuIcon": "fas fa-regular fa-file-invoice",
        "role":["b2b"],

        "children": [
            {
             "childrenName": "Ledger Information",
                "url": "/LedgerInformation",
                "childrenOrder": "1",
                "breadcrumb": "Invoice / Ledger Information"
            },
           {
                "childrenName": "Invoice Reprint",
                "url": "/InvoiceReprint",
                "childrenOrder": "2",
                "breadcrumb": "Invoice / Invoice Reprint"
            },
            {
                "childrenName": "Online Pay",
                "url": "/OnlinePayment",
                "childrenOrder": "3",
                "breadcrumb": "Invoice / Online Pay"
            }
        ],
    },
    {
        "menuName": "Reports",
        "menuOrder": "5",
        "menuID": "17",
        "menuIcon": "fas fa-regular fa-receipt",
        "role":["b2b"],
        "children": [
            {
              "childrenName": "Client Deposit Report",
              "url": "/collection-report",
              "childrenOrder": "1",
              "breadcrumb": " /Reports/Client Deposit Report"
          },
          {
            "childrenName": "Client Business Report",
            "url": "/Clientbusinessreport",
            "childrenOrder": "2",
            "breadcrumb": " /Reports/Client Business Report"
        },
          {
            "childrenName": "Download Rate List",
            "url": "/DownloadRateList",
            "childrenOrder": "2",
            "breadcrumb": " /Reports/Download Rate List"
        }
          
        ]
    },
    {
        "menuName": "Reprint",
        "menuOrder": "6",
        "menuID": "9",
        "menuIcon": "fas fa-regular fa-receipt",
        "role":['b2b'],
        "children": [
          {
              "childrenName": "Receipt SRS/Reprint",
              "url": "/ReceiptReprint",
              "childrenOrder": "1",
              "breadcrumb": " /Reprint/Receipt SRS/Reprint"
          },
          {
              "childrenName": "Receipt SRS/Settelment",
              "url": "/ReceiptSRSSettelment",
              "childrenOrder": "2",
              "breadcrumb": " /Reprint/Receipt SRS/Settelment"
          }
        ]
    },
    {
      "menuName": "HomeCollection",
      "menuOrder": "7",
      "menuID": "10",
      "menuIcon": "fas fa-regular fa-receipt",
      "role":["hc"],
     
        "children": [
          {
            "childrenName": "LocationMaster",
            "url": "/LocationMaster",
            "childrenOrder": "1",
            "breadcrumb": "/CustomerCare/LocationMaster"
        },
        
        
          {
            "childrenName": "PhlebotomistRegistration",
            "url": "/PhleboRegistration",
            "childrenOrder": "1",
            "breadcrumb": "/CustomerCare/PhlebotomistRegistration"
          },
          {
            "childrenName": "PhlebotomistMapping",
            "url": "/PhlebotomistMapping",
            "childrenOrder": "2",
            "breadcrumb": "/CustomerCare/PhlebotomistMapping"
          },
          {
            "childrenName": "CallCentre",
            "url": "/CallCentre",
            "childrenOrder": "3",
            "breadcrumb": "/CustomerCare/CallCentre"
          },
          {
            "childrenName": "CollectionSearch",
            "url": "/CollectionSearch",
            "childrenOrder": "4",
            "breadcrumb": "/CustomerCare/CollectionSearch"
          },
          {
            "childrenName": "PatientEdit",
            "url": "/PatientEdit",
            "childrenOrder": "5",
            "breadcrumb": "/CustomerCare/PatientEdit"
          },
          {
            "childrenName": "Change Booking Details",
            "url": "/ChangeBookingDetails",
            "childrenOrder": "5",
            "breadcrumb": "/CustomerCare/Change Booking Details"
          },
          {
            "childrenName": "ChangePhlebo",
            "url": "/ChangePhlebo",
            "childrenOrder": "6",
            "breadcrumb": "/CustomerCare/ChangePhlebo"
          },
          {
            "childrenName": "ChangeDropLocation",
            "url": "/ChangeDropLocation",
            "childrenOrder": "7",
            "breadcrumb": "/CustomerCare/ChangeDropLocation"
          },
          {
            "childrenName": "PhlebotomistHoliday",
            "url": "/PhlebotomistHoliday",
            "childrenOrder": "8",
            "breadcrumb": "/CustomerCare/PhlebotomistHoliday"
          },
          {
            "childrenName": "PhleboCallTransfer",
            "url": "/PhleboCallTransfer",
            "childrenOrder": "9",
            "breadcrumb": "/CustomerCare/PhleboCallTransfer"
          }
        ]
      
      
  },{
    "menuName": "DocApproval",
    "menuOrder": "1",
    "menuID": "1",
    "menuIcon": "fas fa-regular fa-receipt",
    "role":['doc'],
    "children": [
      {
          "childrenName": "DocApproval/Search",
          "url": "/DocApproval",
          "childrenOrder": "1",
          "breadcrumb": "DocApproval/Search"
      }
    ]
} ,
{
  "menuName": "PathScan",
  "menuOrder": "1",
  "menuID": "1",
  "menuIcon": "fas fa-regular fa-receipt",
  "role":['pathscan'],
  "children": [
    {
        "childrenName": "PatientSearch",
        "url": "/PatientSearch",
        "childrenOrder": "1",
        "breadcrumb": "PatientSearch"
    }
  ]
} 
    
],
  
  loading: false,
  error: "",
  message: "",
  success: false,
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CentreWiseCacheByCenterID.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
        state.CentreWiseCache = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
      })

     

  },
});

export default CommonSlice.reducer;
