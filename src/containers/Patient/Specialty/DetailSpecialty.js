import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailSpecialty.scss";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getAllDetailSpecialtyById, getAllCodeService } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import HomeFooter from "../../HomePage/Section/HomeFooter";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    let id = this.props.params.id; // Lấy id từ URL
    if (!id) return;

    let res = await getAllDetailSpecialtyById({ id: id, location: "ALL" });
    let resProvince = await getAllCodeService("PROVINCE");

    if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
      let data = res.data;
      let arrDoctorId = [];

      if (data && !_.isEmpty(data)) {
        let arr = data.doctorSpecialty;
        if (arr && arr.length > 0) {
          arrDoctorId = arr.map((item) => item.doctorId);
        }
      }

      let dataProvince = resProvince.data;
      if (dataProvince && dataProvince.length > 0) {
        dataProvince.unshift({
          createdAt: null,
          keyMap: "ALL",
          type: "PROVINCE",
          valueEn: "All",
          valueVi: "Toàn quốc",
        });
      }

      this.setState({
        dataDetailSpecialty: data,
        arrDoctorId: arrDoctorId,
        listProvince: dataProvince || [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    let id = this.props.params.id;
    let location = event.target.value;

    let res = await getAllDetailSpecialtyById({ id: id, location: location });
    if (res && res.errCode === 0) {
      let data = res.data;
      let doctorId = [];

      if (data && !_.isEmpty(data)) {
        let arr = data.doctorSpecialty;
        if (arr && arr.length > 0) {
          doctorId = arr.map((item) => item.doctorId);
        }
      }

      this.setState({
        dataDetailSpecialty: data,
        arrDoctorId: doctorId,
      });
    }
  };

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader isShowBanner={false} />
        <div className="detail-specialty-body">
          <div className="description-specialty">{dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>}</div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince.map((item, index) => (
                <option key={index} value={item.keyMap}>
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </option>
              ))}
            </select>
          </div>
          {arrDoctorId.map((item, index) => (
            <div className="each-doctor" key={index}>
              <div className="dt-content-left">
                <ProfileDoctor doctorId={item} isShowDescriptionDoctor={true} isShowLinkDetail={true} isShowPrice={true} />
              </div>
              <div className="dt-content-right">
                <div className="doctor-schedule">
                  <DoctorSchedule doctorIdFromParent={item} />
                </div>
                <div className="doctor-extra-infor">
                  <DoctorExtraInfor doctorIdFromParent={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const withRouter = (Component) => (props) => {
  const params = useParams();
  return <Component {...props} params={params} />;
};

export default connect(mapStateToProps)(withRouter(DetailSpecialty));
