import React, { useEffect, useRef, useState } from "react";
import Tables from "..";
import Modal from "../../../modalComponent/Modal";
import SlotModal from "../../../modalComponent/Utils/SlotModal";
import { Card } from "react-bootstrap";
import BrowseButton from "../../../formComponent/BrowseButton";
import UploadImageModal from "../../../modalComponent/Utils/UploadImageModal";
import Button from "../../../formComponent/Button";
import { cardPrintUploadPhoto, cardPrintViewPhoto } from "../../../../networkServices/cardPrint";
import { notify, removeBase64Data } from "../../../../utils/utils";

function CardPrintTable({ bodyData, setBodyData }) {
  const [modalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track selected row index
  const [isuploadOpen, setIsuploadOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const THEAD = [
    { name: "S.no", width: "" },
    { name: "UHID", width: "" },
    { name: "Patient Name", width: "" },
    { name: "Contact No", width: "" },
    { name: "Sex", width: "" },
    { name: "Date Enrolled", width: "" },
    { name: "Photo", width: "0px" },
    { name: "Print Card", width: "0px" },
    { name: "Print Sticker", width: "0px" },
    { name: "Print Form", width: "0px" },
    // "SNO",
    // "UHID",
    // "Patient Name",
    // "Contact No",
    // "Sex",
    // "Date Enrolled",
    // "Photo",
    // "Print Card",
    // "Print Sticker",
    // // "Print Lab Request Form",
    // "Print Form",
  ];

  const handleChange = (e, index, name) => {
    const { value } = e.target;
    const data = [...bodyData];
    data[index][name] = value;
    setBodyData(data);
  };



  const closeCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  // Function to start camera
  const startCamera = async () => {
    try {
      setPreview(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream); // Store camera stream
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 200, 150);
    const base64ImageData = canvasRef.current.toDataURL('image/jpeg');
    setProfileImage(base64ImageData)
    setPreview(base64ImageData)
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    closeCameraStream();
    reader.onloadend = () => {
      // setImage(file);
      setPreview(reader.result);
      setProfileImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = (index) => {
    const uploadItem = bodyData[index]
    setModalData(uploadItem)
    setIsuploadOpen(true)
    handleViewPhotoAPICall(uploadItem)
  }

  const handleUploadAPICall = async (data) => {
    try {
      const formData = new FormData()
      formData.append("PatientID", data?.data?.UHID);
      formData.append("DateEnrolled", data?.data?.DateEnrolled);
      formData.append("CommandArgument", '1');
      if (data?.preview) {
        formData.append("FileUpload", removeBase64Data(data?.preview));
      }
      let result = await cardPrintUploadPhoto(formData)
      if (result?.success) {
        notify(result?.message, "success");
        setIsuploadOpen(false);
        closeCameraStream();
      } else {
        notify(result?.message, "error");
      }
      console.log("result", result)
    } catch (error) {
      console.error(error)
    }
  }

  const handleViewPhotoAPICall = async (data) => {
    let image = await cardPrintViewPhoto(data)
    setPreview(image);
  }
  return (
    <Card>
      <Tables
        thead={THEAD}
        tbody={bodyData.map((row, index) => ({
          ...row,
          "PhotoBrowse": (
            <i class="fa fa-image card-print-upload-image-icon" onClick={() => { handleUploadPhoto(index) }}></i>
          ),
          "PrintCard": (
            <i class="fa fa-print card-print-upload-image-icon" aria-hidden="true"></i>
          ),
          "PrintSticker": (
            <i class="fa fa-print card-print-upload-image-icon" aria-hidden="true"></i>
          ),
          "PrintLabRequestForm": (
            <i class="fa fa-print card-print-upload-image-icon" aria-hidden="true"></i>
          ),

        }))}
      />
      {isOpen && (
        <Modal visible={isOpen} setVisible={setIsOpen}>
          {selectedRowIndex !== null && (
            <div>
              <SlotModal />
            </div>
          )}
        </Modal>
      )}

      {isuploadOpen && (
        <UploadImageModal
          isuploadOpen={isuploadOpen}
          closeCameraStream={closeCameraStream}
          setIsuploadOpen={setIsuploadOpen}
          modalData={{ preview: preview, data: modalData }}
          handleImageChange={handleImageChange}
          // setModalData={setModalData}
          // preview={preview}
          startCamera={startCamera}
          videoRef={videoRef}
          cameraStream={cameraStream}
          takePhoto={takePhoto}
          canvasRef={canvasRef}
          handleAPI={handleUploadAPICall}
          selectedRowIndex={selectedRowIndex}
        />
      )}
    </Card>
  );
}

export default CardPrintTable;
