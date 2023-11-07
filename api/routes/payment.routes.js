import express from "express";
import {
  initiatePaymentController,
  checkPaymentStatusController,
  refundPaymentController,
} from "../controllers/payment.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.post("/initiatePayment", initiatePaymentController);
router.get("/checkPaymentStatus/:merchantTransactionId", checkPaymentStatusController);

router.use(authenticateUser);

router.post("/refundPayment", refundPaymentController);

export default router;