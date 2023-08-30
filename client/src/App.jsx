import { BusBooking, KYC, LandingPage, Login, Payment } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/busbooking" element={<BusBooking />} />
        <Route path="/busbooking/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
