import React from "react";
import { Text } from "react-native";

const fontFamilies = {
  regular: "openSans",
  bold: "openSansBold",
};

export const DefText = ({ weight, children, style, ...rest }) => (
  <Text
    {...rest}
    style={{
      fontFamily: fontFamilies[weight] || fontFamilies.regular,
      ...style,
    }}
  >
    {children}
  </Text>
);
