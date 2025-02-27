import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { FormattedMessage } from "react-intl";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    if (this.props.userData) {
      this.setState({ ...this.props.userData });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  checkValideInput = () => {
    let arrInput = ["email", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing input: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };

  handleSaveUser = () => {
    if (this.checkValideInput()) {
      this.props.saveUser(this.state);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>
          <FormattedMessage id="manage-user.modal.edit" defaultMessage="Edit user" />
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">
                <FormattedMessage id="manage-user.email" defaultMessage="Email" />
              </Label>
              <Input type="email" id="email" value={this.state.email} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">
                <FormattedMessage id="manage-user.first-name" defaultMessage="First Name" />
              </Label>
              <Input type="text" id="firstName" value={this.state.firstName} onChange={(e) => this.handleOnChangeInput(e, "firstName")} />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">
                <FormattedMessage id="manage-user.last-name" defaultMessage="Last Name" />
              </Label>
              <Input type="text" id="lastName" value={this.state.lastName} onChange={(e) => this.handleOnChangeInput(e, "lastName")} />
            </FormGroup>
            <FormGroup>
              <Label for="address">
                <FormattedMessage id="manage-user.address" defaultMessage="Address" />
              </Label>
              <Input type="text" id="address" value={this.state.address} onChange={(e) => this.handleOnChangeInput(e, "address")} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSaveUser}>
            <FormattedMessage id="manage-user.edit" defaultMessage="Save changes" />
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            <FormattedMessage id="manage-user.modal.close" defaultMessage="Close" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
