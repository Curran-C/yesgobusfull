import express from "express";
import {
  signUpController,
  signInController,
  googleSignInController,
  facebookSignInController,
  updateUserProfileController,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/googleSignIn", googleSignInController);
router.post("/facebookSignIn", facebookSignInController);

router.use(authenticateUser);

router.patch("/updateProfile/:userId", updateUserProfileController);

export default router;
