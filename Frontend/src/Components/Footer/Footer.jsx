import "./Footer.css";
import logo from "../../assets/tatalogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const carLinks = [
    { name: "Nexon", id: 6 },
    { name: "Tiago", id: 3 },
    { name: "Tigor", id: 4 },
    { name: "Punch", id: 5 },
    { name: "Curvv", id: 2 },
    { name: "Harrier", id: 7 },
    { name: "Safari", id: 8 },
    { name: "Altroz", id: 1 },
  ];

  const socialLinks = {
    facebook: "https://www.facebook.com/TataMotorsGroup/",
    twitter: "https://twitter.com/TataMotors",
    instagram:
      "https://www.instagram.com/tatamotorscars?utm_source=ig_web_button_share_sheet&igsh=MjgyaWhucHczcnN5",
    youtube: "https://www.youtube.com/@TataMotorsCars",
    whatsapp:
      "https://wa.me/919643006652?text=Hello!%20I%20have%20a%20question",
    contact: "https://www.tatamotors.com/contact-us/",
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="column">
          <img src={logo} alt="TATA Logo" className="logo" />
        </div>

        <div className="column">
          <h4 className="heading">Tata Cars</h4>
          {carLinks.map((car) => (
            <Link key={car.id} to={`/cars/${car.id}`} className="link">
              {car.name} &rarr;
            </Link>
          ))}
        </div>

        <div className="column">
          <h4 className="heading">Help</h4>
          <p className="link">Service &rarr;</p>
          <p className="link">Dealer Locator &rarr;</p>
          {/* <p className="link">Digital Showroom &rarr;</p> */}
          <Link to="/digital-showroom" className="footer-link">
            <p className="link">Digital Showroom &rarr;</p>
          </Link>
        </div>

        <div className="column">
          <h4 className="heading">Quick Links</h4>
          <a
            href={socialLinks.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Contact Us &rarr;
          </a>
          <p className="link">Privacy Policy &rarr;</p>
          <p className="link">Terms & Condition &rarr;</p>
        </div>

        <div className="column">
          <h4 className="heading">Social</h4>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FaFacebookF /> Facebook
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FaTwitter /> Twitter
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FaInstagram /> Instagram
          </a>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FaYoutube /> Youtube
          </a>
        </div>
      </div>

      <div className="bottom-bar">
        <p>For Roadside Assistance, call on – 18002098282</p>
        <p>© 2025 TATA Motors. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
