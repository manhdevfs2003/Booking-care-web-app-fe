import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import "./Specialty.scss";

const Specialty = (props) => {
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialty = async () => {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        setDataSpecialty(res.data || []);
      }
    };
    fetchSpecialty();
  }, []);

  const handleViewDetailSpecialty = (item) => {
    navigate(`/detail-specialty/${item.id}`);
  };

  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.popular-specialty" />
          </span>
          <button className="btn-section" onClick={() => navigate("/specialty/seemore")}>
            <FormattedMessage id="homepage.more-info" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {dataSpecialty?.length > 0 &&
              dataSpecialty.map((item, index) => (
                <div className="section-customize section-specialty" key={index} onClick={() => handleViewDetailSpecialty(item)}>
                  <div
                    className="bg-image section-specialty"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />
                  <div className="text-content">
                    <div className="specialty-name u-text-truncate">{item.name}</div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Specialty;
