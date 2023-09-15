import "./Amount.scss";

const KycAmount = ({ text, amt }) => {
  return (
    <div className="amount">
      <p>{text}</p>
      <p>{amt}</p>
    </div>
  );
};

export default KycAmount;
