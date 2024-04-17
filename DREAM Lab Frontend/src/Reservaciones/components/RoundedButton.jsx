import { Button } from "@nextui-org/react";
import propTypes from "prop-types";

import "./RoundedButton.css";

function RoundedButton({ text, onClick }) {
  return (
    <Button
      className="rounded-button"
      color="white"
      onClick={onClick}
      radius="full"
    >
      <label className="button-label">{text}</label>
    </Button>
  );
}

RoundedButton.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
};

export default RoundedButton;