import "./LeftFilter.scss";
import LeftFilterBox from "../LeftFilterBox/LeftFilterBox";

const LeftFilter = () => {
  return (
    <div className="leftFilter">
      <h4>Filter</h4>
      <div className="filters">
        <LeftFilterBox
          title={"Price Drop"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Deals & Offers"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Free Cancellation"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Safety Feature"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Boarding Points"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Drop Points"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Bus Partner"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
      </div>
    </div>
  );
};

export default LeftFilter;
