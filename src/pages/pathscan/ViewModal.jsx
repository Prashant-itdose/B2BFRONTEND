import React, { useEffect, useState } from "react";

import Modal from "../../components/modalComponent/Modal";

import { DeleteUpload,UploadDocument,SearchPatient} from "../../networkServices/opdserviceAPI";
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { toast } from 'react-toastify';


const ViewModal = ({
  isuploadOpen,
  setIsuploadOpen,
  preview,
  setPreview,
  modelHeader,
  details,
  view,
  handleSearch
}) => {
  const [docdetails, setdocdetails] = useState([]);
  const [isActive, setIsActive] = useState(null); // Track the active document
  const [documents, setDocuments] = useState([]); // Hold the fetched document types
  const [selectedDocuments, setSelectedDocuments] = useState([]); // Hold the user-selected documents

  const fetchdocdetails = async () => {
    const formData = new FormData();
    formData.append("VisitID", details[0]?.LabNo);
    formData.append("SessionEmployeeID", localStorage.getItem("employeeId"));
    formData.append("SessionCentreID", localStorage.getItem("CentreId") || 1);

    try {
      const dataResponse = await SearchPatient(formData);
      if (dataResponse.data.status) {
        const allDocuments = dataResponse?.data?.data_document || [];
        const mergedDocuments = allDocuments.map(doc => ({
          ...doc,
          DocumentTypeName: doc.DocumentName,
          UniqueID: doc.UniqueID,
          DocumentTypeID: doc.UniqueID
        }));

        setDocuments(mergedDocuments);

        if (mergedDocuments.length > 0) {
          const initialDocument = mergedDocuments[0];
          if (initialDocument?.FileURL) {
            setPreview(initialDocument.FileURL);
            setIsActive(initialDocument.UniqueID);
          }
          setSelectedDocuments(mergedDocuments[0]);
        } else {
          setIsuploadOpen(false);
           handleSearch()
          setPreview(null);
        }
      } else {
        toast.error(dataResponse.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdocdetails();
  }, []);

  const handleDocumentSelection = (documentTypeID) => {
    setIsActive(documentTypeID);
    const document = documents.find(doc => doc.UniqueID === documentTypeID);
    setSelectedDocuments(document);
    setPreview(document?.FileURL);
  };

  const handleRemoveImage = async (data) => {
    try {
      const formData = new FormData();
      formData.append('SessionEmployeeID', localStorage.getItem('employeeId'));
      formData.append('SessionLoginName', localStorage.getItem('employeeName'));
      formData.append('UniqueID', data?.UniqueID);

      await DeleteUpload(formData);
      fetchdocdetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('SessionEmployeeID', localStorage.getItem('employeeId'));
      formData.append('SessionLoginName', localStorage.getItem('employeeName'));
      formData.append('LedgerTransactionNo', details?.ele.LedgerTransactionNo);
      formData.append('DocumentTypeID', isActive);
      formData.append('DocumentTypeName', documents.find(doc => doc.DocumentTypeID === isActive)?.DocumentTypeName || '');

      const imageData = selectedDocuments[isActive]?.file;
      if (imageData) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(',')[1];
          formData.append('Document_Base64', base64String);

          try {
            const dataResponse = await UploadDocument(formData);
            toast.success(dataResponse?.data.message || 'Document submitted successfully');
          } catch (error) {
            console.error('Error submitting document:', error);
            toast.error('Error submitting document');
          }
        };
        reader.readAsDataURL(imageData);
      } else {
        try {
          const dataResponse = await UploadDocument(formData);
          toast.success(dataResponse?.data.message || 'Document submitted successfully');
        } catch (error) {
          console.error('Error submitting document:', error);
          toast.error('Error submitting document');
        }
      }
    } catch (error) {
      console.error('Error preparing document for submission:', error);
      toast.error('Error preparing document for submission');
    }
  };

  const renderPreview = (url) => {
    if (!url) return null;
  
    const fileExtension = url.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif','jfif'];
    const isImage = imageExtensions.includes(fileExtension);
  
    if (isImage) {
      return (
        <img
          src={url}
          alt="Preview"
          style={{
            maxWidth: '100%', // Ensure the image does not exceed the width of its container
            maxHeight: '500px', // Set a maximum height for the image
            objectFit: 'contain', // Maintain aspect ratio
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
  
  


  return (
    <Modal
      visible={isuploadOpen}
      setVisible={() => { setIsuploadOpen(false); setPreview(null);
        handleSearch()
       }}
      modalWidth={`50vw`}
      Header={!view ? modelHeader : 'View Documents'}
    >
      <div className=" d-flex row">
        <div style={{width:'40%'}}>
          <div
            style={{
              minHeight: "300px",
              overflowY: "scroll",
              borderRight: "3px solid grey",
              padding: "2px",
            }}
          >
            {documents?.map((data) => (
              <div key={data.DocumentTypeID} style={{ position: 'relative', marginBottom: '10px' }}>
                <button
                  className="btn btn-sm my-1 w-100"
                  onClick={() => handleDocumentSelection(data.DocumentTypeID)}
                  style={{
                    backgroundColor: isActive === data.DocumentTypeID ? '#007bff' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px',
                    cursor: 'pointer',
                    
                    position: 'relative'
                  }}
                >
                  {data.DocumentTypeName}
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
                      fontSize: '0.25rem', // Adjust icon size for responsiveness
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div  style={{width:'60%'}}>
          <div className="w-100">
            {renderPreview(preview)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
