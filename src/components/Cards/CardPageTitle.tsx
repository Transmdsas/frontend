import React from "react";
import { Typography } from "@mui/material";
import { PrimaryButton } from "../PrimaryButton";

interface PageTitleProps {
  title: String;
}

const CardPageTitle = () => {
  return (
    <Typography
      variant="h3"
      component="h1"
      align="center"
      mb={"30px"}
      sx={{
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "26px",
        lineHeight: "66px",
        color: "primary",
        
        
      }}
    >
      Tenedor
    </Typography>
  );
};

export { CardPageTitle };
