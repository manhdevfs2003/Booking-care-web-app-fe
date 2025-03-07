import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, Container, Card } from "react-bootstrap";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Khởi tạo Markdown Parser
const mdParser = new MarkdownIt();

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

  componentDidUpdate(preProps) {
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
      <Container>
        <Card className="mt-4">
          <Card.Header>
            <h3 className="text-center">Manage Users</h3>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <Button variant="primary" size="sm" className="me-2" onClick={() => this.handleEditUser(item)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => this.handleDeleteUser(item)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header>
            <h4>Markdown Editor</h4>
          </Card.Header>
          <Card.Body>
            <MdEditor style={{ height: "500px" }} renderHTML={(text) => mdParser.render(text)} onChange={handleEditorChange} />
          </Card.Body>
        </Card>
      </Container>
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
