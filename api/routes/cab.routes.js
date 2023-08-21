import express from "express";
import {
  getCabDetailsController,
} from "../controllers/cab.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/getCabDetails", getCabDetailsController);

export default router;