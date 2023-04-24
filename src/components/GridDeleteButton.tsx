import React from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

interface GridDeleteButtonProps {
  to?: string;
  onClick?: (e: any) => void;
}

const GridDeleteButton: React.FC<GridDeleteButtonProps> = ({ to, onClick }) => {
  return (
    <IconButton
      aria-label="Delete"
      color="primary"
      component={to ? Link : "button"}
      {...(to ? { to } : {})}
      {...(onClick ? { onClick } : {})}
      sx={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="25" fill="#203764" />
        <circle cx="24.75" cy="24.75" r="18.75" fill="#4F6192" />
        <path
          d="M16 17.8H34M22 17.8V15.4C22 14.7373 22.5373 14.2 23.2 14.2H26.8C27.4627 14.2 28 14.7373 28 15.4V17.8M25 20.8V30.4M28.6 20.8L28 30.4M21.4 20.8L22 30.4M32.2 17.8L31.071 32.4767C31.0309 32.9977 30.5965 33.4 30.074 33.4H19.926C19.4035 33.4 18.9691 32.9977 18.929 32.4767L17.8 17.8H32.2Z"
          stroke="white"
          strokeWidth="1.2"
        />
      </svg>
    </IconButton>
  );
};

export default GridDeleteButton;
