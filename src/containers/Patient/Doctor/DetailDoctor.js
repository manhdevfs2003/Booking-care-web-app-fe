import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import { FaMapMarkerAlt } from "react-icons/fa";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: null,
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      console.log("res", res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, preState, snapshot) {}
  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi,
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName} `;
      nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ""})`,
                backgroundSize: "cover", // Ảnh phủ đầy khung
                backgroundPosition: "center", // Căn giữa ảnh
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="content-right">
              <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="down">{detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && <span>{detailDoctor.Markdown.description}</span>}</div>
              <div className="address-doctor">
                <FaMapMarkerAlt size={20} color="black" />
                <span>{detailDoctor && detailDoctor.address}</span>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId}></DoctorSchedule>
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId}></DoctorExtraInfor>
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
          <HomeFooter></HomeFooter>
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
