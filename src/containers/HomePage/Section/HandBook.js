import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./HandBook.scss";
import Slider from "react-slick";
import { getAllHandbook } from "../../../services/userService";

const HandBook = (props) => {
  const [dataHandbook, setDataHandbook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandbook = async () => {
      let res = await getAllHandbook();
      if (res && res.errCode === 0) {
        setDataHandbook(res.data);
      }
    };
    fetchHandbook();
  }, []);

  const handleViewDetailHandbook = (handbook) => {
    navigate(`/detail-handbook/${handbook.id}`);
  };

  return (
    <div className="section-share section-handbook">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.handbook" />
          </span>
          <button className="btn-section" onClick={() => navigate("/handbook/seemore")}>
            <FormattedMessage id="homepage.more-info" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {dataHandbook.length > 0 &&
              dataHandbook.map((item, index) => (
                <div key={index} className="section-customize handbook-child" onClick={() => handleViewDetailHandbook(item)}>
                  <div className="bg-image section-handbook" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="text-content">
                    <div className="handbook-name">{item.name}</div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HandBook;
