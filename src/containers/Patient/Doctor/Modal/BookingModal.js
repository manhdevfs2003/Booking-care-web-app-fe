import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { add } from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import Toast, { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/vi"; // Import tiếng Việt
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorId: "",
      timeType: "",
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, preState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      let doctorId = this.props.dataTime.doctorId;
      let timeType = this.props.dataTime.timeType;
      this.setState({
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    let value = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = value;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    const dateUTC = new Date(this.props.dataTime.date);
    dateUTC.setHours(dateUTC.getHours() + 7); // Cộng thêm 7 giờ để về UTC+7

    const dateLocal = dateUTC.toISOString().split("T")[0]; // Lấy phần yyyy-mm-dd
    let res = await postPatientBookAppointment({
      doctorId: this.state.doctorId,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: date,
      date: dateLocal,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    console.log("dateLocal", dateLocal);
    if (res && res.errCode === 0) {
      toast.success("Đặt lịch khám thành công");
      this.props.closeBookingModal();
    } else {
      toast.error("Đặt lịch khám thất bại");
    }
  };
  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataTime.date / 1000)
              .locale("vi") // Thêm dòng này
              .format("dddd- DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} -${date}`;
    }
    return "";
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  render() {
    // toggle={}
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <Modal isOpen={isOpenModal} className={"booking-modal-container"} size="lg" centered>
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor doctorId={doctorId} isShowDescriptionDoctor={false} dataTime={dataTime} isShowLinkDetail={false} isShowPrice={true} />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input type="text" className="form-control" value={this.state.fullName} onChange={(event) => this.handleOnChangeInput(event, "fullName")} />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input type="text" className="form-control" value={this.state.phoneNumber} onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")} />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input type="text" className="form-control" value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, "email")} />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input type="text" className="form-control" value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, "address")} />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <textarea type="text" className="form-control" value={this.state.reason} onChange={(event) => this.handleOnChangeInput(event, "reason")} />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker onChange={this.handleOnchangeDatePicker} className="form-control" value={this.state.birthday} maxDate={new Date()}></DatePicker>
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select value={this.state.selectedGender} onChange={this.handleChangeSelect} options={this.state.genders}></Select>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
            <button className="btn-booking-confirm" onClick={() => this.handleConfirmBooking()}>
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
