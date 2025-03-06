import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(preProps, prevState) {
    if (preProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteANewUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    let arrUsers = this.state.userRedux;
    return (
      <>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button onClick={() => this.handleEditUser(item)}>Edit</button>
                      <button onClick={() => this.handleDeleteUser(item)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor style={{ height: "500px" }} renderHTML={(text) => mdParser.render(text)} onChange={handleEditorChange} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteANewUserRedux: (id) => dispatch(actions.deleteANewUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
