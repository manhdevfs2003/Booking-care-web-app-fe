import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Thay thế withRouter
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import vietnamFlag from "../../assets/vietnam.png";
import englishFlag from "../../assets/english.png";
import SideNavigation from "../../components/SideNavigation/SideNavigation";

const HomeHeader = (props) => {
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì withRouter
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  const returnToHome = () => {
    navigate("/home"); // Thay thế this.props.history.push
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  let language = props.lang;

  return (
    <React.Fragment>
      <SideNavigation isOpen={isSideNavOpen} onClose={closeSideNav} />
      
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fa fa-bars" onClick={toggleSideNav} style={{ cursor: 'pointer' }}></i>
            <div className="header-logo" onClick={returnToHome}></div>
            <div className="name-web" onClick={returnToHome}>
              HealthCare
            </div>
          </div>
          <div className="center-content">
            {/* Navigation items removed - now in sidebar */}
          </div>
          <div className="right-content">
            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
              <span onClick={() => changeLanguage(LANGUAGES.VI)}>
                <img src={vietnamFlag} alt="Vietnam flag" className="language-icon" />
              </span>
            </div>
            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
              <span onClick={() => changeLanguage(LANGUAGES.EN)}>
                <img src={englishFlag} alt="English flag" className="language-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {props.isShowBanner && (
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              <FormattedMessage id="banner.title2" />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userInfo: state.user.userInfo,
  lang: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
