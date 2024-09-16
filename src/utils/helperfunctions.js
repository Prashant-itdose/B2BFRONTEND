import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "./apiCalls"
import { getglobalCentre } from "../networkServices/opdserviceAPI";
export const getCentres=async(setState)=>{
     console.log(headers)
    const formData = new FormData();
    formData.append('SessionEmployeeID',localStorage.getItem('employeeId'));
try{
   const centreresponse= await getglobalCentre(formData)
      console.log(centreresponse?.data?.data)
      const centres = centreresponse?.data.data.map((item) => {
        return { label: item?.Centre, value: item?.CentreID };
      });
      setState(centres)
      if (!localStorage.getItem('defaultcentre')) {
        localStorage.setItem('defaultcentre', centres[0]?.value);
      }
}catch(error){
        console.log(error)
    }
   
}

export const fetchPanels=(setState)=>{
    const formData = new FormData();
    formData.append('CentreID', localStorage.getItem('defaultcentre'));
    axios.post(apiUrls?.GetPanelsByCentreId, formData, {
        headers: headers,
      })
      .then((res) => {
        const centres=res?.data.data.map((item)=>{
          return {label:item?.Company_Name,value:item?.Panel_ID}
        })
        setState(centres)
      })
      .catch((err) => {
        console.log(err);
      });
}
export const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    return formData;
};

export const getmultiCentres=async(setState)=>{
   
    const formData = new FormData();
    formData.append('SessionEmployeeID',localStorage.getItem('employeeId'));

    try{
      const centreresponse= await getglobalCentre(formData)
         console.log(centreresponse?.data?.data)
         const centres = centreresponse?.data.data.map((item) => {
           return { name: item?.Centre, code: item?.CentreID };
         });
         setState(centres)
        
   }catch(error){
           console.log(error)
       }
    
}
export const fetchmultiPanels=(setState)=>{
    const formData = new FormData();
    formData.append('CentreID', localStorage.getItem('defaultcentre'));
    axios.post(apiUrls?.GetPanelsByCentreId, formData, {
        headers: headers,
      })
      .then((res) => {
        const centres=res?.data.data.map((item)=>{
          return {name:item?.Company_Name,code:item?.Panel_ID}
        })
        setState(centres)
      })
      .catch((err) => {
        console.log(err);
      });
}

export const fillFormWithData = (data,setFieldValue) => {
    const ageParts = data.Age ? data.Age.match(/(\d+)\s*Y\s*(\d+)\s*M\s*(\d+)\s*D/) : [];

    setFieldValue('LabNo', data.LedgertransactionNo || '');
    setFieldValue('Mobile', data.Mobile || '');
    setFieldValue('Title', data?.Title);
    setFieldValue('PName', data.PName || '');
    setFieldValue('Gender', data?.Gender);
    setFieldValue('DateOfBirth', data.DateOfBirth || '');
    setFieldValue('years', ageParts[1] || ''); 
    setFieldValue('months', ageParts[2] || ''); 
    setFieldValue('days', ageParts[3] || ''); 
    setFieldValue('DoctorName', data.DoctorName || '');
    setFieldValue('Doctor_ID',data.Doctor_ID)
    setFieldValue('Address', data.Address || '');
    setFieldValue('Email', data.Email || '');
    setFieldValue('PatientID', data?.Patient_ID);
};
export const emptyformData=(setFieldValue)=>{
    setFieldValue('LabNo','');
    setFieldValue('Mobile','');
    setFieldValue('Title', '');
    setFieldValue('PName', '');
    setFieldValue('Gender','');
    setFieldValue('DateOfBirth','');
    setFieldValue('years',''); 
    setFieldValue('months',''); 
    setFieldValue('days',''); 
    setFieldValue('DoctorName','');
    setFieldValue('Doctor_ID','')
    setFieldValue('Address','');
    setFieldValue('Email','');
    setFieldValue('PatientID','');
}

export const autocompleteOnBlur = (state) => {
    setTimeout(() => {
      state([]);
    }, 500);
  };
  export const fetchPanelswithid=(id,setState,setFieldValue)=>{
    const formData = new FormData();
    formData.append('CentreID',id);
    axios.post(apiUrls?.GetPanelsByCentreId, formData, {
        headers: headers,
      })
      .then((res) => {
        const centres=res?.data.data.map((item)=>{
          return {label:item?.Company_Name,value:item?.Panel_ID,code:item?.ReferenceCodeOPD,paymentmode:item?.Payment_Mode}
        })
        setState(centres)

        setFieldValue('PanelID',centres[0]?.value)
        setFieldValue('ReferenceCodeOpd',centres[0]?.code)
        setFieldValue('PaymentMode',centres[0]?.paymentmode)
      })
      .catch((err) => {
        console.log(err);
      });
}
export const fetchMultiPanelswithid=(id,setState,setFieldValue)=>{
  const formData = new FormData();
  formData.append('CentreID',id);
  axios.post(apiUrls?.GetPanelsByCentreId, formData, {
      headers: headers,
    })
    .then((res) => {
      const centres=res?.data.data.map((item)=>{
        return {name:item?.Company_Name,code:item?.Panel_ID}
      })
      setState(centres)
      })
    .catch((err) => {
      console.log(err);
    });
}
export function formatDateToYYYYMMDD(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getCentresworkorder=async(setState,setFieldValue)=>{
   
    const formData = new FormData();
    formData.append('SessionEmployeeID',localStorage.getItem('employeeId'));
    try{
      const centreresponse= await getglobalCentre(formData)
         console.log(centreresponse?.data?.data)
         const centres = centreresponse?.data.data.map((item) => {
           return { label: item?.Centre, value: item?.CentreID };
         });
         setState(centres)
         setFieldValue('CentreId',centres[0]?.value)
        
   }catch(error){
           console.log(error)
       }
}
export const getPaymentmode=(setState)=>{
  
  axios.post(apiUrls?.PaymentMode,{}, {
      headers: headers,
    })
    .then((res) => {
      console.log(res?.data?.data)
      const centres = res?.data.data.map((item) => {
        return {
          label: item?.PaymentMode,
          value: item?.PaymentModeID,
          IsBankShow: item?.IsBankShow,
          IsChequeNoShow: item?.IsChequeNoShow,
          IsChequeDateShow: item?.IsChequeDateShow,
          IsOnlineBankShow: item?.IsOnlineBankShow,
          BankName:'',
          ChequeDate:'',
          ChequeNo:''
        };
      });
      
      centres.push({
        label: 'Credit',
        value: -1,
        IsBankShow: false,
        IsChequeNoShow: false,
        IsChequeDateShow: false,
        IsOnlineBankShow: false
      });
      
      
      setState(centres)
    })
    .catch((err) => {
      console.log(err)
    }); 
}


export const getDisocuntBy=(setState)=>{
    
  const formData = new FormData();
    formData.append('ID',localStorage?.getItem('employeeId'));
    formData.append('SessionCentreID',localStorage?.getItem('centreid')?localStorage?.getItem('centreid'):1)
  axios.post(apiUrls?.DisocuntBY,formData, {
      headers: headers,
    })
    .then((res) => {
      console.log(res?.data?.data)
      const centres = res?.data.data.map((item) => {
return { label: item?.label, value: item?.value,};
      });
      
      setState(centres)
    })
    .catch((err) => {
      console.log(err)
    }); 
}
export const fetchBanks=(setState)=>{
    
  const formData = new FormData();
    formData.append('ID',localStorage?.getItem('employeeId'));
    formData.append('SessionCentreID',localStorage?.getItem('centreid')?localStorage?.getItem('centreid'):1)

  axios.post(apiUrls?.fetchBanks,formData, {
      headers: headers,
    })
    .then((res) => {
      
      const centres = res?.data.data.map((item) => {
return { label: item?.BankName, value: item?.BankName};
      });
      
      setState(centres)
    })
    .catch((err) => {
      console.log(err)
    }); 
}

export const fetchDepartments=async(setState)=>{
  const formData = new FormData();
    formData.append('SessionEmployeeID',localStorage.getItem('employeeId'));
try{ 
   const centreresponse= await getglobalCentre(formData)
      console.log(centreresponse?.data?.data)
      const centres = centreresponse?.data.data.map((item) => {
        return { name: item?.Centre, code: item?.CentreID };
      });
      setState(centres)
      if (!localStorage.getItem('defaultcentre')) {
        localStorage.setItem('defaultcentre', centres[0]?.value);
      }
}catch(error){
        console.log(error)
    }
}
