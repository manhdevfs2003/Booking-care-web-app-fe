import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  checkValideInput = () => {
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing input: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };

  handleAddNewUser = () => {
    if (this.checkValideInput()) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>
          <FormattedMessage id="manage-user.add" />
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">
                <FormattedMessage id="manage-user.email" defaultMessage="Email" />
              </Label>
              <Input type="email" id="email" value={this.state.email} onChange={(e) => this.handleOnChangeInput(e, "email")} />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                <FormattedMessage id="manage-user.password" defaultMessage="Password" />
              </Label>
              <Input type="password" id="password" value={this.state.password} onChange={(e) => this.handleOnChangeInput(e, "password")} />
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
          <Button color="primary" onClick={this.handleAddNewUser}>
            <FormattedMessage id="manage-user.add" defaultMessage="Add new" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
