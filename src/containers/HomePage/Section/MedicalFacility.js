import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";

const MedicalFacility = (props) => {
  const [dataClinics, setDataClinics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        setDataClinics(res.data);
      }
    };
    fetchClinics();
  }, []);

  const handleViewDetailClinic = (clinic) => {
    navigate(`/detail-clinic/${clinic.id}`);
  };

  return (
    <div className="section-share section-medical-facility">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.outstanding-facility" />
          </span>
          <button className="btn-section" onClick={() => navigate("/clinic/seemore")}>
            <FormattedMessage id="homepage.more-info" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {dataClinics.length > 0 &&
              dataClinics.map((item, index) => (
                <div key={index} className="section-customize section-medical-facility" onClick={() => handleViewDetailClinic(item)}>
                  <div className="bg-image section-medical-facility" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="text-content">
                    <div className="clinic-name">{item.name}</div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacility;
