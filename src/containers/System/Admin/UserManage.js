import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../../services/userService";
import ModalUser from "../ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "../ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users });
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };

  toggleUserEditModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalUser: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({ isOpenModalEditUser: true, userEdit: user });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({ isOpenModalEditUser: false });
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { arrUsers } = this.state;
    return (
      <div className="container mt-4">
        <ModalUser isOpen={this.state.isOpenModalUser} toggleFromParent={this.toggleUserModal} createNewUser={this.createNewUser} />
        {this.state.isOpenModalEditUser && <ModalEditUser isOpen={this.state.isOpenModalEditUser} toggleFromParent={this.toggleUserEditModal} currentUser={this.state.userEdit} editUser={this.doEditUser} />}

        <div className="mb-3">
          <button className="btn btn-primary" onClick={this.handleAddNewUser}>
            <i className="fa fa-plus me-2"></i>
            <span> </span>
            <FormattedMessage id="manage-user.add" />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>
                  <FormattedMessage id="manage-user.email" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.first-name" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.last-name" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.address" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.action" />
                </th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn btn-warning me-2" onClick={() => this.handleEditUser(item)}>
                        <FormattedMessage id="manage-user.edit" />
                      </button>
                      <button className="btn btn-danger" onClick={() => this.handleDeleteUser(item)}>
                        <FormattedMessage id="manage-user.delete" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
