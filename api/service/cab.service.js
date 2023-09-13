import Cab from "../modals/cab.modal.js";

export const getCabDetails = async (query) => {
  try {
    query.cab_status = "available";
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

export const addCabDetails = async (cabData) => {
  try {
    const driverId = cabData.userId;
    const location = cabData.location.toLowerCase();
    const newCab = new Cab({
      ...cabData,
      driverId: driverId,
      location: location,
    });
    await newCab.save();
    
    return {
      status: 200,
      message: "Cab details added successfully",
      data: newCab,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

export const updateCabDetails = async (cabId, updatedData) => {
  try {
    const updatedCab = await Cab.findByIdAndUpdate(
      cabId, {
        ...updatedData,
      }
    );
    
    if (!updatedCab) {
      return {
        status: 404,
        message: "Cab not found",
      };
    }
    
    return {
      status: 200,
      message: "Cab details updated successfully",
      data: updatedCab,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

export const getCabDetailsByUser = async (driverId) => {
  try {
    const cabDetails = await Cab.find({ driverId });
    
    if (cabDetails.length === 0) {
      return {
        status: 404,
        message: "No cab details found for the user",
      };
    }
    
    return {
      status: 200,
      message: "Cab Details retrieved successfully",
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

export const inactiveCab = async (cabId) => {
  try {
    const updatedCab = await Cab.findByIdAndUpdate(
      cabId, {
        cab_status: "Inactive",
      }
    );
    
    if (!updatedCab) {
      return {
        status: 404,
        message: "Cab not found",
      };
    }
    
    return {
      status: 200,
      message: "Cab inactivated successfully",
      data: updatedCab,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

