import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ModalRemedy.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Toast, { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/vi"; // Import tiếng Việt
import CommonUtils from "../../../utils/CommonUtils";
class ModalRemedy extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: "",
         imgBase64: "",
      };
   }
   async componentDidMount() {
      if (this.props.dataModal) {
         this.setState({
            email: this.props.dataModal.email,
         });
      }
   }
   componentDidUpdate(prevProps, preState, snapshot) {
      if (this.props.language !== prevProps.language) {
      }
      if (prevProps.dataModal !== this.props.dataModal) {
         this.setState({
            email: this.props.dataModal.email,
         });
      }
   }
   handleOnChangeEmail = (event) => {
      this.setState({
         email: event.target.value,
      });
   };
   handleOnchangeImage = async (event) => {
      let file = event.target.files[0];
      if (file) {
         let base64 = await CommonUtils.getBase64(file);
         this.setState({
            imgBase64: base64,
         });
      }
   };
   handleSendRemedy = () => {
      this.props.sendRemedy(this.state);
   };
   render() {
      // toggle={}
      let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

      return (
         <Modal
            isOpen={isOpenModal}
            className={"booking-modal-container"}
            size="md"
            centered
         >
            <ModalHeader toggle={closeRemedyModal}>
               <div className="title-modal">Gửi hóa đơn bệnh nhân</div>
            </ModalHeader>
            <ModalBody>
               <div className="row">
                  <div className="col-6 form-group">
                     <label>Email bệnh nhân</label>
                     <input
                        className="form-control"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.handleOnChangeEmail(event)}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>Chọn file hóa đơn</label>
                     <input
                        className="form-control-file"
                        type="file"
                        onChange={(event) => this.handleOnchangeImage(event)}
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={() => this.handleSendRemedy()}>
                  Send
               </Button>{" "}
               <Button color="secondary" onClick={closeRemedyModal}>
                  Cancel
               </Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genders: state.admin.genders,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);
