import propTypes from "prop-types";
import "./LoginRow.css";

function LoginRow({
  children,
  flexDirection = "row",
  justify = "center",
  align = "center",
  margin = "0 0 0 0",
}) {
  return (
    <div
      className={`login-row login-flex-${flexDirection} login-justify-${justify} login-align-${align}`}
      style={{ margin: margin }}
    >
      {children}
    </div>
  );
}

LoginRow.propTypes = {
  children: propTypes.node,
  flexDirection: propTypes.string,
  justify: propTypes.string,
  align: propTypes.string,
  margin: propTypes.string,
};

export default LoginRow;
