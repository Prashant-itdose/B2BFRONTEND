import React from "react";
import Breadcrumb from "../Breadcrumb";
import { useLocation } from "react-router-dom";

function Heading({ title, onClick, secondTitle, isBreadcrumb }) {
  const location = useLocation();
  return (
    <div className="card card_background">
      <div className="card-header" onClick={onClick}>
        <h4 className="card-title w-100 d-flex justify-content-between">
          {isBreadcrumb ? (
            <Breadcrumb path={location?.pathname} />
          ) : (
            <>
              <div className="">{title}</div>
            </>
          )}
          {secondTitle && <div className="p-1 mr-3">{secondTitle}</div>}
        </h4>
      </div>
      
    </div>
  );
}

export default Heading;
