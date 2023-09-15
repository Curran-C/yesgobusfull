import "./Amount.scss";

const Amount = ({ text, amt }) => {
  return (
    <div className="amount">
      <p>{text}</p>
      <p>{amt}</p>
    </div>
  );
};

export default Amount;
