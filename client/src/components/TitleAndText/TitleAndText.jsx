import "./TitleAndText.scss";
import Title from "../Title/Title";

const TitleAndText = ({ title, textOne, textTwo, seen }) => {
  return (
    <div className="TitleAndText">
      <Title title={title} />
      <div className="texts">
        <span className="text">{textOne}</span>
        <div className={`unseen ${seen}`}>
          <p>
            You will find below various types of buses available to book bus
            tickets on AbhiBus at lowest fare bus ticket booking:
          </p>
          <div className="lists">
            <ul>
              <li>AC Buses</li>
              <li>Non AC Buses</li>
              <li>Ordinary Buses</li>
              <li>Mini Buses</li>
              <li>Super Luxury (Non-AC Seater)</li>
            </ul>
            <ul>
              <li>Volvo AC Buses</li>
              <li>Sleeper AC Buses</li>
              <li>Sleeper Buses</li>
              <li>Delux Buses</li>
              <li>Sleeper Cum Seater (AC)</li>
            </ul>
            <ul>
              <li>Double Decker Buses</li>
              <li>Mercedes Buses</li>
              <li>Non-Mercedes Buses</li>
              <li>Electic Buses</li>
              <li>Express Buses</li>
            </ul>
          </div>
        </div>
        <span className="text">{textTwo}</span>
      </div>
    </div>
  );
};

export default TitleAndText;
