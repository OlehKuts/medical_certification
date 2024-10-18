import React from "react";
import T from "prop-types";
import "./styles.css";

export const Text = ({ children, size, ...props }) => (
  <span className="text" style={{ fontSize: size, ...props }}>
    {children}
  </span>
);

Text.propTypes = {
  size: T.string,
  children: T.oneOfType([T.string, T.node, T.arrayOf(T.node)])
};

Text.defaultProps = {
  size: "18px"
};
