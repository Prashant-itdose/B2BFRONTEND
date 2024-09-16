import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../..";
const ModalityMasterTable = (props) => {
  const { tbody, handleEditData } = props;
  const [t] = useTranslation();

  const THEAD = [
    t("TokenManagement.ModilityMaster.tableDataName.SNO"),
    t("TokenManagement.ModilityMaster.tableDataName.CentreName"),
    t("TokenManagement.ModilityMaster.tableDataName.SubCategoryName"),
    t("TokenManagement.ModilityMaster.tableDataName.ModalityName"),
    t("TokenManagement.ModilityMaster.tableDataName.Floor"),
    t("TokenManagement.ModilityMaster.tableDataName.RoomNo"),
    t("TokenManagement.ModilityMaster.tableDataName.ActiveStatus"),
    t("TokenManagement.ModilityMaster.tableDataName.Edit"),
  ];

  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody.map((ele, index) => ({
          SNO: index + 1,
          CentreName: ele?.CentreName,
          SubCategoryName: ele?.SubcategoryName,
          ModalityName: ele?.ModalityName,
          Floor: ele?.FLOOR,
          RoomNo: ele?.RoomNo,
          ActiveStatus: ele?.ActiveStatus,
          Edit: (
            <>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleEditData(ele)}
              >
                Edit
              </button>
            </>
          ),
        }))}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default ModalityMasterTable;
