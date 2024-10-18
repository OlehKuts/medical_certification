import React from "react";
import "./styles.css";
import { Text } from "./Text";

export const Block = ({ header, content, size, ...props }) => (
  <div className="block">
    <Text size={size} {...props}>
      {header}
    </Text>
    {""}
    <span id="content"> {content} </span>
  </div>
);

Block.defaultProps = {
  size: "16px"
};
