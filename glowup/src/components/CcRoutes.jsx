import { Navigate } from "react-router-dom";

const CcProtectedRoute = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/customer-care/login" replace />;
  } else {
    return children;
  }
};

export default CcProtectedRoute;
