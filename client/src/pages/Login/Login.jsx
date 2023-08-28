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

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <div className="images">
        <img className="logo" src={logoblack} alt="" />
        <img className="img" src={image} alt="" />
      </div>
      <hr />
      <div className="loginright">
        <div className="titles">
          <p>Welcome to YesGoBus</p>
          <h1>Log In</h1>
          <p>
            Dont have an account? <span>Create an account</span>
          </p>
        </div>

        <Input
          title={"Enter Mobile Number / Email"}
          type={"text"}
          placeholder={"Enter Mobile Number / Email"}
        />
        <Input
          title={"Enter Password / OTP"}
          type={"password"}
          placeholder={"Enter Password / OTP"}
        />

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
  );
};

export default Login;
