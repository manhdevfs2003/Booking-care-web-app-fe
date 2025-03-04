import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Thay thế withRouter
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import vietnamFlag from "../../assets/vietnam.png";
import englishFlag from "../../assets/english.png";

const HomeHeader = (props) => {
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì withRouter

  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  const returnToHome = () => {
    navigate("/home"); // Thay thế this.props.history.push
  };

  let language = props.lang;

  return (
    <React.Fragment>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fa fa-bars"></i>
            <div className="header-logo" onClick={returnToHome}></div>
            <div className="name-web">HealthCare</div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <b>
                <FormattedMessage id="homeheader.speciality" />
              </b>
            </div>
            <div className="child-content">
              <b>
                <FormattedMessage id="homeheader.health-facility" />
              </b>
            </div>
            <div className="child-content">
              <b>
                <FormattedMessage id="homeheader.doctor" />
              </b>
            </div>
            <div className="child-content">
              <b>
                <FormattedMessage id="homeheader.handbook" />
              </b>
            </div>
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
