import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import Input from "@app/components/formComponent/Input";
import logoitdose from "@app/assets/image/logoitdose.png";
import { useLocalStorage } from "@app/utils/hooks/useLocalStorage";
import axios from "axios";
import { useEffect } from "react";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { CentreWiseCacheByCenterID } from "../../store/reducers/common/CommonExportFunction";


const LoginComponent = () => {
  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  const [t] = useTranslation();
  const convertToFormData = (obj) => {
    const formData = new FormData();
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(`Appending ${key}: ${obj[key]}`);
        formData.append(key, obj[key]);
      }
    }
  
    // Debug: Log FormData entries
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    return formData;
  };
  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
      code:'',
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(5, "Must be 5 characters or more")
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required"),
    // }),
    onSubmit: async (values) => {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: '',
        };
        console.log(values)
        const newdata={...values,client:'B2B'}
        const formdata=convertToFormData(newdata)
        axios.post(apiUrls?.login, formdata, headers)
  .then((res) => {
    console.log(res)
    if(res?.data.status==false)
    { console.log(res?.data)
      toast.error(res?.data.message)
    }
    else {
      const responseData = res?.data;
      if (responseData) {
           localStorage.setItem("token",responseData.data[0]?.Token)
          localStorage.setItem("employeeName",responseData.data[0]?.EmployeeName)
          localStorage.setItem("employeeId",responseData.data[0]?.Employee_ID)
          localStorage.setItem("panelID",responseData.data[0]?.Panel_ID)
          localStorage.setItem('defaultcentre',responseData.data[0]?.CentreID)
          localStorage.setItem('AgeType',responseData.data[0]?.AgeType)
          localStorage.setItem('userRole','hc')
          localStorage.setItem('AllowPaymentGateway',responseData.data[0]?.AllowPaymentGateway)
          useLocalStorage("theme", "set", "default_theme");
          setWindowClass("hold-transition login-page default_theme");
           navigate("/dashboard");
           
        }
    }
   
   
  })
  .catch((err) => {
   
  });
        // await dispatch(signInAction(values));
       
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  });
  
 
  return (
    <>
      <div className="card card-outline card-primary border text-center py-3"  onSubmit={handleSubmit}>
        <div className="card-body ">
          <Link to="/">
            <img className="logoStyle" src={logoitdose} />
          </Link>
          <h5 className="cardTitle my-3"> Sign in to start your session</h5>
          <div className="row">
            <div className="col-sm-12 d-flex mt-4">
            <div className="maindiv"  >
                <Input
                  type="text"
                  className="form-control"
                  id="text"
                  name="code"
                  lable={t("Code")}
                  placeholder=" "
                  value={values?.code}
                  onChange={handleChange}
                />
              </div>
              <div className="icondiv">
                <i className="fas fa-envelope" />
              </div>
            </div>
            <div className="col-sm-12 d-flex mt-4">
              <div className="maindiv"  >
                <Input
                  type="text"
                  className="form-control"
                  id="text"
                  name="username"
                  lable={t("Username")}
                  placeholder=" "
                  value={values?.username}
                  onChange={handleChange}
                />
              </div>
              <div className="icondiv">
                <i className="fas fa-envelope" />
              </div>
              {/* {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : ( */}
            </div>
            <div className="col-sm-12 d-flex mt-4">
              <div className="maindiv">
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  lable={t("Password")}
                  placeholder=" "
                  value={values?.password}
                  onChange={handleChange}
                />
              </div>
              <div className="icondiv">
                <i className="fas fa-lock" />
              </div>
              {/* {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : ( */}
            </div>
            
          </div>
          <div className="row">
            <div className="col-sm-12 mt-4">
              <button
                className=" btn btn-sm btn-primary btn-block"
                 onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
