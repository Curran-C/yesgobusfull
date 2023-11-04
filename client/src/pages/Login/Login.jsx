import {
  facebook,
  google,
  image,
  // linkedin,
  logoblack,
} from "../../assets/login";
import "./Login.scss";
import { Button, Input } from "../../components";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { facebookLoginAPI, googleLoginAPI } from "../../api/authentication";
import { LoginSocialFacebook } from "reactjs-social-login";
import toast, { Toaster } from 'react-hot-toast';

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
  const [loading, setLoading] = useState(false);

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
      <div className={showOTP ? "otp" : ""}>
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
      setLoading(true);
      const loadingToast = toast.loading('Logging in...');
      try {
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/signin`,
          {
            emailMobile: loginData.emailMobile,
            password: loginData.password,
          }
        );
        if (response.status === 200) {
          toast.dismiss(loadingToast);
          const token = response.data.token;
          const loggedInUser = response.data.data;
          localStorage.setItem("token", token);
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          toast.success('Login Successful', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: 'green',
              color: 'white',
            },
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error('Invalid credentials', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: 'red',
              color: 'white',
            },
          });
        }
      } catch (error) {
        toast.error('Invalid credentials', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        console.error("Error logining user:", error);
      } finally {
        setLoading(false);
        toast.dismiss(loadingToast);

      }
    } else {
      try {
        setLoading(true);
        const loadingToast = toast.loading('Creating account...');
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
          createAccountData
        );
        if (response.status === 200) {
          toast.dismiss(loadingToast);
          toast.success('Account Created', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: 'green',
              color: 'white',
            },
          });
          setShowLogin(!showLogin);
          setShowCreateAccount(!showCreateAccount);
        } else if (response.status === 406) {
          toast.dismiss(loadingToast);
          toast.error('User already exists', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: 'red',
              color: 'white',
            },
          });
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error('Error', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        console.error("Error registering user:", error);
      } finally {
        toast.dismiss(loadingToast);
        setLoading(false);
      }
    }
  };

  // Google Login //
  useEffect(() => {
    if (window.google && window.google.accounts) {
      const googleAccounts = window.google.accounts;
      googleAccounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
        callback: googleUserVerifyHandler,
      });

      googleAccounts.id.renderButton(document.getElementById("googlesignin"), {
        // theme: "filled_blue",
        // shape: "circle",
        ux_mode: "popup",
        // text: "continue_with",
        size: "large",
      });
    } else {
      console.error("Google Accounts API is not available.");
    }

    // // Facebook login
    // // Initialize the Facebook SDK when it's loaded
    // window.fbAsyncInit = function () {
    //   FB.init({
    //     appId: import.meta.env.VITE_FACEBOOK_APP_ID,
    //     cookie: true,
    //     xfbml: true,
    //     version: "v18.0",
    //   });
    //   FB.AppEvents.logPageView();
    // };

    // // Load the Facebook SDK asynchronously
    // (function (d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, "script", "facebook-jssdk");

    // if (window.FB) {
    //   window.FB.XFBML.parse();
    // }
  }, []);

  // // Facebook login callback
  // const facebookLoginHandler = async () => {
  //   console.log("facebook login handler");
  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       FB.login(
  //         function (loginResponse) {
  //           if (loginResponse.status === "connected") {
  //             resolve(loginResponse.authResponse);
  //           } else {
  //             reject("Facebook login failed");
  //           }
  //         },
  //         { scope: "public_profile,email" }
  //       );
  //     });

  //     console.log("Facebook login successful:", response?.accessToken);
  //     const { data, token } = await googleLoginAPI(response?.accessToken);
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("loggedInUser", JSON.stringify(data));
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Facebook login error:", error);
  //   }
  // };

  const googleUserVerifyHandler = async ({ credential }) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Logging in...');
      const { data, token } = await googleLoginAPI(credential);
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      toast.dismiss(loadingToast);

      toast.success('Login Successful', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'green',
          color: 'white',
        },
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error('Error', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'red',
          color: 'white',
        },
      });
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const facebookLoginHanler = async (fbResponse) => {
    try {
      const { data, token } = await facebookLoginAPI(fbResponse);
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      toast.success('Login Successful', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'green',
          color: 'white',
        },
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log("Error login in using facebook: ", error);
      toast.error('Error', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'red',
          color: 'white',
        },
      });
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
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleLoginChange}
                  >
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
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleLoginChange}
                  >
                    {" "}
                    Click to Login
                  </span>
                </p>
              </>
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
              <div id="googlesignin" className="link"></div>
              <LoginSocialFacebook
                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                onReject={(error) => console.log(error)}
                onResolve={facebookLoginHanler}
              >
                <div className="link">
                  <img src={facebook} alt="" />
                  <span>Facebook</span>
                </div>
              </LoginSocialFacebook>
              {/* <div className="link">
                <div
                  className="fb-login-button"
                  data-size="medium"
                  data-button-type="continue_with"
                  data-layout="default"
                  data-auto-logout-link="false"
                  data-use-continue-as="true"
                  data-width=""
                  data-scope="public_profile,email"
                  onClick={facebookLoginHandler}
                />
              </div> */}
              {/* 
              <div className="link">
                <img src={google} alt="" id="googlesignin" />
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
              */}
            </div>
          </div>

          <p>
            By Continuing, I agree to the <span>Terms of Use</span> &{" "}
            <span> Privacy Policy</span>
          </p>

          <Button text={"Continue"} onClicked={handleSubmit} disable={loading} />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
