import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  available,
  booked,
  driver,
  ladiesavailable,
  ladiesbooked,
  selected,
  selectedFill,
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
  // pickUpTimes,
  pickUpLocationOne,
  // pickUpLocationTwo,
  // dropTimes,
  dropLocationOne,
  backSeat,
  travelTime,
  reachTime,
  pickUpTime,
  busType,
  busName,
  price,
  seatDetails,
  cancellationPolicy,
}) => {
  //* states
  const navigate = useNavigate();
  // const [boardingPoints, setBoardingPoint] = useState([]);
  // const [droppingPoints, setDroppingPoint] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    boardingPoint: {
      id: "",
      location: "",
      time: "",
    },
    droppingPoint: {
      id: "",
      location: "",
      time: "",
    },
    selectedSeats: [],
    seatFares: [],
    seatTotalFares: [],
    ladiesSeat: [],
    ac: [],
    sleeper: [],
    fare: 0,
    tax: 0,
    totalFare: 0,
  });

  // seat select handler
  const seatSelectionHandler = (
    seatId,
    fare,
    tax,
    totalFare,
    isLadiesSeat,
    isAC,
    isSleeper
  ) => {
    return setBookingDetails((prev) => {
      let newSelected = [...prev.selectedSeats];
      let newFare = prev.fare;
      let newTax = prev.tax;
      let newTotalFare = prev.totalFare;
      let newSeatFares = [...prev.seatFares];
      let newSeatTotalFares = [...prev.seatTotalFares];
      let newLadiesSeat = [...prev.ladiesSeat];
      let newAC = [...prev.ac];
      let newSleeper = [...prev.sleeper];

      const seatIndex = newSelected.indexOf(seatId);

      if (seatIndex === -1) {
        if (newSelected.length < 5) {
          newSelected.push(seatId);
          newFare += fare;
          newTax += tax;
          newTotalFare += totalFare;
          newSeatFares.push(fare);
          newSeatTotalFares.push(totalFare);
          newAC.push(isAC);
          newSleeper.push(isSleeper);
          newLadiesSeat.push(isLadiesSeat);
        } else {
          alert("Maximum 5 seats are allowed.");
        }
      } else {
        newSelected.splice(seatIndex, 1);
        newFare -= fare;
        newTax -= tax;
        newTotalFare -= totalFare;
        newSeatFares.splice(seatIndex, 1);
        newSeatTotalFares.splice(seatIndex, 1);
        newAC.splice(seatIndex, 1);
        newSleeper.splice(seatIndex, 1);
        newLadiesSeat.splice(seatIndex, 1);
      }

      return {
        ...prev,
        selectedSeats: newSelected,
        fare: newFare,
        tax: newTax,
        totalFare: newTotalFare,
        seatFares: newSeatFares,
        seatTotalFares: newSeatTotalFares,
        ac: newAC,
        sleeper: newSleeper,
        ladiesSeat: newLadiesSeat,
      };
    });
  };


  const lowerTierSeats = seatDetails.filter((seat) => seat.zIndex === 0);
  const upperTierSeats = seatDetails.filter((seat) => seat.zIndex === 1);

  const renderSeatTable = (seats, selectedSeats) => {
    const numRows = Math.max(...seats?.map((seat) => seat.row)) + 1;
    const numCols = Math.max(...seats?.map((seat) => seat.column)) + 1;

    const seatTable = [];

    for (let row = 0; row < numRows; row++) {
      const seatRow = [];

      for (let col = 0; col < numCols; col++) {
        const seat = seats.find((s) => s.row === row && s.column === col);

        if (seat) {
          if (seat.available) {
            if (selectedSeats.includes(seat.id)) {
              seatRow.push(
                <td key={seat.id}>
                  <img
                    onClick={() =>
                      seatSelectionHandler(
                        seat.id,
                        seat.fare,
                        seat.serviceTaxAmount,
                        seat.totalFareWithTaxes,
                        seat.ladiesSeat,
                        seat.ac,
                        seat.sleeper
                      )
                    }
                    title={`ID: ${seat.id}\nFare: ₹${seat.fare}`}
                    src={selectedFill}
                    alt="selected seat"
                  />
                </td>
              );
            } else {
              if (seat.ladiesSeat) {
                seatRow.push(
                  <td key={seat.id}>
                    <img
                      onClick={() =>
                        seatSelectionHandler(
                          seat.id,
                          seat.fare,
                          seat.serviceTaxAmount,
                          seat.totalFareWithTaxes,
                          seat.ladiesSeat,
                          seat.ac,
                          seat.sleeper
                        )
                      }
                      title={`ID: ${seat.id}\nFare: ₹${seat.fare}`}
                      src={ladiesavailable}
                      alt="available ladies"
                    />
                  </td>
                );
              } else {
                seatRow.push(
                  <td key={seat.id}>
                    <img
                      onClick={() =>
                        seatSelectionHandler(
                          seat.id,
                          seat.fare,
                          seat.serviceTaxAmount,
                          seat.totalFareWithTaxes,
                          seat.ladiesSeat,
                          seat.ac,
                          seat.sleeper
                        )
                      }
                      title={`ID: ${seat.id}\nFare: ₹${seat.fare}`}
                      src={available}
                      alt="available"
                    />
                  </td>
                );
              }
            }
          } else {
            if (seat.ladiesSeat) {
              seatRow.push(
                <td key={seat.id}>
                  <img
                    title={`ID: ${seat.id}\nFare: ₹${seat.fare}`}
                    src={ladiesbooked}
                    alt="ladiesbooked"
                  />
                </td>
              );
            } else {
              seatRow.push(
                <td key={seat.id}>
                  <img
                    title={`ID: ${seat.id}\nFare: ₹${seat.fare}`}
                    src={booked}
                    alt="booked"
                  />
                </td>
              );
            }
          }
        } else {
          seatRow.push(<td key={`empty-${row}-${col}`}></td>);
        }
      }

      seatTable.push(<tr key={`row-${row}`}>{seatRow}</tr>);
    }

    return (
      <table>
        <tbody>{seatTable}</tbody>
      </table>
    );
  };

  // useEffect(() => {
  //   const getSeats = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout`,
  //         {
  //           sourceCity: sourceCity,
  //           destinationCity: destinationCity,
  //           doj: doj,
  //           inventoryType: inventoryType,
  //           routeScheduleId: routeScheduleId,
  //         }
  //       );
  //       setBoardingPoint(response.data.boardingPoints);
  //       setDroppingPoint(response.data.droppingPoints);
  //     } catch (error) {
  //       alert("Something went wrong");
  //       console.error("Something went wrong:", error);
  //     }
  //   };
  //   getSeats();
  // }, []);


  const handleContinue = () => {

    if (
      bookingDetails.boardingPoint.id &&
      bookingDetails.droppingPoint &&
      bookingDetails.selectedSeats.length !== 0
    ) {
      navigate("/busbooking/payment", {
        state: {
          sourceCity,
          destinationCity,
          routeScheduleId,
          inventoryType,
          doj,
          pickUpTime,
          reachTime,
          travelTime,
          busType,
          busName,
          bookingDetails,
          cancellationPolicy,
        },
      });
    } else {
      alert("Please select seats, boarding and droping points");
    }
  }

  return (
    <div className="seats">
      <div className="seatsLeft">
        <h5>Select Pickup and Drop Points</h5>
        <div className="seatsLeftContainer">
          <span className="title">PICKUP POINT</span>
          {pickUpLocationOne?.map((boardingPoint, index) => (
            <PickUpAndDropPoints
              key={boardingPoint.id}
              time={boardingPoint.time}
              locationOne={boardingPoint.location}
              highlight={bookingDetails.boardingPoint.id === boardingPoint.id}
              onClick={() =>
                setBookingDetails((prev) => {
                  return {
                    ...prev,
                    boardingPoint,
                  };
                })
              }
            />
          ))}
        </div>

        <div className="seatsLeftContainer">
          <span className="title">DROP POINT</span>
          {dropLocationOne?.map((droppingPoint, index) => (
            <PickUpAndDropPoints
              highlight={bookingDetails.droppingPoint.id === droppingPoint.id}
              key={droppingPoint.id}
              time={droppingPoint.time}
              locationOne={droppingPoint.location}
              // locationTwo={droppingPoint.location}
              onClick={() =>
                setBookingDetails((prev) => {
                  return {
                    ...prev,
                    droppingPoint,
                  };
                })
              }
            />
          ))}
        </div>
      </div>

      <div className="seatsRight">
        <h5>Selected Seats</h5>
        <div className="legend">
          <SeatLegend title={"Booked"} img={booked} />
          <SeatLegend title={"Available"} img={available} />
          <SeatLegend title={"Selected"} img={selectedFill} />
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

          <div className="gridContainer">
            {upperTierSeats.length > 0 && <h4>Lower Tier</h4>}
            {renderSeatTable(lowerTierSeats, bookingDetails.selectedSeats)}

            {upperTierSeats.length > 0 && (
              <>
                <h4>Upper Tier</h4>
                {renderSeatTable(upperTierSeats, bookingDetails.selectedSeats)}
              </>
            )}
          </div>
        </div>

        <div className="continue">
          <Button
            onClicked={() => handleContinue()}
            text={"Continue"}
          />
        </div>

        <div className="price">
          <div className="selectedSeat">
            <span>Selected Seat(s):</span>
            <p>{bookingDetails.selectedSeats.join(", ") || "None Selected"}</p>
          </div>
          <p>₹ {bookingDetails.fare}</p>
        </div>
      </div>
    </div>
  );
};

export default Seats;
