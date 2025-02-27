import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container container-fluid bg-light shadow-sm py-2 px-4 d-flex align-items-center justify-content-between">
        {/* Thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="languages d-flex align-items-center">
          <span className="welcome me-3 text-primary">
            <FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
          </span>
          <span className={`language-vi me-2 px-2 py-1 rounded ${language === LANGUAGES.VI ? "bg-primary text-white" : "bg-light"}`} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)} style={{ cursor: "pointer" }}>
            VN
          </span>
          <span className={`language-en px-2 py-1 rounded ${language === LANGUAGES.EN ? "bg-primary text-white" : "bg-light"}`} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)} style={{ cursor: "pointer" }}>
            EN
          </span>
          <div className="btn btn-danger ms-3 d-flex align-items-center px-3 py-1 rounded shadow-sm" onClick={processLogout} title="Log out" style={{ cursor: "pointer" }}>
            <i className="fas fa-sign-out-alt me-2"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
