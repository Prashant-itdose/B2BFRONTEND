import React, { useEffect, useState } from "react";
import {useLocalStorage} from "@app/utils/hooks/useLocalStorage";
import { Dialog } from "primereact/dialog";
// import { Divider } from "primereact/divider";
import CancelButton from "../UI/CancelButton";
import SaveButton from "@components/UI/SaveButton";

const OverLay = ({
  visible,
  setVisible,
  position,
  setPosition,
  children,
  Header,
}) => {

  const theme = useLocalStorage("theme", 'get')

  const isMobile = window.innerWidth <= 768;
 
  return (
    <>
      <Dialog
        header={Header}
        visible={visible}
        position={position}
        style={{ width: isMobile ? "90vw" : "95vw", height: "100vh" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        className={theme}
      >
        {children}
      </Dialog>
    </>
  );
};

export default OverLay;
