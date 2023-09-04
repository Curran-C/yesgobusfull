import React, { useState, useEffect, useRef } from "react";
import "./BusRouteCard.scss";

const BusRouteCard = ({ title, location, setLocation, date, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    if (inputValue) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!inputRef.current.contains(e.target)) {
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
    <div className="BusRouteCard" ref={inputRef}>
      <p>{title}</p>
      <input
        type={date ? "date" : "text"}
        value={location}
        onChange={handleInputChange}
        onClick={handleInputClick} // Show suggestions when input is clicked
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion.city_name)}
            >
              {suggestion.city_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusRouteCard;
