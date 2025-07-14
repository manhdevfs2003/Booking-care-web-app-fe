import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import "./SideNavigation.scss";

const SideNavigation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "specialty",
      titleId: "homeheader.speciality",
      icon: "fas fa-stethoscope",
      path: "/specialty/seemore",
      color: "#45B7D1"
    },
    {
      id: "facility",
      titleId: "homeheader.health-facility", 
      icon: "fas fa-hospital",
      path: "/clinic/seemore",
      color: "#96CEB4"
    },
    {
      id: "doctor",
      titleId: "homeheader.doctor",
      icon: "fas fa-user-md",
      path: "/doctor/seemore",
      color: "#FECA57"
    },
    {
      id: "handbook",
      titleId: "homeheader.handbook",
      icon: "fas fa-book-medical",
      path: "/handbook/seemore", 
      color: "#FF6B6B"
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('side-nav-overlay')) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`side-nav-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      ></div>

      {/* Sidebar */}
      <div className={`side-navigation ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="side-nav-header">
          <div className="nav-logo">
            <i className="fas fa-heartbeat"></i>
            <span>HealthCare</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Menu Items */}
        <div className="side-nav-content">
          <div className="nav-title">
            <FormattedMessage id="sidenav.menu" defaultMessage="Menu" />
          </div>
          
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={item.id} className="nav-item" style={{ '--item-color': item.color }}>
                <button 
                  className="nav-link"
                  onClick={() => handleMenuClick(item.path)}
                >
                  <div className="nav-icon">
                    <i className={item.icon}></i>
                  </div>
                  <span className="nav-text">
                    <FormattedMessage id={item.titleId} />
                  </span>
                  <i className="fas fa-chevron-right nav-arrow"></i>
                </button>
              </li>
            ))}
          </ul>

          {/* Additional Links */}
          <div className="nav-footer">
            <div className="nav-divider"></div>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={() => handleMenuClick('/about')}>
                  <i className="fas fa-info-circle"></i>
                  <span><FormattedMessage id="sidenav.about" defaultMessage="Về chúng tôi" /></span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleMenuClick('/contact')}>
                  <i className="fas fa-phone"></i>
                  <span><FormattedMessage id="sidenav.contact" defaultMessage="Liên hệ" /></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
