import express from "express";
import { 
  signUpController,
  signInController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);

export default router;