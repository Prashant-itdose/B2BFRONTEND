import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../../../../UI/customTable/index";
const GenerateMaster = (props) => {
  const { tbody , handleDelete } = props;
  const [t] = useTranslation();

  const THEAD = [
    t("tokenManagement.TokenGenerationMaster.S_No"),
    t("tokenManagement.TokenGenerationMaster.Token_Type"),
    t("tokenManagement.TokenGenerationMaster.Category_Name"),
    t("tokenManagement.TokenGenerationMaster.Sub_Category_Name"),
    t("tokenManagement.TokenGenerationMaster.Modality_Name"),
    t("tokenManagement.TokenGenerationMaster.Group_Name"),
    t("tokenManagement.TokenGenerationMaster.Token_Prefix"),
    t("tokenManagement.TokenGenerationMaster.Reset_Type"),
    t("Delete"),
  ];

  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody?.map((item, index) => ({
          S_No: index + 1,
          Token_Type: item?.mainCategoryName,
          Category_Name: item?.category,
          Sub_Category_Name: "",
          Modality_Name: "",
          Group_Name: item?.groupName,
          Token_Prefix: item?.tokenPrefix,
          Reset_Type: item?.resetTime,
          Edit: (
            <>
              <i className="fa fa-trash text-danger text-center" aria-hidden="true" onClick={()=>handleDelete(index)}></i>
            </>
          ),
        }))}
      />
    </>
  );
};

export default GenerateMaster;
