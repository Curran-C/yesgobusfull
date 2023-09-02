import {
  facebook,
  google,
  image,
  linkedin,
  logoblack,
} from "../../assets/login";
import "./Login.scss";
import { Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // functions
  const isMobilenumber = (num) => {
    let pattern = /^[6789]\d{9}$/;
    return pattern.test(num);
  };

  const handleLoginChange = () => {
    setShowLogin(!showLogin);
    setShowCreateAccount(!showCreateAccount);
  };

  const handlePhChange = (e) => {
    setShowOTP(false);
    if (isMobilenumber(e.target.value)) setShowOTP(true);
  };

  const login = (
    <>
      <div className={showOTP && "otp"}>
        <Input
          title={"Enter Mobile Number / Email"}
          type={"text"}
          placeholder={"Enter Mobile Number / Email"}
          onChanged={handlePhChange}
        />
        {showOTP && <Button text={"Send OTP"} />}
      </div>
      <Input
        title={"Enter Password / OTP"}
        type={"password"}
        placeholder={"Enter Password / OTP"}
      />
    </>
  );

  const createAccount = (
    <>
      <Input title={"Full Name"} type={"text"} placeholder={"Full Name"} />
      <div className={showOTP && "otp2"}>
        <Input
          title={"Mobile Number"}
          type={"number"}
          placeholder={"+91 0000 0000 00"}
          onChanged={handlePhChange}
        />
        {showOTP && (
          <>
            <Button text={"Send OTP"} />
            <Input title={"Verify OTP"} type={"number"} />
          </>
        )}
      </div>
      <Input title={"Password"} type={"password"} placeholder={"password"} />
      <Input title={"Confim Password"} type={"text"} placeholder={"password"} />
    </>
  );

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
            <h1>Log In</h1>
            {showLogin ? (
              <p>
                Dont have an account?
                <span style={{ cursor: "pointer" }} onClick={handleLoginChange}>
                  {" "}
                  Create an account
                </span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span style={{ cursor: "pointer" }} onClick={handleLoginChange}>
                  {" "}
                  Click to Login
                </span>
              </p>
            )}
          </div>
          {showLogin ? login : createAccount}
          <div className="or">
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
          </div>

          <p>
            By Continuing, I agree to the <span>Terms of Use</span> &{" "}
            <span> Privacy Policy</span>
          </p>

          <Button text={"Continue"} onClicked={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
