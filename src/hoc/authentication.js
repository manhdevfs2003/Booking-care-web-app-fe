import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Component kiểm tra người dùng đã đăng nhập chưa
 */
export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * Component kiểm tra người dùng chưa đăng nhập
 */
export const GuestRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
