import Cab from "../modals/cab.modal.js";

//get cab details
export const getCabDetails = async (req, res) => {
  try {
    const {cabModel, seatingCapacity, cabType, priceFrom, priceTo, fromLocation} = req.query;
    let query = {};
    if (cabModel) {
      query.cabModel = cabModel;
    }
    if (seatingCapacity) {
      query.seatingCapacity = parseInt(seatingCapacity);
    }
    if (cabType) {
      query.cabType = cabType;
    }
    if (priceFrom && priceTo) {
      query.estimatedKmPrice = { $gte: parseFloat(priceFrom), $lte: parseFloat(priceTo) };
    } else if (priceFrom) {
      query.estimatedKmPrice = { $gte: parseFloat(priceFrom) };
    } else if (priceTo) {
      query.estimatedKmPrice = { $lte: parseFloat(priceTo) };
    }
    if(fromLocation) {
      query.location = fromLocation.toLowerCase();
    }
    query.cab_status = "Active";
    const cabDetails = await Cab.find(query);
    if(cabDetails.length === 0) {
      return res.status(200).send({message: "No Cabs Found"});
    }
    res.status(200).send({message: "Cab details retrived successfully", data: cabDetails});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};