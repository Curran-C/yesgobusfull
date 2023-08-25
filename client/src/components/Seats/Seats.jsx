import { useState } from "react";
import {
  available,
  booked,
  driver,
  ladiesavailable,
  ladiesbooked,
  selected,
} from "../../assets/busbooking";
import PickUpAndDropPoints from "../PickUpAndDropPoints/PickUpAndDropPoints";
import SeatLegend from "../SeatLegend/SeatLegend";
import "./Seats.scss";

const Seats = ({
  pickUpTimes,
  pickUpLocationOne,
  pickUpLocationTwo,
  dropTimes,
  dropLocationOne,
  dropLocationTwo,
  noOfRows,
  noOfSeatsPerRow,
  backSeat,
}) => {
  // * variables

  let rows = [];
  let seatsPerRow = [];
  let count = 1;

  //* states
  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState(null);
  //*loops
  for (let i = 1; i <= noOfRows; i++) {
    rows.push(i);
  }
  for (let i = 1; i <= noOfSeatsPerRow; i++) {
    seatsPerRow.push(i);
  }
  return (
    <div className="seats">
      <div className="seatsLeft">
        <h5>Select Pickup and Drop Points</h5>
        <div className="seatsLeftContainer">
          <span className="title">PICKUP POINT</span>
          {pickUpTimes?.map((pickUpTime, index) => (
            <>
              <PickUpAndDropPoints
                time={pickUpTime}
                locationOne={pickUpLocationOne[index]}
                locationTwo={pickUpLocationTwo[index]}
              />
              <hr />
            </>
          ))}
        </div>

        <div className="seatsLeftContainer">
          <span className="title">DROP POINT</span>
          {dropTimes?.map((dropTime, index) => (
            <>
              <PickUpAndDropPoints
                time={dropTime}
                locationOne={dropLocationOne[index]}
                locationTwo={dropLocationTwo[index]}
              />
              <hr />
            </>
          ))}
        </div>
      </div>

      <div className="seatsRight">
        <h5>Selected Seats</h5>
        <div className="legend">
          <SeatLegend title={"Booked"} img={booked} />
          <SeatLegend title={"Available"} img={available} />
          <SeatLegend title={"Selected"} img={selected} />
          <SeatLegend
            title={"Ladies"}
            subtitle={"(Available)"}
            img={ladiesavailable}
          />
          <SeatLegend
            title={"Ladies"}
            subtitle={"(Booked)"}
            img={ladiesbooked}
          />
        </div>
        <div className="filters">
          <p className="filter">All</p>
          <p className="filter">₹700</p>
          <p className="filter">₹800</p>
        </div>
        <div className="bus">
          <div className="driver">
            <img src={driver} alt="driver" />
          </div>
          <div className="seatsContainer">
            <div className="seatsOne">
              {rows?.map((row, index) => {
                if (index < 2)
                  return (
                    <div className="row">
                      {seatsPerRow?.map((seat, index) => (
                        <img
                          onClick={() => setSelectedImageOne(index)}
                          src={
                            selectedImageOne === index ? selected : available
                          }
                          alt=""
                        />
                      ))}
                    </div>
                  );
              })}
            </div>
            <div className="seatsTwo">
              {rows?.map((row, rowindex) => {
                if (rowindex >= 2)
                  return (
                    <div className="row">
                      {seatsPerRow?.map((seat, index) => (
                        <img
                          onClick={() => setSelectedImageTwo(index)}
                          src={
                            selectedImageTwo === index ? selected : available
                          }
                          alt=""
                        />
                      ))}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
