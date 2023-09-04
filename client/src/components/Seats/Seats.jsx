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
import SingleSeat from "../SinlgeSeat/SingleSeat";

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
  // noOfRows,
  noOfSeatsPerRow,
  backSeat,
  travelTime,
  reachTime,
  pickUpTime,
  busType,
  busName,
  price,
}) => {
  //* states
  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const naviagate = useNavigate();
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("");

  ///////////////////////

  const [seatDetails, setSeatDetails] = useState([]);
  const [seatArrangement, setSeatArrangement] = useState([0, 0]);
  const [noOfColumns, setNoOfColumns] = useState(0);
  const [currentBerth, setCurrentBerth] = useState(0);
  const [totalBerthCount, setTotalBerthCount] = useState(1);

  console.log(seatDetails);

  // console.log(seatArrangement, noOfColumns);
  // console.log(totalBerthCount);
  // console.log(backSeat);

  ///////////////////////

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
        // const seatData = response.data.seats; =======> change zIndex
        const seatData = response.data.seats.filter(({ zIndex }) => !zIndex);
        setSeatDetails(seatData);
        const plusIdx = busType.indexOf("+");
        setSeatArrangement([+busType[plusIdx - 1], +busType[plusIdx + 1]]);
        setTotalBerthCount(
          1 + Math.max(...seatData.map(({ zIndex }) => zIndex))
        );
        setNoOfColumns(Math.max(...seatData.map(({ column }) => column)));
      } catch (error) {
        alert("Something went wrong");
        console.error("Something went wrong:", error);
      }
    };
    getSeats();
  }, []);

  return (
    <div className="seats">
      <div className="seatsLeft">
        <h5>Select Pickup and Drop Points</h5>
        <div className="seatsLeftContainer">
          <span className="title">PICKUP POINT</span>
          {pickUpLocationOne?.map((boardingPoint) => (
            <>
              <PickUpAndDropPoints
                key={boardingPoint.id}
                time={boardingPoint.time}
                locationOne={boardingPoint.location}
                // locationTwo={boardingPoint.location}
                highlight={selectedBoardingPoint === boardingPoint.id}
                onClick={() => setSelectedBoardingPoint(boardingPoint.id)}
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
                highlight={selectedDroppingPoint === droppingPoint.id}
                key={droppingPoint.id}
                time={droppingPoint.time}
                locationOne={droppingPoint.location}
                // locationTwo={droppingPoint.location}
                onClick={() => setSelectedDroppingPoint(droppingPoint.id)}
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

        <div className="birthSelector">
          <label htmlFor="currentBerth">Choose Berth : </label>
          <select name="currentBerth" id="currentBerth">
            {Array(totalBerthCount)
              .fill(null)
              .map((_, index) => (
                <option value={index}>{`${index + 1} berth`}</option>
              ))}
          </select>
        </div>

        <div className="bus">
          <div className="driver">
            <img src={driver} alt="driver" />
          </div>
          <div className="seatsContainer">
            <div className="seatsOne">
              {Array(seatArrangement[0])
                .fill(null)
                .map((seat, index) => (
                  <div className="row">
                    {Array(noOfColumns)
                      .fill(null)
                      .map(() => (
                        <SingleSeat available />
                      ))}
                  </div>
                ))}
            </div>
            <div className="seatsTwo">
              {Array(seatArrangement[1])
                .fill(null)
                .map((seat, index) => (
                  <div className="row">
                    {Array(noOfColumns)
                      .fill(null)
                      .map(() => (
                        <SingleSeat available />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="continue">
          <Button
            onClicked={() =>
              naviagate(
                `/busbooking/payment?sourceCity=${sourceCity}&destinationCity=${destinationCity}&routeScheduleId=${routeScheduleId}&inventoryType=${inventoryType},&doj=${doj}&pickUpTime=${pickUpTime}&reachTime=${pickUpTime}&travelTime=${travelTime}&busType=${busType}&busName=${busName}&price=${price}`
              )
            }
            text={"Continue"}
          />
        </div>

        <div className="price">
          <div className="selectedSeat">
            <span>Selected Seat(s):</span>
            <p>E 05</p>
          </div>
          <p>₹800</p>
        </div>
      </div>
    </div>
  );
};

export default Seats;
