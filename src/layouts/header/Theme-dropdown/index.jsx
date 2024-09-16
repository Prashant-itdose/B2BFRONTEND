import { StyledDropdown } from "@app/styles/common";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { addWindowClass, removeWindowClass } from "@app/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@app/utils/hooks/useLocalStorage";

const themes = [
  // {
  //     theme: 'blue_theme',
  //     icon: 'blue_icon',
  //     label: 'Blue',
  // },
  // {
  //     theme: 'green_theme',
  //     icon: 'green_icon',
  //     label: 'Green',
  // },
  // {
  //     theme: 'pink_theme',
  //     icon: 'pink_icon',
  //     label: 'Pink',
  // },

  {
    theme: "default_theme",
    icon: "default_icon",
    label: "Default",
  },
  {
    theme: "light_green_theme",
    icon: "light_green_icon",
    label: "Light Green",
  },
  {
    theme: "peach_theme",
    icon: "peach_icon",
    label: "Peach",
  },
  {
    theme: "pale_pink_theme",
    icon: "pale_pink_icon",
    label: "Pale Pink",
  },
  {
    theme: "red_theme",
    icon: "red_icon",
    label: "Red",
  },
  {
    theme: "sky_blue_theme",
    icon: "sky_blue_icon",
    label: "Blue",
  },
  {
    theme: "gray_theme",
    icon: "gray_icon",
    label: "Gray",
  },
];

const LanguagesDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const theme = useLocalStorage("theme", 'get')
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    addWindowClass(theme);
  }, [theme]);
  
  const handleSelect = (eventKey) => {
    useLocalStorage("theme", 'set', eventKey)
    addWindowClass(eventKey);
    if (eventKey !== theme) {
      removeWindowClass(theme);
    }

    let selectedTheme = themes?.find((theme) => theme?.theme === eventKey);
    setSelectedValue(selectedTheme);
  };

  function handleClick(event, theme, index) {
    event.preventDefault();
    setActiveIndex(index);
    setSelectedValue(theme);
  }

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          id="dropdown-basic"
          bsPrefix="custom-toggle"
          className="p-0 mx-1 theme-class"
        >
          <FontAwesomeIcon
            icon={faPalette}
            onClick={() => setActiveIndex(null)}
            // style={{ padding: "10px" }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {themes?.map((theme, index) => {
            return (
              <Fragment key={index}>
                <Dropdown.Item
                  eventKey={theme?.theme}
                  style={{ position: "relative" }}
                >
                  <span className={theme?.icon}> </span>
                  <span
                    className="ml-1"
                    onContextMenu={(e) => {
                      handleClick(e, theme?.theme, index);
                    }}
                  >
                    {theme?.label}
                  </span>
                  {activeIndex === index && (
                    <div
                      className={`theme-save`}
                    >
                      <button
                        onClick={() => {

                          handleSelect(selectedValue);
                        }}
                        className="text-white rounded"
                      >
                        Save theme
                      </button>
                    </div>
                  )}
                </Dropdown.Item>
              </Fragment>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LanguagesDropdown;
