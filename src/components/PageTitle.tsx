import React from "react";
import { Typography } from "@mui/material";

interface PageTitleProps {
    title: String
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <Typography
      variant="h4"
      component="h3"
      align="left"
      mb={'30px'}
      sx={{
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "36px",
        lineHeight: "23px",
      }}
    >
        {props.title}
    </Typography>
  );
};

export { PageTitle };