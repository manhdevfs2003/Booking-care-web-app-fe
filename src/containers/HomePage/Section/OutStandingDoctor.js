import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const OutStandingDoctor = (props) => {
  const [arrDoctors, setArrDoctors] = useState([]);
  const language = useSelector((state) => state.app.language);
  const topDoctorsRedux = useSelector((state) => state.admin.topDoctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.fetchTopDoctor());
  }, [dispatch]);

  useEffect(() => {
    setArrDoctors(topDoctorsRedux);
  }, [topDoctorsRedux]);

  const handleViewDetailDoctor = (doctor) => {
    navigate(`/detail-doctor/${doctor.id}`);
  };

  return (
    <div className="section-share section-outstanding-doctor">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.out-standing-doctor" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="homepage.more-info" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {arrDoctors?.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = item.image ? new Buffer(item.image, "base64").toString("binary") : "";
                let nameVi = `${item.positionData?.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData?.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="section-customize" key={index} onClick={() => handleViewDetailDoctor(item)}>
                    <div className="customize-border">
                      <div className="outer-bg">
                        <div className="bg-image section-outstanding-doctor" style={{ backgroundImage: `url(${imageBase64})` }} />
                      </div>
                      <div className="position text-center">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                      <div className="specialty-doctor">{item.Doctor_Infor?.specialtyData?.name || ""}</div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutStandingDoctor;
