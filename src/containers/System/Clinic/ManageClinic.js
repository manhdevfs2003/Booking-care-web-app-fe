import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, preState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnchangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Tạo phòng khám thành công");
      this.setState({
        name: "",
        imageBase64: "",
        address: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Tạo phòng khám thất bại");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="manage-clinic.title" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.name" />
            </label>
            <input type="text" className="form-control" value={this.state.name} onChange={(event) => this.handleOnchangeInput(event, "name")} />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.image" />
            </label>
            <input type="file" className="form-control-file" onChange={(event) => this.handleOnchangeImage(event)} />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.address" />
            </label>
            <input type="text" className="form-control" value={this.state.address} onChange={(event) => this.handleOnchangeInput(event, "address")} />
          </div>
          <div className="col-12">
            <MdEditor style={{ height: "300px" }} renderHTML={(text) => mdParser.render(text)} value={this.state.descriptionMarkdown} onChange={this.handleEditorChange} />
          </div>
          <div className="col-12">
            <button className="btn-save-specialty" onClick={this.handleSaveNewClinic}>
              <FormattedMessage id="manage-clinic.save" />
            </button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
