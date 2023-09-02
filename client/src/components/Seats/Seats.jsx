import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Button from "../Button/Button";
import axios from "axios";

const Seats = ({
  routeScheduleId,
  inventoryType,
  sourceCity,
  destinationCity,
  doj,
  pickUpTimes,
  pickUpLocationOne,
  pickUpLocationTwo,
  dropTimes,
  dropLocationOne,
  dropLocationTwo,
  noOfRows,
  noOfSeatsPerRow,
  backSeat,
  travelTime,
  reachTime,
  pickUpTime,
  busType,
  busName,
  price
}) => {
  // * variables
  let rows = [];
  let seatsPerRow = [];
  let count = 1;
  console.log(routeScheduleId, inventoryType, sourceCity, destinationCity, doj);
  //* states
  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState(null);
  const naviagate = useNavigate();
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("");
  //*loops
  for (let i = 1; i <= noOfRows; i++) {
    rows.push(i);
  }
  for (let i = 1; i <= noOfSeatsPerRow; i++) {
    seatsPerRow.push(i);
  }

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout`,
          {
            sourceCity: sourceCity,
            destinationCity: destinationCity,
            doj: doj,
            inventoryType: inventoryType,
            routeScheduleId: routeScheduleId,
          }
        );
        console.log("Seat Details:",response.data.seats);
      } catch (error) {
        alert("Something went wrong");
        console.error("omething went wrong:", error);
      }
    }
    getSeats();
  }, []);


  return (
    <div className="seats">
      <div className="seatsLeft">
        <h5>Select Pickup and Drop Points</h5>
        <div className="seatsLeftContainer">
          <span className="title">PICKUP POINT</span>
          {pickUpLocationOne?.map((boardingPoint, index) => (
            <>
              <PickUpAndDropPoints
                key={boardingPoint.id}
                time={boardingPoint.time}
                locationOne={boardingPoint.location}
              // locationTwo={boardingPoint.location}
                // onClick={setSelectedBoardingPoint(boardingPoint)}
              />
              <hr />
            </>
          ))}
        </div>

        <div className="seatsLeftContainer">
          <span className="title">DROP POINT</span>
          {dropLocationOne?.map((droppingPoint, index) => (
            <>
              <PickUpAndDropPoints
                key={droppingPoint.id}
                time={droppingPoint.time}
                locationOne={droppingPoint.location}
              // locationTwo={droppingPoint.location}
              // onClick={setSelectedDroppingPoint(droppingPoint.location)}
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

        <div className="continue">
          <Button 
            onClicked={() => naviagate(`/busbooking/payment?sourceCity=${sourceCity}&destinationCity=${destinationCity}&routeScheduleId=${routeScheduleId}&inventoryType=${inventoryType},&doj=${doj}&pickUpTime=${pickUpTime}&reachTime=${pickUpTime}&travelTime=${travelTime}&busType=${busType}&busName=${busName}&price=${price}`)}
            text={"Continue"}
          />
        </div>

        <div className="price">
          <div className="selectedSeat">
            <span>Selected Seat:</span>
            <p>E 05</p>
          </div>
          <p>₹800</p>
        </div>
      </div>
    </div>
  );
};

export default Seats;
