import React, { useState, useRef, useEffect } from "react";

function SeeMore({ Header, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      className="d-flex align-items-center justify-content-end"
      style={{ position: "relative" }}
    >
      <div ref={ref}>
        <div style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
          {Header}
        </div>
        {show && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              boxShadow: "0px 0px 5px",
              borderRadius: "5px",
              top: "28px",
              zIndex: 999,
              right: "4px",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default SeeMore;
