import express from "express";
import { 
  signUpController,
  signInController,
  updateDriverController,
  getDriverByIdController
} from "../controllers/driver.controller.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.patch("/updateDriver/:driverId", updateDriverController);
router.get("/getDriverById/:driverId", getDriverByIdController);

export default router;