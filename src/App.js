// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
// import { path } from "../utils";
// import Home from "../src/routes/Home.js";
// import Login from "../src/routes/Login.js";
// import System from "../src/routes/System.js";
// import HomePage from "./HomePage/HomePage.js";
// import CustomScrollbars from "../components/CustomScrollbars.js";
// import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
// import Doctor from "../src/routes/Doctor.js";
// import VerifyEmail from "./Patient/VerifyEmail.js";
// import DetailSpecialty from "./Patient/Specialty/DetailSpecialty.js";
// import DetailClinic from "./Patient/Clinic/DetailClinic.js";
// import DetailHandbook from "./Patient/Handbook/DetailHandbook.js";

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Fragment>
//           <div className="main-container">
//             <div className="content-container">
//               <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
//                 <Routes>
//                   <Route path={path.HOME} element={<Home />} />
//                   <Route path={path.LOGIN} element={userIsNotAuthenticated(<Login />)} />
//                   <Route path={path.SYSTEM} element={userIsAuthenticated(<System />)} />
//                   <Route path={"/doctor/"} element={userIsAuthenticated(<Doctor />)} />
//                   <Route path={path.HOMEPAGE} element={<HomePage />} />
//                   <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
//                   <Route path={path.DETAIL_SPECIALTY} element={<DetailSpecialty />} />
//                   <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
//                   <Route path={path.DETAIL_HANDBOOK} element={<DetailHandbook />} />
//                   <Route path={path.VERIFY_EMAIL_BOOKING} element={<VerifyEmail />} />
//                 </Routes>
//               </CustomScrollbars>
//             </div>

//             <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
//           </div>
//         </Fragment>
//       </Router>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   started: state.app.started,
//   isLoggedIn: state.user.isLoggedIn,
// });

// export default connect(mapStateToProps)(App);
