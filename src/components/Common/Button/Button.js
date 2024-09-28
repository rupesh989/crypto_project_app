// Button.js
import React from "react";
import PropTypes from "prop-types"; // Ensure you have PropTypes imported
import styles from "./styles.module.css";

function Button({ text, onClick = () => {}, outlined, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      onClick(); // Call onClick if not disabled
    }
  };

  return (
    <button
      className={outlined ? styles.outlinedBtnDiv : styles.btnDiv}
      onClick={handleClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  outlined: false,
  disabled: false,
};

export default Button;
