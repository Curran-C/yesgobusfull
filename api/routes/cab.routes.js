import express from "express";
import {
  addCabDetailsController,
  getCabDetailsController,
  updateCabDetailsController,
  getCabDetailsByUserController,
  inactiveCabController,
} from "../controllers/cab.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/getCabDetails", getCabDetailsController);
router.post("/createCab", addCabDetailsController);
router.patch("/updateCab/:id", updateCabDetailsController);
router.get("/getCabDetailsByUser/:driverId", getCabDetailsByUserController);
router.patch("/inactiveCab/:id", inactiveCabController);

export default router;