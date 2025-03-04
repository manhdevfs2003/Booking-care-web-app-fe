import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailClinic.scss";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getAllDetailClinicById } from "../../../services/userService";
import _ from "lodash";
import HomeFooter from "../../HomePage/Section/HomeFooter";

const DetailClinic = ({ language }) => {
  const { id } = useParams();
  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [dataDetailClinic, setDataDetailClinic] = useState({});

  useEffect(() => {
    const fetchClinicDetails = async () => {
      if (id) {
        let res = await getAllDetailClinicById({ id });
        if (res && res.errCode === 0) {
          let data = res.data;
          let doctorIds = data?.doctorClinic?.map((item) => item.doctorId) || [];
          setDataDetailClinic(data);
          setArrDoctorId(doctorIds);
        }
      }
    };
    fetchClinicDetails();
  }, [id]);

  return (
    <div className="detail-clinic-container">
      <HomeHeader isShowBanner={false} />
      <div className="detail-clinic-body">
        <div className="description-clinic">
          {!_.isEmpty(dataDetailClinic) && (
            <>
              <div>{dataDetailClinic.name}</div>
              <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
            </>
          )}
        </div>

        {arrDoctorId.length > 0 &&
          arrDoctorId.map((doctorId, index) => (
            <div className="each-doctor" key={index}>
              <div className="dt-content-left">
                <div className="profile-doctor">
                  <ProfileDoctor doctorId={doctorId} isShowDescriptionDoctor={true} isShowLinkDetail={true} isShowPrice={true} />
                </div>
              </div>
              <div className="dt-content-right">
                <div className="doctor-schedule">
                  <DoctorSchedule doctorIdFromParent={doctorId} />
                </div>
                <div className="doctor-extra-infor">
                  <DoctorExtraInfor doctorIdFromParent={doctorId} />
                </div>
              </div>
            </div>
          ))}
      </div>
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(DetailClinic);
