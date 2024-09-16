import React from "react";
import Tables from ".";
import { useTranslation } from "react-i18next";
import { Select } from "@profabric/react-components";

const CompanyTable = (props) => {
  const { tbody } = props;
  
  const [t] = useTranslation();

  const THEAD = [
    t("S.no"),
    t("CompanyCode"),
    t("CompanyName"),
    t("Select")];

 
  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody.map((item, index) => ({
          "S.no": index + 1,
          CompanyCode: item?.CompanyCode,
          CompanyName: item?.CompanyName,
          Select:<span className="fa fa-edit"></span>
        }))}
        
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default CompanyTable;
