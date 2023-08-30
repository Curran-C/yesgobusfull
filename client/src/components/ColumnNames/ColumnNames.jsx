import "./ColumnNames.scss";

const ColumnNames = ({ noOfBuses }) => {
  return (
    <div className="ColumnNames">
      <span>
        Showing <b>{noOfBuses} Buses</b>
      </span>
      <div className="tableTitles">
        <p>BUS OPERATOR</p>
        <div>
          <p>DEPARTURE</p>
          <p>DURATION</p>
          <p>ARRIVAL</p>
          <p>PRICE</p>
        </div>
      </div>
    </div>
  );
};

export default ColumnNames;
