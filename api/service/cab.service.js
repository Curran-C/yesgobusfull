import Cab from "../modals/cab.modal.js";

export const getCabDetails = async (query) => {
  try {
    query.cab_status = "Active";
    const cabDetails = await Cab.find(query);
    
    if (cabDetails.length === 0) {
      return {
        status: 200,
        message: "No Cabs Found",
      };
    }
    
    return {
      status: 200,
      message: "Cab details retrieved successfully",
      data: cabDetails,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};
