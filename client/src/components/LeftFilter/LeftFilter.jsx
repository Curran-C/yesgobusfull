import "./LeftFilter.scss";
import LeftFilterBox from "../LeftFilterBox/LeftFilterBox";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { cityMapping } from "../../utils/cityMapping";
import { map } from "../../assets/homepage";

const LeftFilter = ({ sourceCity, destinationCity, doj, onFilterChange }) => {
  const [range, setRange] = useState([100, 3000]);
  const [filters, setFilters] = useState([]);
  const [boardingPointsFilter, setBoardingPointsFilter] = useState([]);
  const [droppingPointsFilter, setDroppingPointsFilter] = useState([]);
  const [busPartnerFilter, setBusPartnerFilter] = useState([]);
  const [selectedBoardingPoints, setSelectedBoardingPoints] = useState([]);
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState([]);

  const handleSliderChangeCommitted = (event, newRange) => {
    setRange(newRange);
    onFilterChange({
      boardingPoints: boardingPointsFilter,
      droppingPoints: droppingPointsFilter,
      busPartners: busPartnerFilter,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    });
  };

  useEffect(() => {
    const getFilters = async () => {

      if (sourceCity.trim().toLowerCase() in cityMapping) {
        const mapping = cityMapping[sourceCity.trim().toLowerCase()];
        sourceCity = mapping.sourceCity;
        setSelectedBoardingPoints(mapping.boardingPoints);
      }
      if (destinationCity.trim().toLowerCase() in cityMapping) {
        const mapping = cityMapping[destinationCity.trim().toLowerCase()];
        destinationCity = mapping.sourceCity;
        setSelectedDroppingPoints(mapping.boardingPoints);
      }

      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/getFilters`,
          {
            params: {
              sourceCity: sourceCity,
              destinationCity: destinationCity,
              doj: doj,
            },
          }
        );
        setFilters(response?.data?.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    getFilters();
  }, [sourceCity, destinationCity, doj]);

  const handleFilterChange = (filterName, selectedFilters) => {
    let updatedBoardingPointsFilter = boardingPointsFilter;
    let updatedDroppingPointsFilter = droppingPointsFilter;
    let updatedBusPartnerFilter = busPartnerFilter;

    if (filterName === "boardingPoints") {
      updatedBoardingPointsFilter = selectedFilters;
    }
    if (filterName === "droppingPoints") {
      updatedDroppingPointsFilter = selectedFilters;
    }
    if (filterName === "busPartners") {
      updatedBusPartnerFilter = selectedFilters;
    }
    onFilterChange({
      boardingPoints: updatedBoardingPointsFilter,
      droppingPoints: updatedDroppingPointsFilter,
      busPartners: updatedBusPartnerFilter,
    });
    setBoardingPointsFilter(updatedBoardingPointsFilter);
    setDroppingPointsFilter(updatedDroppingPointsFilter);
    setBusPartnerFilter(updatedBusPartnerFilter);
  };

  return (
    <div className="leftFilter">
      <h4>Filter</h4>
      <div className="filters">
        <LeftFilterBox
          title={"Boarding Points"}
          points={filters.boardingPoints}
          count={[12, 16, 78]}
          name={"boardingPoints"}
          onFilterChange={handleFilterChange}
          filters={selectedBoardingPoints}
        />
        <LeftFilterBox
          title={"Drop Points"}
          points={filters.droppingPoints}
          count={[12, 16, 78]}
          name={"droppingPoints"}
          onFilterChange={handleFilterChange}
          filters={selectedDroppingPoints}
          sourceCity={sourceCity}
          destinationCity={destinationCity}
        />
        <LeftFilterBox
          title={"Bus Partner"}
          points={filters.busPartners}
          count={[12, 16, 78]}
          name={"busPartners"}
          onFilterChange={handleFilterChange}
        />
        <div className="priceRange">
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={range}
            onChangeCommitted={handleSliderChangeCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={3000}
            step={1}
          />
          <div className="range-labels">
            <span>₹ {range[0]}</span>
            <span>₹ {range[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftFilter;
