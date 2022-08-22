import React from "react";
import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ButtonProps {
  title: string;
  url: string;
}

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Link component={RouterLink} to={props.url}>
      <Button
        color="primary"
        variant="contained"
        sx={{
          borderRadius: 10,
          width: 200,
          height: 35,
          mb: 2,
          "&:hover": {
            transform: "scale(1.1)",
          }
        }}
      >
        {props.title}
      </Button>
    </Link>
  );
};

export { PrimaryButton };
