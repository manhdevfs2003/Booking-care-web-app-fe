import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHandbook.scss";
import { getDetailHandbookById } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import "./DetailHandbook.scss";
import bannerImage from "../../../assets/handbook/backgroundbanner.png"; // Thêm dòng này
import HomeFooter from "../../HomePage/Section/HomeFooter";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailHandbook: {},
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getDetailHandbookById({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;

        this.setState({
          dataDetailHandbook: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, preState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { dataDetailHandbook } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-handbook-container">
        <HomeHeader isShowBanner={false} />
        <div className="handbook-banner">
          <img src={bannerImage} alt="banner"></img>
          <div className="text-handbook">
            <span className="custom-text">
              <FormattedMessage id="manage-handbook.text-handbook" />
            </span>
          </div>
        </div>
        <div className="detail-handbook-body">
          <div className="description-handbook">
            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailHandbook.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
        <HomeFooter></HomeFooter>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
