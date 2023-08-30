import {
  BusBooking,
  KYC,
  LandingPage,
  Login,
  Payment,
  PaymentFailure,
  PaymentSuccess,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/busbooking" element={<BusBooking />} />
        <Route path="/busbooking/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/busbooking/payment/failure"
          element={<PaymentFailure />}
        />
        <Route
          path="/busbooking/payment/success"
          element={<PaymentSuccess />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
