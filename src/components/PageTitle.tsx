import React from "react";
import { Typography } from "@mui/material";

interface PageTitleProps {
  title: String;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <Typography
      variant="h3"
      component="h3"
      align="left"
      mb={"30px"}
      sx={{
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "36px",
        lineHeight: "36px",
        color: "#203764",
      }}
    >
      {props.title}
    </Typography>
  );
};

export { PageTitle };
