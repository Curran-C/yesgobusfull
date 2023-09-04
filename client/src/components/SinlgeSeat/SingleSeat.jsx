import {
  available,
  booked,
  driver,
  ladiesavailable,
  ladiesbooked,
  selected,
} from "../../assets/busbooking";
import "./SingleSeat.scss";

function SingleSeat({ id, zIndex, fare, available: notBooked, ladiesSeat }) {
  return (
    <div className="single_seat">
      <img src={notBooked && available} alt="" />
    </div>
  );
}

export default SingleSeat;
