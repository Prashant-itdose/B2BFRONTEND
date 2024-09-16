import { toast } from "react-toastify";
import { ROUNDOFF_VALUE } from "./constant";
import moment from "moment";


export const notify = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "warn") {
    toast.warn(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

export const filterByType = (state, type, filterKey, labelKey, valueKey) => {
  if (state?.length) return state
    ?.filter((ele) => ele[filterKey] === type)
    ?.map((ele) => {
      return {
        label: ele?.[labelKey],
        value: ele?.[valueKey],
      };
    });
};

export const filterByTypes = (
  data,
  type,
  filterKeys,
  labelKey,
  valueKey,
  extraColomn
) => {
  // ele[filterKeys[0]] === type[0] && ele[filterKeys[1]] === type[1]
  if (data?.length) return data
    ?.filter((ele) => {
      return filterKeys?.every((key, index) => {
        return typeof type[index] === "object"
          ? type[index].includes(ele[key])
          : ele[key] === type[index];
      });
    })
    ?.map((ele) => {
      return {
        label: ele?.[labelKey],
        value: ele?.[valueKey],
        extraColomn: ele?.[extraColomn],
      };
    });
};

export const BindStateByCountry = (
  state,
  type,
  filterKey,
  labelKey,
  valueKey,
  filterID,
  filterIDKey
) => {
  return state
    ?.filter((ele) => ele[filterKey] === type && ele[filterIDKey] === filterID)
    ?.map((ele) => {
      return {
        label: ele?.[labelKey],
        value: ele?.[valueKey],
      };
    });
};

export const BindDistrictByCountryByState = (
  state,
  type,
  filterKey,
  labelKey,
  valueKey,
  CountryID,
  StateID
) => {
  return state
    ?.filter(
      (ele) =>
        ele[filterKey] === type &&
        ele["StateID"] === parseInt(StateID) &&
        ele["CountryID"] === CountryID
    )
    ?.map((ele) => {
      return {
        label: ele?.[labelKey],
        value: ele?.[valueKey],
      };
    });
};

export const BindCityBystateByDistrict = (
  state,
  type,
  filterKey,
  labelKey,
  valueKey,
  stateID,
  districtID
) => {
  return state
    ?.filter(
      (ele) =>
        ele[filterKey] === type &&
        ele["StateID"] === stateID &&
        ele["DistrictID"] === districtID
    )
    ?.map((ele) => {
      return {
        label: ele?.[labelKey],
        value: ele?.[valueKey],
      };
    });
};

export const handleReactSelectDropDownOptions = (state, labelKey, valueKey) => {
  return state?.map((ele, index) => {
    return {
      ...ele,
      label: ele[labelKey],
      value: ele[valueKey],
    };
  });
};

export const ReactSelectisDefaultValue = (state, keyName) => {
  return state?.find((ele) => ele[keyName] === 1);
};

export const isArrayFunction = (params) => {
  return Array.isArray(params) ? params : [];
};

export function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export const bindLabelValue = (label, value) => {
  // debugger
  return { label: label ? label : " ", value: value ? value : " " };
};

export const handletab = (formRef) => {
  const handleTabKey = (event) => {
    console.log("araeeerrrr", event.key);
    if (event.key === "Tab") {

      const allFields = Array.from(
        formRef.current.querySelectorAll("input")
      );

      let requiredFields = allFields.filter(el => el.classList.contains('required-fields'));
      let optionalFields = allFields.filter(el => !el.classList.contains('required-fields'));

      requiredFields = requiredFields.filter(el => !el.classList.contains('disable-focus'));
      optionalFields = optionalFields.filter(el => !el.classList.contains('disable-focus'));

      const currentElement = document.activeElement;
      const currentIndex = allFields.indexOf(currentElement);
      if (currentIndex !== -1) {
        event.preventDefault();

        let nextElement;

        if (requiredFields.includes(currentElement)) {
          // Move to the next required field
          let nextIndex = (requiredFields.indexOf(currentElement) + 1) % requiredFields.length;
          nextElement = requiredFields[nextIndex];
        } else {
          // Move to the next optional field
          let nextIndex = (optionalFields.indexOf(currentElement) + 1) % optionalFields.length;
          nextElement = optionalFields[nextIndex];
        }

        console.log("allFieldsallFields", nextElement)
        // // Find the next required field
        // let nextIndex = (currentIndex + 1) % allFields.length;
        // // let nextElement = allFields[nextIndex];

        // while (
        //   nextElement &&
        //   !nextElement.classList.contains("required-fields")
        // ) {
        //   nextIndex = (nextIndex + 1) % allFields.length;
        //   nextElement = allFields[nextIndex];
        // }

        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };

  const form = formRef.current;
  form.addEventListener("keydown", handleTabKey);

  return () => {
    form.removeEventListener("keydown", handleTabKey);
  };
};

export const findSumBillAmount = (data, key) => {
  // debugger;
  const value = data?.reduce((acc, current) => acc + Number(current[key]), 0);
  return Number(value);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const calculateBillAmount = (
  data,
  isReceipt,
  patientAdvanceAmount,
  refund,
  autoPaymentMode,
  panelAdvanceAmount,
  coPayIsDefault,
  discountIsDefault
) => {
  const returnData = {};
  returnData.panelID = data[0]?.panelID;
  returnData.billAmount = findSumBillAmount(data, "grossAmount").toFixed(
    ROUNDOFF_VALUE
  );
  returnData.discountAmount = findSumBillAmount(data, "discountAmount").toFixed(
    ROUNDOFF_VALUE
  );
  returnData.isReceipt = isReceipt === "1" ? true : false;
  returnData.patientAdvanceAmount = patientAdvanceAmount;
  returnData.autoPaymentMode = autoPaymentMode;
  returnData.minimumPayableAmount = Number(
    findSumBillAmount(data, "PayableAmount")
  ).toFixed(ROUNDOFF_VALUE);
  returnData.panelAdvanceAmount = panelAdvanceAmount;
  returnData.disableDiscount = returnData?.discountAmount > 0 ? true : false;
  returnData.refund = refund;
  returnData.constantMinimumPayableAmount = returnData?.minimumPayableAmount;
  returnData.coPayIsDefault = coPayIsDefault;
  returnData.discountIsDefault = discountIsDefault;

  return returnData;
};

export const PAYMENT_MODE_FLAG_ISREFUND = {
  all: 0,
  refund: 1,
  advance: 2,
  settlement: 3,
};

export const opdSettlementPaymentObj = (data) => {
  const returnData = {};
  const pending = Math.abs(data?.PendingAmt);
  returnData.panelID = data?.PanelID;
  returnData.grossAmount = pending;
  returnData.discountAmount = 0;
  returnData.PayableAmount = pending;
  returnData.minimumPayableAmount = pending;
  returnData.isRefund =
    data?.PendingAmt >= 0
      ? PAYMENT_MODE_FLAG_ISREFUND["settlement"]
      : PAYMENT_MODE_FLAG_ISREFUND["refund"];
  return returnData;
};

export const parseSubCategoryString = (dataString) => {
  // Ensure dataString is a string
  // if (typeof dataString !== 'string') {
  //   return {};
  // }

  // Remove the curly braces and split by comma
  const parts = dataString.replace(/[{}]/g, "").split(", ");

  // Convert to key-value pairs
  const dataObject = {};
  parts.forEach((part) => {
    const [key, value] = part.split(" = ");
    if (key && value) {
      dataObject[key.trim()] = value.trim();
    }
  });

  return dataObject;
};

export const reactSelectOptionList = (data, labelKey, valueKey) => {
  return data?.map((ele) => {
    return {
      label: ele?.[labelKey],
      value: ele?.[valueKey],
    };
  });
};

export const AddInvestigation = (data) => {
  return {
    autoCompleteItemName: data?.Typename, //1
    item_ID: data?.ItemID,
    isadvance: data?.isadvance,
    isOutSource: data?.IsOutSource,
    itemCode: data?.ItemCode,
    type_ID: data?.Type_id, //2
    labType: data?.LabType,
    tnxType: data?.TnxType,
    subCategoryID: data?.SubCategoryID,
    sample: data?.Sample,
    typeName: data?.Typename, //3
    rateEditable: 0,
    isMobileBooking: 0,
    categoryid: data?.CategoryID,
    subCategory: data?.SubCategory,
    isSlotWisetoken: 0,
    appointmentID: 0,
    gstType: data?.GstType, //4
    iGSTPercent: data?.IGSTPercent, //5
    cGSTPercent: data?.CGSTPercent, //6
    sGSTPercent: data?.SGSTPercent, //7
    gstPer: data?.GstPer, //8
    DoctorID: data?.DoctorID,
  };
};

export const removeBase64Data = (base64Img) => {
  const prefixPattern = /^data:image\/[a-zA-Z]+;base64,/;
  return base64Img?.replace(prefixPattern, "");
};

export const inputBoxValidation = (regx, e, handleChange) => {
  const { value } = e.target;
  if (regx?.test(value)) {
    handleChange(e);
  }
};
export const ageValidation = (regx, e, handleChange, AgeType) => {
  const { value } = e.target;
  if (AgeType === "YRS") {
    if (parseInt(value?.split(".")[1]) > 11) return false;
    if (regx?.test(value)) {
      handleChange(e);
    }
  } else if (AgeType === "MONTH(S)") {
    if (parseInt(value?.split(".")[1]) > 30) return false;
    if (parseInt(value) > 11) return false;
    if (regx?.test(value)) {
      handleChange(e);
    }
  } else if (AgeType === "DAYS(S)") {
    if (parseInt(value) > 30) return false;
    if (regx?.test(value)) {
      handleChange(e);
    }
  }
}

export const Register_Patient_TypeCasting = (values, panelBodyData) => {
  let requestBodyData = {}
  let patientMaster = {}
  let policyDetail = []

  let documentIds = []
  values?.documentIds?.length > 0 && values?.documentIds?.map((val) => {
    let obj = {}
    obj.idProofID = val?.name?.value ? val?.name?.value?.split('#')[0] : ""
    obj.idProofName = val?.name?.label
    obj.idProofNumber = val?.id
    documentIds.push(obj)
  })

  panelBodyData?.length > 0 && panelBodyData?.map((val) => {
    let obj = {}
    obj.policyNo = val?.PolicyNo ?? ""
    obj.policyExpiry = val?.PolicyExpiry ? moment(val?.PolicyExpiry, 'DD-MM-YYYY').format('YYYY-MM-DD') : "0001-01-01"
    obj.patientType = "OPD"
    obj.panel_ID = val?.PanelName?.value ? parseInt(val?.PanelName?.value) : 0
    obj.pharmacyCreditLimitPercent = 0
    obj.remarks = val?.ApprovalRemarks ?? ""
    obj.panelGroupID = parseInt(val?.PanelGroup?.value) ?? 0
    obj.parentPanelID = parseInt(val?.ParentPanel?.value) ?? 0
    obj.panelCroporateID = parseInt(val?.CorporareName?.value) ?? 0
    obj.policyCardNo = val?.PolicyCardNo ?? ""
    obj.panelCardName = val?.PanelCardName ?? ""
    obj.polciyCardHolderRelation = val?.CardHolder?.value ?? ""
    obj.approvalAmount = val?.ApprovalAmount ? parseFloat(val?.ApprovalAmount) : 0.00
    obj.approvalRemarks = val?.ApprovalRemarks ?? ""
    obj.isDefaultPanel = 0
    policyDetail.push(obj);
  })

  patientMaster.patientID = ""
  patientMaster.oldPatientID = ""
  patientMaster.title = values?.Title?.value ? values?.Title?.value : values?.Title ?? ""
  patientMaster.pFirstName = values?.PFirstName ?? ""
  patientMaster.pLastName = values?.PLastName ?? ""
  patientMaster.pName = values?.PFirstName + " " + values?.PLastName ?? ""
  patientMaster.age = values?.Age + " " + values?.AgeType ?? ""
  patientMaster.dob = values?.DOB ? moment(values?.DOB).format('YYYY-MM-DD') : "0001-01-01"
  patientMaster.gender = values?.Gender?.value ? values?.Gender?.value : values?.Gender ?? ""
  patientMaster.panelID = 1
  patientMaster.maritalStatus = values?.MaritalStatus?.value ? values?.MaritalStatus?.value : values?.MaritalStatus ?? ""
  patientMaster.mobile = values?.Mobile ?? ""
  patientMaster.email = values?.Email ?? ""
  patientMaster.relation = values?.Relation?.value ? values?.Relation?.value : values?.Relation ?? "Self"
  patientMaster.relationName = values?.RelationName ?? ""
  patientMaster.relationPhoneNo = values?.RelationPhoneNo ?? ""
  patientMaster.house_No = values?.House_No ?? ""
  patientMaster.country = values?.countryID?.label ? values?.countryID?.label : values?.Country ?? ""
  patientMaster.countryID = values?.countryID?.value ? parseInt(values?.countryID?.value) : parseInt(values?.countryID) ?? 0
  patientMaster.state = values?.StateID?.label ? values?.StateID?.label : values?.State ?? ""
  patientMaster.stateID = values?.StateID?.value ? parseInt(values?.StateID?.value) : parseInt(values?.StateID) ?? 0
  patientMaster.district = values?.districtID?.label ? values?.districtID?.label : values?.District ?? ""
  patientMaster.districtID = values?.districtID?.value ? parseInt(values?.districtID?.value) : parseInt(values?.districtID) ?? 0
  patientMaster.city = values?.cityID?.label ? values?.cityID?.label : values?.City ?? ""
  patientMaster.cityID = values?.cityID?.value ? parseInt(values?.cityID?.value) : parseInt(values?.cityID) ?? 0
  patientMaster.taluka = ""
  patientMaster.talukaID = 0
  patientMaster.place = values?.Place ?? ""
  patientMaster.landMark = ""
  patientMaster.occupation = ""
  patientMaster.base64PatientProfilePic = ""
  patientMaster.hospPatientType = values?.HospPatientType?.label ? values?.HospPatientType?.label : values?.HospPatientType ?? ""
  patientMaster.patientType = values?.HospPatientType?.label ? values?.HospPatientType?.label : values?.HospPatientType ?? "SELF"
  patientMaster.patientTypeID = values?.HospPatientType?.value ? parseInt(values?.HospPatientType?.value) : parseInt(values?.HospPatientType) ?? 0
  patientMaster.patientIDProofs = documentIds ?? []
  patientMaster.feesPaid = 0
  patientMaster.religion = values?.Religion?.value ? values?.Religion?.value : values?.Religion ?? ""
  patientMaster.emergencyPhoneNo = values?.EmergencyPhoneNo ?? ""
  patientMaster.emergencyRelationOf = values?.EmergencyRelationOf?.value ? values?.EmergencyRelationOf?.value : values?.EmergencyRelationOf ?? ""
  patientMaster.emergencyFirstName = values?.EmergencyFirstName ?? ""
  patientMaster.emergencySecondName = values?.EmergencySecondName ?? ""
  patientMaster.emergencyAddress = values?.EmergencyAddress ?? ""
  patientMaster.placeOfBirth = values?.placeofBirth ?? ""
  patientMaster.identificationMark = values?.IdentificationMark ?? ""
  patientMaster.identificationMarkSecond = values?.IdentificationMarkSecond ?? ""
  patientMaster.mlC_NO = values?.MLC_NO ?? ""
  patientMaster.mlC_Type = values?.MLC_Type ? values?.MLC_Type?.label : "" ?? ""
  patientMaster.isInternational = values?.IsInternational?.value ? parseInt(values?.IsInternational?.value) : parseInt(values?.IsInternational) ?? 2
  patientMaster.overSeaNumber = values?.InternationalNumber ?? ""
  patientMaster.passport_No = values?.Passport_No ?? ""
  patientMaster.ethenicGroup = ""
  patientMaster.isTranslatorRequired = "0"
  patientMaster.facialStatus = ""
  patientMaster.race = ""
  patientMaster.employement = ""
  patientMaster.monthlyIncome = 0
  patientMaster.parmanentAddress = values?.parmanentAddress ?? ""
  patientMaster.languageSpoken = ""
  patientMaster.phoneSTDCODE = values?.Phone_STDCODE ?? ""
  patientMaster.residentialNumberSTDCODE = values?.ResidentialNumber_STDCODE ?? ""
  patientMaster.phone = values?.Phone ?? ""
  patientMaster.residentialNumber = values?.ResidentialNumber ?? ""
  patientMaster.locality = values?.Place ?? ""
  patientMaster.internationalCountryID = values?.InternationalCountryID?.value ? parseInt(values?.InternationalCountryID?.value) : parseInt(values?.InternationalCountryID) ?? 0
  patientMaster.internationalCountry = values?.InternationalCountryID?.label ? values?.InternationalCountryID?.label : values?.InternationalCountry ?? ""
  patientMaster.internationalNumber = values?.InternationalNumber ?? ""
  patientMaster.remark = ""
  patientMaster.ipAddress = "11.233.223.55"
  patientMaster.languageSpoken = ""

  requestBodyData.patientMaster = patientMaster;
  requestBodyData.policyDetail = policyDetail;

  return requestBodyData;

}

