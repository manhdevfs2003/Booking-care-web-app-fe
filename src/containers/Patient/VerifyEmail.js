import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookedAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: null,
      isConfirmed: false, // Chỉ gửi request khi người dùng nhấn "Yes"
    };
  }

  handleConfirm = async (isConfirmed) => {
    if (isConfirmed) {
      if (this.props.location && this.props.location.search) {
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get("token");
        let doctorId = urlParams.get("doctorId");
        let res = await postVerifyBookedAppointment({
          token: token,
          doctorId: doctorId,
        });

        this.setState({
          statusVerify: true,
          errCode: res.errCode,
          isConfirmed: true,
        });
      }
    } else {
      // Người dùng chọn "No", không gửi request
      this.setState({
        statusVerify: true,
        errCode: null, // Không hiển thị lỗi vì chưa gửi request
        isConfirmed: false,
      });
    }
  };

  render() {
    let { statusVerify, errCode, isConfirmed } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="container text-center mt-5">
          {!statusVerify ? (
            <>
              <h3>Bạn có muốn xác nhận lịch hẹn hay không?</h3>
              <button className="btn btn-success m-2" onClick={() => this.handleConfirm(true)}>
                Yes
              </button>
              <button className="btn btn-danger m-2" onClick={() => this.handleConfirm(false)}>
                No
              </button>
            </>
          ) : (
            <div>{isConfirmed ? errCode === 0 ? <h3 className="text-success">Xác nhận thành công!</h3> : <h3 className="text-danger">Xác nhận thất bại!</h3> : <h3 className="text-warning">Bạn đã từ chối xác nhận lịch hẹn.</h3>}</div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(VerifyEmail);
