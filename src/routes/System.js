import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import UserManage from "../containers/System/Admin/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageHandbook from "../containers/System/Handbook/ManageHandbook";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Routes>
              <Route path="/" element={<Navigate to={systemMenuPath} replace />} />
              <Route path="user-manage" element={<UserManage />} />
              <Route path="user-redux" element={<UserRedux />} />
              <Route path="manage-doctor" element={<ManageDoctor />} />
              <Route path="manage-schedule" element={<ManageSchedule />} />
              <Route path="manage-handbook" element={<ManageHandbook />} />
              <Route path="manage-specialty" element={<ManageSpecialty />} />
              <Route path="manage-clinic" element={<ManageClinic />} />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  systemMenuPath: state.app.systemMenuPath,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(System);
