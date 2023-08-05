/* eslint-disable react/prop-types */
import "./Title.scss";

const Title = ({ title, subtitle }) => {
  return (
    <div className="titleContainer">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Title;
