import React from "react";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import SaveButton from "@components/UI/SaveButton";
import CancelButton from "../UI/CancelButton";
import { useLocalStorage } from "@app/utils/hooks/useLocalStorage";

const Modal = ({ setVisible, visible, children, Header, buttons, modalWidth, setModalData, modalData ,handleAPI,buttonName,footer}) => {
  const isMobile = window.innerWidth <= 768;
  const theme = useLocalStorage("theme", 'get')


  const handleSubmit = () => {
    console.log("modalDatamodalData",modalData)
    handleAPI(modalData)
  }

  const footerContent = (
    <div>
       <div className="ftr_btn">
          {buttons}
          {/* <SaveButton btnName={buttonName?buttonName:"Save"} handleSubmit={handleSubmit} />
          <CancelButton
            cancleBtnName={"Cancel"}
            onClick={() => setVisible(false)}
          /> */}
        </div>
    </div>
  );
  return (
    <>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: isMobile ? "90vw" : modalWidth }}
        onHide={() => {
          setVisible(false);
        }}
        draggable={false}
        className={theme}
        footer={footer ? footer : footerContent}
      >
        <Divider className={`custom-divider-header ${theme}`} />

        <p className={`mt-0 ${theme}`}>{children}</p>
      </Dialog>
    </>
  );
};

export default Modal;
