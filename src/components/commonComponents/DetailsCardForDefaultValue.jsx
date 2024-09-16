import React from "react";
import LabeledInput from "../formComponent/LabeledInput";
import { useTranslation } from "react-i18next";
import SeeMore from "../UI/SeeMore";

function DetailsCardForDefaultValue({
  singlePatientData,
  children,
  seeMore,
  ModalComponent,
  sendReset,
}) {
  const [t] = useTranslation();

  singlePatientData[0].icons = (
    <div
      style={{
        border: "1px solid #447dd5",
        padding: "2px 5px",
        borderRadius: "3px",
        backgroundColor: "#447dd5",
        color: "white",
      }}
      onClick={sendReset}
    >
      <i class="fa fa-search " aria-hidden="true"></i>
    </div>
  );

  return (
    <div className="d-flex ">
      <div className="mt-3 w-100 mr-1">
        <div className="row px-2">
          {singlePatientData?.map((data, index) => (
            <div className="col-xl-2 col-md-4 col-sm-6 col-12 mb-2" key={index}>
              <div className="d-flex">
                {data?.icons}
                <LabeledInput
                  label={data?.label}
                  value={data?.value}
                  className={"w-100"}
                />
              </div>
            </div>
          ))}
          {children}
        </div>
      </div>
      <div>
        {seeMore && (
          <SeeMore
            Header={
              <div style={{ position: "relative", right: "5px", top: "13px" }}>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </div>
            }
          >
            {/* three dots item list */}
            <ul className="list-group" style={{ whiteSpace: "nowrap" }}>
              {seeMore?.map((items, index) => {
                return (
                  <li
                    className="list-group-item p-2"
                    key={index}
                    onClick={() =>
                      ModalComponent(items?.name, items?.component)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {items.name}
                  </li>
                );
              })}
            </ul>
          </SeeMore>
        )}
      </div>
    </div>
  );
}

export default DetailsCardForDefaultValue;
