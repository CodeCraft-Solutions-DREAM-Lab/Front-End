import propTypes from "prop-types";
import "./LoginRow.css";

function LoginRow({ children, flexDirection = "row" }) {
  return (
    <div className={`login-row login-flex-${flexDirection}`}>{children}</div>
  );
}

LoginRow.propTypes = {
  children: propTypes.node,
  flexDirection: propTypes.string,
};

export default LoginRow;
