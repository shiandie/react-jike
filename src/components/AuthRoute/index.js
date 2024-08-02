const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

const AuthRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};
export default AuthRoute;
