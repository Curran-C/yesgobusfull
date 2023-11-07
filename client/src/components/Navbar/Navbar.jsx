import React, { useState, useEffect } from "react";
import { blackhamburger, hamburger, logo } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.scss";
import { blacklogo } from "../../assets/homepage";
import UserIcon from "../SvgIcons/UserIcon";

const Navbar = ({ page }) => {

  let translateElement;

  const googleTranslateElementInit = () => {
    translateElement = new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,kn',
        layout: window.google.translate.TranslateElement.InlineLayout.TOP_RIGHT,
      },
      "google_translate_element"
    );

    // google.elements.transliteration.LanguageDetect.events.listen(translateElement, 'pageTranslated', (e) => {
    //   const detectedLanguage = e.detectedLanguage.toLowerCase();
    //   if (detectedLanguage !== 'en') {
    //     translateElement.showInvisible();
    //     translateElement.selectLanguage('en');
    //   }
    // });
  };

  function changeLanguage(languageCode) {
    translateElement.showInvisible();
    translateElement.selectLanguage(languageCode);
  }

  useEffect(() => {
    const translateElement = document.getElementById("google_translate_element");
    if (translateElement) {
      translateElement.innerHTML = "";
    }
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);


  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const menu = (
    <div className="burger-menu">
      <a href="/">
        <span>Home</span>
      </a>
      <a href="/busbooking">
        <span>Bus</span>
      </a>
      <a href="/cabs">
        <span>Cabs</span>
      </a>
      <a href="/contactus">
        <span>Contact Us</span>
      </a>
    </div>
  );

  return (
    <nav className="navbar burger">
      <div className="left">
        {page === "home" ? (
          <img
            className="logo"
            onClick={() => navigate("/")}
            src={logo}
            width={50}
            height={50}
            alt=""
          />
        ) : (
          <img
            className="blacklogo"
            onClick={() => navigate("/")}
            src={blacklogo}
            width={50}
            alt=""
          />
        )}
        <a href="/busbooking">
          <span>Bus</span>
        </a>
        <a href="/cabs">
          <span>Cabs</span>
        </a>
        <a href="/contactus">
          <span>Contact Us</span>
        </a>
      </div>

      <div className="right">
        {loggedInUser ? (
          <Link to={`/profile`} className="user">
            <span className="user-icon">
              <UserIcon />
            </span>
            {JSON.parse(loggedInUser).fullName}
          </Link>
        ) : (
          <a href="/login">
            <Button text="Login / Signup" />
          </a>
        )}
        {/* <div id="google_translate_element"></div> */}
      </div>
      <div id="google_translate_element"></div>
      {page === "home" ? (
        <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={hamburger}
          alt=""
        />
      ) : (
        <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={blackhamburger}
          alt=""
        />
      )}
      {showMenu && menu}
    </nav>
  );
};

export default Navbar;
