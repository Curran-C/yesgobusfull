import React, { useState, useEffect, useRef } from "react";
import "./BusRouteCard.scss";
import { Spin } from "antd";

const BusRouteCard = ({ title, location, setLocation, date, suggestions, loading, setLocationQuery }) => {
  const [inputValue, setInputValue] = useState(location);

  useEffect(() => {
    setInputValue(location);
  }, [location]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const delay = 1000;

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setLocationQuery(newInputValue);
    setShowSuggestions(true);
  };

  const handleDateChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLocation(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

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
    <div className="BusRouteCard" ref={inputRef}>
      <p>{title}</p>
      {date ? (
        <input type="date" value={inputValue} onChange={handleDateChange} />
      ) : (
        <input
          type="search"
          value={inputValue}
          onInput={handleInputChange}
          onClick={handleInputClick}
        />
      )}
      {showSuggestions && (
        <ul className="suggestion-list">
          {loading ? (
            <li className="loading-spinner">
              <Spin size="small" />
            </li>
          ) : (
            suggestions
              .filter(({ city_name }) => !/\d/.test(city_name) && !city_name.includes(" "))
              .map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion.city_name)}
                >
                  {suggestion.city_name}
                </li>
              ))
          )}
        </ul>
      )}
    </div>
  );
};

export default BusRouteCard;
