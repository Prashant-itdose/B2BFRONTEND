import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyledBigUserImage, StyledSmallUserImage } from '@app/styles/common';
import {
  UserBody,
  UserFooter,
  UserHeader,
  UserMenuDropdown,
} from '@app/styles/dropdown-menus';
import { useLocalStorage } from '../../../utils/hooks/useLocalStorage';

// declare const FB;

const UserDropdown = () => {
  const localData =  useLocalStorage("userData", "get"); // get Data from localStorage
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state?.auth?.authentication);
  const [dropdownOpen, setDropdownOpen] = useState(false);

 

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        src={authentication?.profile.picture}
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={20}
        height={20}
        rounded
      />
      <div slot="body" className='manage_usermodel'>
        <UserHeader >
          <StyledBigUserImage
            src={authentication?.profile.picture}
            fallbackSrc="/img/default-profile.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>
            {authentication?.profile.email}
            <small>
              <span className='text-white'> {localData?.EmpName} </span>
              <span>
                {/* {DateTime.fromISO(user.createdAt).toFormat('dd LLL yyyy')} */}
              </span>
            </small>
          </p>
        </UserHeader>
        {/* <UserBody>
          <div className="row">
            <div className="col-6 text-center">
              <Link to="/">{t('header.user.Edit_detail')}</Link>
            </div>
       
            <div className="col-6 text-center">
              <Link to="/">{t('header.user.change_password')}</Link>
            </div>
          </div>
        </UserBody> */}
        <UserFooter className='possition-relative p-4'>
              <button type="button" className=" float-right text-white rounded Edit_detail">
                Edit ProfielImage
              </button>

              <button type="button" className=" float-right text-white rounded change_password " onClick={()=>{
                navigate('/ChangePassword')
              }}>
                ChangePassword
              </button>

              
      
          {/* <div className="row">
            <div className="col-4 text-center">

            </div>

            <div className="col-8 text-center">

            </div>
          </div> */}


        </UserFooter>
      </div>
    </UserMenuDropdown>
  );
};

export default UserDropdown;
