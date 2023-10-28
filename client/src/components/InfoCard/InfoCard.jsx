/* eslint-disable react/prop-types */
import "./InfoCard.scss";
import React, { useState, useEffect, useRef } from "react";

const InfoCard = ({
  img,
  title,
  date,
  inputField,
  subtitle,
  onChanged,
  suggestions,
  placeholder,
  label,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const infoCardRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChanged(inputValue);
    if (inputValue) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    onChanged(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    onChanged(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!infoCardRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="infoCard" ref={infoCardRef}>
      {label && <h4 className="label">{label}</h4>}
      {img && <img src={img} alt="" />}
      <h1 className="infotitle">
        {inputField ? (
          date ? (
            <input
              type="date"
              className="date"
              value={title}
              onChange={handleDateChange}
            />
          ) : (
            <input
              type="search"
              value={title}
              onInput={handleInputChange}
              onClick={handleInputClick}
              placeholder={placeholder}
            />
          )
        ) : (
          title
        )}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions
              .filter(
                ({ city_name }) =>
                  !/\d/.test(city_name) && !city_name.includes(" ")
              )
              .map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion.city_name)}
                >
                  {suggestion.city_name}
                </li>
              ))}
          </ul>
        )}
      </h1>
      {/* <p className="infosubtitle">{subtitle}</p> */}
    </div>
  );
};

export default InfoCard;
