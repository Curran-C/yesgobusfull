import express from "express";
import {
  signUpController,
  signInController,
  googleSignInController,
  facebookSignInController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/googleSignIn", googleSignInController);
router.post("/facebookSignIn", facebookSignInController);

export default router;
