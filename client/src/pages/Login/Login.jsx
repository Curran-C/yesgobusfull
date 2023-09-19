import {
  facebook,
  google,
  image,
  linkedin,
  logoblack,
} from "../../assets/login";
import "./Login.scss";
import { Button, Input } from "../../components";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [createAccountData, setCreateAccountData] = useState({});
  const [showOTP, setShowOTP] = useState(false);

  // functions
  const isMobilenumber = (num) => {
    let isIndianNumber = /^[6789]\d{9}$/;
    return isIndianNumber.test(num);
  };

  const handleLoginChange = () => {
    setShowLogin(!showLogin);
    setShowCreateAccount(!showCreateAccount);
  };

  const handlePhChange = (e) => {
    setShowOTP(false);
    // if (isMobilenumber(e.target.value)) setShowOTP(true);
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOtherLoginChanges = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePhChangeSingup = (e) => {
    setShowOTP(false);
    if (isMobilenumber(e.target.value)) setShowOTP(true);
    setCreateAccountData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOtherSignupChanges = (e) => {
    setCreateAccountData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const login = (
    <>
      <div className={showOTP && "otp"}>
        <Input
          title={"Enter Mobile Number / Email"}
          type={"text"}
          placeholder={"Enter Mobile Number / Email"}
          onChanged={handlePhChange}
          givenName={"emailMobile"}
        />
        {/* {showOTP && <Button text={"Send OTP"} />} */}
      </div>
      <Input
        title={"Enter Password"}
        type={"password"}
        placeholder={"Enter Password"}
        onChanged={handleOtherLoginChanges}
        givenName={"password"}
      />
    </>
  );

  const createAccount = (
    <>
      <Input
        title={"Full Name"}
        type={"text"}
        placeholder={"Full Name"}
        onChanged={handleOtherSignupChanges}
        givenName={"fullName"}
      />
      <Input
        title={"Mobile Number"}
        type={"number"}
        placeholder={"0000 0000 00"}
        onChanged={handlePhChangeSingup}
        givenName={"phoneNumber"}
      />
      {/* {showOTP && (
        <>
          <Button text={"Send OTP"} />
          <Input title={"Verify OTP"} type={"number"} />
        </>
      )} */}
      <Input
        title={"Email"}
        type={"email"}
        placeholder={"Email"}
        onChanged={handleOtherSignupChanges}
        givenName={"email"}
      />
      <Input
        title={"Password"}
        type={"password"}
        placeholder={"password"}
        onChanged={handleOtherSignupChanges}
        givenName={"password"}
      />
    </>
  );

  const handleSubmit = async () => {
    if (showLogin) {
      console.log(loginData);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/signin`,
          {
            emailMobile: loginData.emailMobile,
            password: loginData.password,
          }
        );
        if (response.status === 200) {
          const token = response.data.token;
          const loggedInUser = response.data.data;
          localStorage.setItem("token", token);
          localStorage.setItem("loggedInUser", loggedInUser);
          alert("Login Successfull");
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        alert("Something went wrong");
        console.error("Error registering user:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
          createAccountData
        );
        if (response.status === 200) {
          alert("Account created");
          setShowLogin(!showLogin);
          setShowCreateAccount(!showCreateAccount);
        } else if (response.status === 406) {
          console.log("User already exists");
        }
      } catch (error) {
        alert("Something went wrong");
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div className="Login">
      <div className="navbarlogin">
        <img className="logo" src={logoblack} alt="" />
      </div>
      <div className="loginContainer">
        <img className="img" src={image} alt="" />
        <hr />
        <div className="loginright">
          <div className="titles">
            <p>Welcome to YesGoBus</p>
            {/* <h1>Log In</h1> */}
            {showLogin ? (
              <>
              <h1>Log In</h1>
              <p>
                Dont have an account?
                <span style={{ cursor: "pointer" }} onClick={handleLoginChange}>
                  {" "}
                  Create an account
                </span>
              </p>
              </>
            ) : (
              <>
              <h1>Create an Account</h1>
              <p>
                Already have an account?
                <span style={{ cursor: "pointer" }} onClick={handleLoginChange}>
                  {" "}
                  Click to Login
                </span>
              </p>
              </>
            )}
          </div>
          {showLogin ? login : createAccount}
          {/* <div className="or">
            <hr />
            <p>Or</p>
            <hr />
          </div>

          <div className="links">
            <p>Continue with</p>
            <div className="linksContainer">
              <div className="link">
                <img src={google} alt="" />
                <span>Google</span>
              </div>
              <div className="link">
                <img src={facebook} alt="" />
                <span>Facebook</span>
              </div>
              <div className="link">
                <img src={linkedin} alt="" />
                <span>Linkedin</span>
              </div>
            </div>
          </div> */}

          <p>
            By Continuing, I agree to the <span>Terms of Use</span> &{" "}
            <span> Privacy Policy</span>
          </p>

          <Button text={"Continue"} onClicked={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
