import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import LoginComponent from "./LoginComponent";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(5, "Must be 5 characters or more")
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required"),
    // }),
    onSubmit: (values) => {
      // localStorage.setItem("userData", JSON.stringify("estdyguhjk"));
       dispatch(signInAction(values));
      navigate("/dashboard");
    },
  });

  setWindowClass("hold-transition login-page");

  return (
    <>
      <div className="container-fluid  ">
        <div className="row datastyle">
          <div className="col-sm-8  d-none d-lg-block">
            <div className="d-flex justify-content-center aligns-item-center">
              <div className="inner-login-container">
                <div className="col-sm-12 col-md-6 ">
                  <div className="cardBox">
                    <LoginComponent />
                  </div>
                  <div className="PoweredBybox">
                    <h1 className="PoweredBy">POWERED BY :</h1>
                    <h1 className="PoweredByLink">
                      <a
                        href="https://www.itdoseinfo.com/"
                        
                      >
                        ITDOSEINFOSYSTEMS
                      </a>
                    </h1>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="d-lg-none mx-5">
            <LoginComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
