import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import { FaMapMarkerAlt } from "react-icons/fa";

const DetailDoctor = ({ language }) => {
  const { id } = useParams();
  const [detailDoctor, setDetailDoctor] = useState({});

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (id) {
        let res = await getDetailInforDoctor(id);
        if (res && res.errCode === 0) {
          setDetailDoctor(res.data);
        }
      }
    };
    fetchDoctorDetails();
  }, [id]);

  let nameVi = "",
    nameEn = "";
  if (detailDoctor && detailDoctor.positionData) {
    nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
  }

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="doctor-detail-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${detailDoctor?.image || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="content-right">
            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
            <div className="down">{detailDoctor?.Markdown?.description && <span>{detailDoctor.Markdown.description}</span>}</div>
            <div className="address-doctor">
              <FaMapMarkerAlt size={20} color="black" />
              <span>{detailDoctor?.address}</span>
            </div>
          </div>
        </div>
        <div className="schedule-doctor">
          <div className="content-left">
            <DoctorSchedule doctorIdFromParent={id} />
          </div>
          <div className="content-right">
            <DoctorExtraInfor doctorIdFromParent={id} />
          </div>
        </div>
        <div className="detail-infor-doctor">{detailDoctor?.Markdown?.contentHTML && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>}</div>
        <div className="comment-doctor"></div>
        <HomeFooter />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(DetailDoctor);
