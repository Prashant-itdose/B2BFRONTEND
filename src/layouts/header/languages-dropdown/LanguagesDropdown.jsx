import { StyledDropdown } from '@app/styles/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const languages = [
  {
    key: 'en',
    icon: 'flag-icon-us',
    label: 'english',
  },
  {
    key: 'tr',
    icon: 'flag-icon-tr',
    label: 'turkish',
  },
  {
    key: 'de',
    icon: 'flag-icon-de',
    label: 'german',
  },
  {
    key: 'fr',
    icon: 'flag-icon-fr',
    label: 'french',
  },
  {
    key: 'es',
    icon: 'flag-icon-es',
    label: 'spanish',
  },
];

const LanguagesDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    const currentLanguage = i18n.language;
    if (currentLanguage) {
      const language = languages.find(
        (language) => language.key === currentLanguage
      );
      return language || languages[0];
    }
    return languages[0];
  };

  const isActiveLanguage = (language) => {
    if (language) {
      return getCurrentLanguage().key === language.key ? 'active' : '';
    }
    return '';
  };

  return (
    <StyledDropdown isOpen={dropdownOpen} hideArrow >
      <div className="nav-link " slot="head">
        <i className={`flag-icon ${getCurrentLanguage().icon}`} />
      </div>
      <div slot="body">
        {languages.map((language) => (
          <span
            type="button"
            key={language.key}
            className={`dropdown-item ${isActiveLanguage(language)}`}
            onClick={() => {
              changeLanguage(language.key);
              setDropdownOpen(false);
            }}
          >
            <i className={`flag-icon ${language.icon} mr-2`} />
            <span>{language.label}</span>
          </span>
        ))}
      </div>
    </StyledDropdown>
  );
};

export default LanguagesDropdown;
