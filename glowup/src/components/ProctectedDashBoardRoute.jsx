import { Navigate } from "react-router-dom";

const ProctectedDashBoardRoute = ({ children,islogged }) => {
  if (!islogged) {
    return <Navigate to="/"/>;
  } else {
    return children;
    
  }
};

export default ProctectedDashBoardRoute;
