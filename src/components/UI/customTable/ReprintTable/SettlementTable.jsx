import { Dropdown } from "primereact/dropdown"; // Import Dropdown from PrimeReact
import { Menu } from "primereact/menu"; // Import Menu for more options if needed
import ReactSelect from "../../../formComponent/ReactSelect";
import ReactSelectHead from "../../../formComponent/ReactSelectHead";
import Tables from ".."; // Assuming you have a Tables component

const SettlementTable = (props) => {
  const {
    THEAD,
    tbody = [],
    values,
    handleCustomSelect,
    handleEditInfo,
    handleSettlement,
    handleCashReceipt,
  } = props;

  const options = [
    { label: "Edit Info", value: "edit" },
    { label: "Settle", value: "settle" },
    { label: "Print Receipt", value: "print" },
    { label: "Fully Paid", value: "fullyPaid" },
  ];

  const handleReactSelect = (name, value, index) => {
    if (value.value === "edit") {
      handleEditInfo(index);
    } else if (value.value === "settle") {
      handleSettlement(index);
    } else if (value.value === "print") {
      handleCashReceipt(index);
    } else if (value.value === "fullyPaid") {
      handleCustomSelect(index, "isFullyPaid", !tbody[index].isFullyPaid);
    }
  };

  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody?.map((ele, index) => ({
          "Sr. No.": index + 1,
          "BillDate": ele?.BillDate,
          "Lab No.": ele?.LabNo,
          "PatientName": ele?.PatientName,
          "Centre": ele?.Centre,
          "Client": ele?.Client,
          "Doctor": ele?.Doctor,
          "GrossAmount": ele?.GrossAmount,
          "DiscAmount": ele?.DiscAmount,
          "NetAmount": ele?.NetAmount,
          "PaidAmount": ele?.PaidAmount,
          "DueAmount": ele?.DueAmount,
          "Select": (
          <input
            type="checkbox"
            name="isSelected"
            checked={ele?.isSelected}
            onChange={(e) =>
              handleCustomSelect(index, "isSelected", e.target.checked)
            }
          />
        ),
          "colorcode": ele?.rowColor,
        }))}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default SettlementTable;
