import { BusBooking, KYC, LandingPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/busbooking" element={<BusBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
