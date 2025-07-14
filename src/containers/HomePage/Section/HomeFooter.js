import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import {
  FaGoogle,
  FaMicrosoft,
  FaApple,
  FaMobileAlt,
  FaCcMastercard,
  FaCcVisa,
  FaPaypal,
  FaMoneyBillWave,
} from "react-icons/fa";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions/appActions";
import "./HomeFooter.scss";

const HomeFooter = ({ language, changeLanguageAppRedux }) => {
  const menuItems = [
    { textKey: "footer.contact-cooperation", link: "#" },
    { textKey: "footer.digital-transformation", link: "#" },
    { textKey: "footer.privacy-policy", link: "#" },
    { textKey: "footer.operating-regulations", link: "#" },
    { textKey: "footer.recruitment", link: "#" },
    { textKey: "footer.terms-of-use", link: "#" },
    { textKey: "footer.faq", link: "#" },
  ];

  const partners = [
    {
      name: "Google",
      link: "https://www.google.com",
      icon: <FaGoogle style={{ color: "#4285F4" }} />,
    },
    {
      name: "Microsoft",
      link: "https://www.microsoft.com",
      icon: <FaMicrosoft style={{ color: "#F25022" }} />,
    },
    {
      name: "Apple",
      link: "https://www.apple.com",
      icon: <FaApple style={{ color: "#A3AAAE" }} />,
    },
    {
      name: "Samsung",
      link: "https://www.samsung.com",
      icon: <FaMobileAlt style={{ color: "#1428A0" }} />,
    },
  ];

  const handleChangeLanguage = (selectedLanguage) => {
    changeLanguageAppRedux(selectedLanguage);
  };

  return (
    <footer className="footer-container">
      {/* Thông tin công ty */}
      <div className="footer-column">
        <h2>
          <FormattedMessage id="footer.company" />
        </h2>
        <div className="contact-info">
          <p>
            <MapPin /> <FormattedMessage id="footer.address" />
          </p>
          <p>
            <Phone /> <FormattedMessage id="footer.phone" />
          </p>
          <p>
            <Mail /> <FormattedMessage id="footer.email" />
          </p>
        </div>

        {/* Văn phòng TP.HCM */}
        <h3>
          <FormattedMessage id="footer.office" />
        </h3>
        <p>
          <MapPin /> <FormattedMessage id="footer.office-address" />
        </p>
      </div>

      {/* Danh sách liên kết */}
      <div className="footer-column">
        <h3>
          <FormattedMessage id="footer.bookingcare" />
        </h3>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>
                <FormattedMessage id={item.textKey} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Đối tác */}
      <div className="footer-column">
        <h3>
          <FormattedMessage id="footer.partners" />
        </h3>
        <ul>
          {partners.map((partner, index) => (
            <li key={index}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                {partner.icon} {partner.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Thanh toán */}
      <div className="footer-column">
        <h3>
          <FormattedMessage id="footer.payment" />
        </h3>
        <p>
          <FaCcMastercard style={{ color: "#EB001B", fontSize: "24px" }} />{" "}
          Mastercard
        </p>
        <p>
          <FaCcVisa style={{ color: "#1A1F71", fontSize: "24px" }} /> Visa
        </p>
        <p>
          <FaPaypal style={{ color: "#003087", fontSize: "24px" }} /> PayPal
        </p>
        <p>
          <FaMoneyBillWave style={{ color: "#4CAF50", fontSize: "24px" }} />{" "}
          Momo/ZaloPay
        </p>
      </div>

      {/* Language Switcher */}
      <div className="footer-column language-switcher">
        <h3>
          <Globe style={{ marginRight: "8px" }} />
          <FormattedMessage id="footer.language-switcher" />
        </h3>
        <div className="language-options">
          <button
            className={`language-btn ${language === LANGUAGES.VI ? 'active' : ''}`}
            onClick={() => handleChangeLanguage(LANGUAGES.VI)}
          >
            <FormattedMessage id="footer.vietnamese" />
          </button>
          <button
            className={`language-btn ${language === LANGUAGES.EN ? 'active' : ''}`}
            onClick={() => handleChangeLanguage(LANGUAGES.EN)}
          >
            <FormattedMessage id="footer.english" />
          </button>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
