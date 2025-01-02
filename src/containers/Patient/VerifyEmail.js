import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookedAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import Home from "../../routes/Home";

class VerifyEmail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusVerify: false,
         errCode: 0,
      };
   }
   async componentDidMount() {
      if (this.props.location && this.props.location.search) {
         let urlParams = new URLSearchParams(this.props.location.search);
         let token = urlParams.get("token");
         let doctorId = urlParams.get("doctorId");
         let res = await postVerifyBookedAppointment({
            token: token,
            doctorId: doctorId,
         });
         if (res && res.errCode === 0) {
            this.setState({
               statusVerify: true,
               errCode: res.errCode,
            });
         } else {
            this.setState({
               statusVerify: true,
               errCode: res && res.errCode ? res.errCode : -1,
            });
         }
      }
   }

   async componentDidUpdate(prevProps, preState, snapshot) {
      if (this.props.language !== prevProps.language) {
      }
   }

   render() {
      let { statusVerify, errCode } = this.state;
      return (
         <>
            <HomeHeader />
            {statusVerify === false ? (
               <div className="text-center">
                  <h3>Loading data....</h3>
               </div>
            ) : (
               <div>{+errCode === 0 ? <h3>Success</h3> : <h3>Fail</h3>}</div>
            )}
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
