import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarWithCarousel from "./Components/NavbarWithCarousel/NavbarWithCarousel";
import CarFeature from "./Components/NavbarWithCarousel/CarFeature/CarFeature";
import CarDetailPage from "./Components/NavbarWithCarousel/CarFeature/CarDetailPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import TestDriveCard from "./Components/TestDriveCard/TestDriveCard";
import Footer from "./Components/Footer/Footer";
import GoToTop from "./Components/Gototop/GoToTop";
import CarShowcase from "./Components/VideoCarousel/VideoCarousel";
import TestDrive from "./Components/TestDriveCard/TestDriveCard";
import DealersNearMe from "./Components/DealersNearMe/DealersNearMe";
import BrandStories from "./Components/BrandStories/BrandStories";
import SignUpModal from "./Components/AuthPage/SignUpModal";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignUpModal />} />
          <Route
            path="/Home"
            element={
              <>
                <NavbarWithCarousel />
                <CarFeature />
                <TestDriveCard />
                <Footer />
              </>
            }
          />
          <Route path="/cars/:carId" element={<CarDetailPage />} />
          <Route path="/booking/:carId" element={<BookingPage />} />
          <Route path="/digital-showroom" element={<CarShowcase />} />
          <Route path="/test-drive" element={<TestDrive />} />
          <Route path="/brand-stories" element={<BrandStories />} />
          <Route path="/dealers-near-me" element={<DealersNearMe />} />
        </Routes>
        <GoToTop />
      </div>
    </Router>
  );
};

export default App;
