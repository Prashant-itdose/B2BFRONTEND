import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "primereact/autocomplete";

const DesktopMenuItem = ({ filteredData }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [t] = useTranslation();
  const [activeBar, setActiveBar] = useState(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  

  const search = (event) => {
    const filteredSuggestions = extractedData
      .flat()
      .filter((suggestion) =>
        suggestion?.childrenName?.toLowerCase().startsWith(
          event.query?.toLowerCase()
        )
      );
    if (filteredSuggestions.length > 0) {
      setSuggestions(
        filteredSuggestions.map((suggestion) => suggestion.childrenName)
      );
    } else {
      setSuggestions([]);
    }
  };
  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 100; // You can adjust the scroll amount as needed
    }
  };

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 100; // You can adjust the scroll amount as needed
    }
  };

  const findActiveTab = () => {
    for (let i = 0; i < filteredData?.length; i++) {
      for (let j = 0; j < filteredData[i]?.children?.length; j++) {
        if (
          filteredData[i]["children"][j]["url"]?.toLowerCase() ===
          location?.pathname.toLowerCase()
        ) {
          setActiveBar(i);
          break;
        }
      }
    }
  };

  const handleClick = (e) => {
    const url = extractedData.flat();
    const { value } = e;
    const navi = url?.find((ele) =>
      ele?.childrenName?.toLowerCase().startsWith(value.toLowerCase())
    );
    navigate(navi.url, { state: { data: navi?.breadcrumb } });
    setValue("");
  };

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        setShowPrevious(containerRef.current.scrollLeft > 0);
        setShowNext(
          containerRef.current.scrollLeft <
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        );
      }
    };

    containerRef.current.addEventListener("scroll", checkScroll);
    // return () => {
    //   containerRef.current.removeEventListener("scroll", checkScroll);
    // };
  }, []);

  const extractedData = filteredData?.map((menuItem) => {
    const childrenData = menuItem?.children?.map((child) => ({
      childrenName: child.childrenName,
      url: child.url,
      breadcrumb: child.breadcrumb,
    }));
    return childrenData;
  });
  const handlePageLink = (menuItem) => {
    if (menuItem?.children?.length) {
      navigate(menuItem?.children[0].url, {
        state: { data: menuItem?.children?.breadcrumb },
      });
    }
  };
  useEffect(() => {
    findActiveTab();
  }, [filteredData, location]);

  return (
    <div className="desktop-sidebar ">
      <div className="bg-color-container">
        <div className="d-flex justify-content-end bindrole container-fluid ">
          <nav style={{ width: "950px" }}>
            <div className="d-flex align-items-center justify-content-end">
              {showPrevious && (
                <i
                  className="fa fa-angle-double-left text-white mx-2"
                  aria-hidden="true"
                  onClick={scrollToLeft}
                ></i>
              )}
              <ul className={`nav nav-sidebar`} role="menu" ref={containerRef}>
                {filteredData?.map((menuItem, index) => (
                  <li
                    key={menuItem.menuName}
                    className={`nav-item menu-open ${activeBar === index && "active-sub-menu-list-style"}`}
                    onClick={() => {
                      setActiveBar(index);
                      handlePageLink(menuItem);
                    }}
                  >
                    <a
                      className={`nav-link`}
                      role="link"
                      style={{ cursor: "pointer" }}
                    >
                      <i className={`${menuItem.menuIcon} nav-icon mr-2`} />
                      <p>{t(menuItem.menuName)}</p>
                    </a>
                  </li>
                ))}
              </ul>
              {showNext && (
                <i
                  className="fa fa-angle-double-right text-white mx-2"
                  aria-hidden="true"
                  onClick={scrollToRight}
                ></i>
              )}
            </div>
          </nav>
          <div className="pt-2 mx-2 " style={{ position: "relative" }}>
            <AutoComplete
              value={value}
              suggestions={suggestions}
              completeMethod={search}
              className="w-100 custom-magic-search"
              onSelect={(e) => handleClick(e)}
              id="searchtest"
              onChange={(e) => setValue(e.value)}
              placeholder="Menu Search"
            />

            <i className="fa fa-search search_icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "white", boxShadow: "0px 0px 5px grey" }}
        className="w-100"
      >
        <ul className="nav d-flex">
          {filteredData &&
            filteredData[activeBar]?.children &&
            filteredData[activeBar]?.children.map((item) => (
              <li
                className={`nav-item mx-1 ${location.pathname.toLowerCase() === item.url.toLowerCase() ? " active-tab-menu" : "text-black"}`}
                key={item.childrenName}
                style={{ padding: "3px 15px" }}
              >
                <NavLink to={`${item.url}`} state={{ data: item?.breadcrumb }}>
                  <p style={{ whiteSpace: "nowrap", margin: "0px" }}>
                    <i className={`fas fa-tachometer-alt nav-icon mr-2`} />{" "}
                    {t(item.childrenName)}
                  </p>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DesktopMenuItem;
