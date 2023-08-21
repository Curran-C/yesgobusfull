import { getCabDetails } from '../service/cab.service.js';

export const getCabDetailsController = async (req, res) => {
  try {
    const { cabModel, seatingCapacity, cabType, priceFrom, priceTo, fromLocation } = req.query;
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
    if (fromLocation) {
      query.location = fromLocation.toLowerCase();
    }

    const result = await getCabDetails(query);

    res.status(result.status).json({ message: result.message, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while fetching cab details" });
  }
};
