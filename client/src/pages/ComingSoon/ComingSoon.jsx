import { Button, Footer, Navbar } from "../../components";
import "./ComingSoon.scss";
import comingSoonImg from "../../assets/comingSoon/comingSoon.png";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useEffect, useState } from "react";

function ComingSoon() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const redirectToCabDriverLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/cabs/kyc");
    }, 1000);
  }
  return (
    <section className="coming_soon">
      <Navbar />
      <div className="heroImg">
        <img src={comingSoonImg} alt="coming soon" />
      </div>
      <div className="buttons">
        <div className="button-container">
          <Button text={"Be a Cab Driver"} onClicked={redirectToCabDriverLogin} />
        </div>
      </div>

      {/* <h6>Site under construction</h6> */}
      {/* <div className="subscribe">
        <span className="input_container">
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter you email here"
          />
          <Button text={"Subscribe"} />
        </span>
      </div> */}
      <Footer />
      {isLoading && (
        <div className="loading-screen">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
    </section>
  );
}

export default ComingSoon;
