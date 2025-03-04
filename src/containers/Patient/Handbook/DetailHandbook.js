import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHandbook.scss";
import { getDetailHandbookById } from "../../../services/userService";
import _ from "lodash";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import bannerImage from "../../../assets/handbook/backgroundbanner.png";

const DetailHandbook = ({ language }) => {
  const { id } = useParams();
  const [dataDetailHandbook, setDataDetailHandbook] = useState({});

  useEffect(() => {
    const fetchHandbookDetails = async () => {
      if (id) {
        let res = await getDetailHandbookById({ id });
        if (res && res.errCode === 0) {
          setDataDetailHandbook(res.data);
        }
      }
    };
    fetchHandbookDetails();
  }, [id]);

  return (
    <div className="detail-handbook-container">
      <HomeHeader isShowBanner={false} />
      <div className="handbook-banner">
        <img src={bannerImage} alt="banner" />
        <div className="text-handbook">
          <span className="custom-text">
            <FormattedMessage id="manage-handbook.text-handbook" />
          </span>
        </div>
      </div>
      <div className="detail-handbook-body">
        <div className="description-handbook">{!_.isEmpty(dataDetailHandbook) && <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }}></div>}</div>
      </div>
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(DetailHandbook);
