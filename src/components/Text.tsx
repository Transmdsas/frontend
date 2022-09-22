import React from "react";
import { Typography } from "@mui/material";

interface TextFont {
  fontSize?: string | number;
  weight?: string | number;
  lineHeight?: string | number;
  variant?: string;
  align?: string;
  marginBottom?: string | number;
  color?: string;
  title?: string;
}

export const Text = ({
  weight,
  lineHeight,
  variant,
  align,
  marginBottom,
  color,
  title,
  fontSize,
}: TextFont) => {
  return (
    <Typography
      variant={"body1"}
      align="left"
      mb={marginBottom || "30px"}
      sx={{
        fontStyle: "normal",
        fontWeight: weight ? weight : 600,
        fontSize: fontSize ? fontSize    : "36px",
        lineHeight: lineHeight ? lineHeight : "23px",
        color: color ? color : "#203764",
      }}
    >
      {title}
    </Typography>
  );
};
