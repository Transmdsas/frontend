import React from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

interface GridViewButtonProps {
  to?: string;
  onClick?: (e: any) => void;
}

const GridViewButton: React.FC<GridViewButtonProps> = ({ to, onClick }) => {
  return (
    <IconButton
      aria-label="View"
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
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="25" fill="#203764" />
        <circle cx="24.75" cy="24.75" r="18.75" fill="#4F6192" />
        <path
          d="M25 16C18.4581 16 12.7862 19.81 10 25.375C12.7862 30.94 18.4581 34.75 25 34.75C31.5419 34.75 37.2138 30.94 40 25.375C37.2138 19.81 31.5419 16 25 16ZM32.3969 20.9725C34.1594 22.0975 35.6537 23.6031 36.775 25.375C35.6537 27.1487 34.1594 28.6544 32.3969 29.7775C30.1825 31.1894 27.625 31.9375 25.0019 31.9375C22.3788 31.9375 19.8213 31.1912 17.605 29.7775C15.8425 28.6525 14.3481 27.1469 13.2269 25.375C14.3481 23.6013 15.8425 22.0956 17.605 20.9725C17.7194 20.8994 17.8356 20.8281 17.9519 20.7588C17.6594 21.5594 17.5 22.4238 17.5 23.3256C17.5 27.4675 20.8581 30.8256 25 30.8256C29.1419 30.8256 32.5 27.4675 32.5 23.3256C32.5 22.4238 32.3406 21.5594 32.0481 20.7588C32.1644 20.8281 32.2825 20.8994 32.3969 20.9725ZM25 22.5625C25 24.115 23.74 25.375 22.1875 25.375C20.635 25.375 19.375 24.115 19.375 22.5625C19.375 21.01 20.635 19.75 22.1875 19.75C23.74 19.75 25 21.01 25 22.5625Z"
          fill="white"
        />
      </svg>
    </IconButton>
  );
};

export default GridViewButton;
