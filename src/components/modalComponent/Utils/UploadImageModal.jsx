import React, { useEffect, useRef, useState } from "react";
import nurse from "../../../assets/image/nurse.png";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";

const UploadImageModal = ({
  isuploadOpen,
  closeCameraStream,
  setIsuploadOpen,
  handleImageChange,
  startCamera,
  videoRef,
  cameraStream,
  takePhoto,
  canvasRef,
  handleAPI,
  setModalData,
  modalData
}) => {
  //
  const isMobile = window.innerWidth <= 768;
  return (
    <Modal
      visible={isuploadOpen}
      handleAPI={handleAPI}
      setModalData={setModalData}
      modalData={modalData}
      setVisible={() => {
        closeCameraStream(); // Close camera stream before closing modal
        setIsuploadOpen(false);
      }}
      modalWidth={`500px`}
      buttonName="Add"
      Header="Upload Image"
      buttons={
        <>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
          />
          <button className="btn btn-sm">
            <label htmlFor="fileInput" className="text-white file-type-browse">
              Browse
            </label>
          </button>
          {!isMobile && <button className="text-white" onClick={startCamera}>
            Webcam
          </button>}

        </>
      }

    >

      <div
        className={`d-flex upload-image-model text-center justify-content-center`}
      >
        {modalData?.preview && !cameraStream?.active ? (
          <div style={{ height: "150px" }}>
            <img src={modalData?.preview} alt="Preview" width="200" height="150" />
          </div>
        ) : (
          <>
            <div>
              <video ref={videoRef} width="200" height="150" autoPlay></video>
            </div>
            <div>
              {cameraStream?.active && (
                <button onClick={takePhoto} className="btn btn-primary">
                  Capture
                </button>
              )}
            </div>
            <div>
              <canvas ref={canvasRef} width="200" height="150"></canvas>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UploadImageModal;
