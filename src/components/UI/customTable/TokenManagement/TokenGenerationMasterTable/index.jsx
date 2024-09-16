import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../../../../UI/customTable/index";
import { Tooltip } from "primereact/tooltip";
const index = (props) => {
  const { tbody } = props;
  const [t] = useTranslation();

  const THEAD = [
    t("tokenManagement.TokenGenerationMaster.S_No"),
    t("tokenManagement.TokenGenerationMaster.Centre_Name"),
    t("tokenManagement.TokenGenerationMaster.Token_Type"),
    t("tokenManagement.TokenGenerationMaster.Category_Name"),
    t("tokenManagement.TokenGenerationMaster.Sub_Category_Name"),
    t("tokenManagement.TokenGenerationMaster.Modality_Name"),
    t("tokenManagement.TokenGenerationMaster.Group_Name"),
    t("tokenManagement.TokenGenerationMaster.Token_Prefix"),
    t("tokenManagement.TokenGenerationMaster.Reset_Type"),
    t("tokenManagement.TokenGenerationMaster.D_Active"),
    t("tokenManagement.TokenGenerationMaster.Edit"),
  ];


  const checkStrLength =   (params, index)=>{
    if(params?.length > 10){
      return <><Tooltip
      key={index}
      target={`#Group_Name-${index}`}
      position="top"
    />{`${params.substring(0, 10)}...`}</>
    }
    return params
  }


  return (
    <>
      
      <Tables
        thead={THEAD}
        tbody={tbody?.map((item, index) => ({
          S_No: index + 1,
          Centre_Name: item?.CentreName,
          Token_Type: item?.Token_Type,
          Category_Name: item?.getCategoryName,
          Sub_Category_Name: item?.subCategoryName,
          Modality_Name: item?.ModalityName,
          Group_Name: <> <span
                id={`Group_Name-${index}`}
                data-pr-tooltip={item?.groupName}
                style={{ fontSize: "11px" }}
              >{checkStrLength(item?.groupName, index)}</span></>,
          Token_Prefix: item.Sequence,
          Reset_Type: item.ResetType,
          D_Active: (
            <>
              <input type="checkbox" name="" id="" />
            </>
          ),
          Edit: (
            <>
              <button className={"btn btn-sm btn-primary"}>Edit</button>
            </>
          ),
        }))}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default index;
