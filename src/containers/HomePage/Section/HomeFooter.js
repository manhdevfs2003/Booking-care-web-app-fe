import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
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
import "./HomeFooter.scss";

const HomeFooter = () => {
  const menuItems = [
    { text: "Liên hệ hợp tác", link: "#" },
    { text: "Chuyển đổi số", link: "#" },
    { text: "Chính sách bảo mật", link: "#" },
    { text: "Quy chế hoạt động", link: "#" },
    { text: "Tuyển dụng", link: "#" },
    { text: "Điều khoản sử dụng", link: "#" },
    { text: "Câu hỏi thường gặp", link: "#" },
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

  return (
    <footer className="footer-container">
      {/* Thông tin công ty */}
      <div className="footer-column">
        <h2>Công ty Cổ phần BookingCare</h2>
        <div className="contact-info">
          <p>
            <MapPin /> Gò Vấp, TP.HCM
          </p>
          <p>
            <Phone /> 024-7301-2468 (7h - 18h)
          </p>
          <p>
            <Mail /> bookingcarevnauth@gmail.com
          </p>
        </div>

        {/* Văn phòng TP.HCM */}
        <h3>Văn phòng tại TP Hồ Chí Minh</h3>
        <p>
          <MapPin /> 384 Hoàng Diệu, Quận 4, TP.HCM
        </p>
      </div>

      {/* Danh sách liên kết */}
      <div className="footer-column">
        <h3>BookingCare</h3>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Đối tác */}
      <div className="footer-column">
        <h3>Đối tác</h3>
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
        <h3>Thanh toán</h3>
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
    </footer>
  );
};

export default HomeFooter;
