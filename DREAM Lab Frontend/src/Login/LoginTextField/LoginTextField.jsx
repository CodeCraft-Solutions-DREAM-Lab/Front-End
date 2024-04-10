import { Input } from "@nextui-org/react";

import propTypes from "prop-types";

import "./LoginTextField.css";

function LoginTextField({ label, placeholder, marginBot, type }) {
  // return (
  //   <div className="login-tf-container" style={{ marginBottom: marginBot }}>
  //     <div className="login-tf-label-container">
  //       <label className="login-tf-label">{label}</label>
  //     </div>
  //     <div style={{ backgroundColor:  }}>
  //       <input className="login-tf" name="user" type={type} placeholder="Usuario" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="login-tf-container" style={{ marginBottom: marginBot }}>
      <div className="login-tf-label-container">
        <label className="login-tf-label">{label}</label>
      </div>
      <Input
        labelPlacement="outside"
        placeholder={placeholder}
        fullWidth={false}
        radius="full"
        classNames={{
          input: ["text-white"],
          inputWrapper: ["bg-transparent border-2"],
        }}
      />
    </div>
  );
}

LoginTextField.propTypes = {
  label: propTypes.string,
  placeholder: propTypes.string,
  width: propTypes.string,
};

export default LoginTextField;
