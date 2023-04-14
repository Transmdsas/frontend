import React from "react";
import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ButtonProps {
  title: string;
  url: string;
  handleClick?: () => void;
  external?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({ title, url, handleClick, external, disabled }: ButtonProps) => {
  if (external) {
    return (
      <Button
        color="primary"
        variant="contained"
        sx={{
          borderRadius: 10,
          width: 200,
          height: 35,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={handleClick ? handleClick : undefined}
        disabled={disabled}
        // target="_blank"
        // rel="noopener noreferrer"
        // href={url}
      >
        {title}
      </Button>
    );
  } else {
    return (
      <Link component={RouterLink} to={url}>
        <Button
          color="primary"
          variant="contained"
          sx={{
            borderRadius: 10,
            width: 200,
            height: 35,
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleClick ? handleClick : undefined}
        >
          {title}
        </Button>
      </Link>
    );
  }
};

export { PrimaryButton };
