import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);

  const handleLogin = async () => {
    setErrMessage("");
    try {
      let data = await handleLoginApi(username, password);
      if (data && data.errCode !== 0) {
        setErrMessage(data.message);
      }
      if (data && data.errCode === 0) {
        dispatch(actions.userLoginSuccess(data.user));
      }
    } catch (e) {
      if (e.response && e.response.data) {
        setErrMessage(e.response.data.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-center login-title">Login</div>
          <div className="col-12 form-group">
            <label>Username: </label>
            <input type="text" className="form-control login-input" placeholder="Enter your user name" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="col-12 form-group">
            <label>Password: </label>
            <div className="login-password">
              <input type={showPassword ? "text" : "password"} className="form-control login-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
              <span onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fas fa-eye show-password" : "fas fa-eye-slash show-password"}></i>
              </span>
            </div>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errMessage}
          </div>
          <div className="col-12">
            <button className="btn-login" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="col-12">
            <span className="forgot-password">Forgot your password?</span>
          </div>
          <div className="col-12 text-center login-with mt-3">
            <span>Or login with:</span>
          </div>
          <div className="col-12 social-login">
            <i className="fab fa-facebook social-icon fb"></i>
            <i className="fab fa-google-plus social-icon gg"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
