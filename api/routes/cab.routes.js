import express from "express";
import {
  getCabDetails,
} from "../controllers/cab.controller.js";
// import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

// router.use(authenticateUser);

router.get("/getCabDetails", getCabDetails);

export default router;