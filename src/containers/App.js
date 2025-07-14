import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute, GuestRoute } from "../hoc/authentication"; // Import mới
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import Doctor from "../routes/Doctor.js";
import VerifyEmail from "./Patient/VerifyEmail.js";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty.js";
import DetailClinic from "./Patient/Clinic/DetailClinic.js";
import DetailHandbook from "./Patient/Handbook/DetailHandbook.js";
import Seemore from "./Patient/Seemore.js";
class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="main-container responsive-app-wrapper">
          <div className="content-container">
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route
                  path={path.LOGIN}
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path={path.SYSTEM}
                  element={
                    <ProtectedRoute>
                      <System />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={path.DOCTOR}
                  element={
                    <ProtectedRoute>
                      <Doctor />
                    </ProtectedRoute>
                  }
                />
                <Route path={path.HOMEPAGE} element={<HomePage />} />
                <Route path="/:section/seemore" element={<Seemore />} />
                <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
                <Route path={path.DETAIL_SPECIALTY} element={<DetailSpecialty />} />
                <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
                <Route path={path.DETAIL_HANDBOOK} element={<DetailHandbook />} />
                <Route path={path.VERIFY_EMAIL_BOOKING} element={<VerifyEmail />} />
              </Routes>
            </CustomScrollbars>
          </div>
          <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  started: state.app.started,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(App);
