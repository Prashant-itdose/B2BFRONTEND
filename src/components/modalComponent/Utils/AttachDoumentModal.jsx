import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import BrowseButton from "../../formComponent/BrowseButton";
import Button from "../../formComponent/Button";

import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { GetDocumentMaster } from "../../../networkServices/opdserviceAPI";

const AttachDocumentModal = ({
  isuploadOpen,
  setIsuploadOpen,
  preview,
  setPreview, // Add setPreview to update the preview from the parent component
  modelHeader,
  details,
  view,
  handleSearch
}) => {
  const [isActive, setIsActive] = useState(null); // Track the active document
  const [documents, setDocuments] = useState([]); // Hold the fetched document types
  const [selectedDocuments, setSelectedDocuments] = useState({}); // Hold the user-selected documents
  const [isScanning, setIsScanning] = useState(false); // Track scanning state
  const webcamRef = useRef(null); // Ref for the webcam

  // Fetch document types from API
  const fetchDocuments = async () => {
    try {
      const form = new FormData();
      form.append('SessionEmployeeID', localStorage.getItem('employeeId'));
      const dataResponse = await GetDocumentMaster(form);

      if (dataResponse?.data.status === true) {
        setDocuments(dataResponse?.data?.data);
      } else {
        toast.error('Something Went Wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentSelection = (documentTypeID) => {
    setIsActive(documentTypeID);
    setPreview(selectedDocuments[documentTypeID]?.url || null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSelectedDocuments((prevDocs) => ({
        ...prevDocs,
        [isActive]: { url: objectURL, file: file },
      }));
      setPreview(objectURL); // Update preview with object URL
    }
  };
  
  const handleRemoveImage = (data) => {
    setSelectedDocuments((prevDocs) => {
      const updatedDocs = { ...prevDocs };
      delete updatedDocs[data?.DocumentTypeID];
      return updatedDocs;
    });

    if (isActive === data?.DocumentTypeID) {
      setPreview(null);
    }
  };

  const handleDocumentSubmit = async () => {
    
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };
  const renderPreview = (fileData) => {
    if (!fileData) return null;
  
    const { url, file } = fileData;
    if (!url) return null;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];
    const isImage = imageExtensions.includes(fileExtension);
  
    if (isImage) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '250px', // Set the container height to ensure the image is vertically centered
            width: '100%',
          }}
        >
          <img
            src={url}
            alt="Preview"
            style={{
              maxWidth: '70%',
              maxHeight: '100%', // Use full height to ensure it fits within the container
              objectFit: 'contain', // Maintain aspect ratio
            }}
          />
        </div>
      );
    }
    
    if (fileExtension === 'pdf') {
      return (
        <iframe
          src={url}
          title="PDF Preview"
          style={{
            width: '100%',
            height: '500px',
            border: 'none',
          }}
        />
      );
    }
  
    return (
      <div>
        <p>Preview not available for this file type.</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Download File</a>
      </div>
    );
  };

  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc); // Set the preview to the captured image
    stopScanning();
  };

  return (
    <Modal
      visible={isuploadOpen}
      setVisible={() => {setIsuploadOpen(false)
        setPreview(null)
        
      }}
      modalWidth={`50vw`}
      Header={!view ? modelHeader : 'View Documents'}
      buttons={
        isScanning ? (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
            />
            <button onClick={capture}>Capture</button>
            <button onClick={stopScanning}>Cancel</button>
          </div>
        ) : (
          <>
            <BrowseButton handleImageChange={handleImageChange} accept="image/*" />
            <Button name={"Submit Document"} type={"button"} className={'text-white'} handleClick={handleDocumentSubmit} />
            <Button name={"Scan Document"} type={"button"} className={'text-white'} handleClick={startScanning} />
          </>
        )
      }
    >
      {!isScanning && (
        <div className=" d-flex row">
        <div style={{width:'40%'}} >
          <div
            style={{
              minHeight: "300px",
              overflowY: "scroll",
              borderRight: "3px solid grey",
              padding: "2px",
            }}
          >
            {documents?.map((data) => (
              <div key={data.DocumentTypeID} style={{ position: 'relative', marginBottom: '5px' }}>
                <button
                  className="btn btn-sm w-100"
                  onClick={() => handleDocumentSelection(data.DocumentTypeID)}
                  style={{
                    backgroundColor: isActive === data.DocumentTypeID ? '#007bff' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '1px',
                    cursor: 'pointer',
                    
                    position: 'relative',
                    
                  }}
                >
                  {data.DocumentTypeName}
                  {selectedDocuments[data.DocumentTypeID] && (
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(data);
                      }}
                      style={{
                        position: 'absolute',
                        right: '5px', // Adjusted for more compact look
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '0.75rem', // Adjust icon size for responsiveness
                      }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      
        <div style={{width:'60%'}}>
          <div className="w-100">
          {renderPreview(selectedDocuments[isActive])}
          </div>
        </div>
      </div>
      
      )}
    </Modal>
  );
};

export default AttachDocumentModal;
