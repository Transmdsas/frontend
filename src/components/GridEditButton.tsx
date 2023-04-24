import React from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';

interface GridEditButtonProps {
  to?: string;
  onClick?: (e:any) => void;
}

const GridEditButton: React.FC<GridEditButtonProps> = ({ to, onClick }) => {
  return (
    <IconButton
      aria-label="Edit"
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
          d="M25.103 16.7333L29.5973 21.2276L29.0526 21.773C28.2803 21.3894 27.4098 21.1738 26.489 21.1738C23.3011 21.1738 20.7169 23.758 20.7169 26.9459C20.7169 27.8666 20.9325 28.737 21.3159 29.5093L20.7719 30.0529C20.5261 30.2987 20.2203 30.4762 19.8848 30.5677L15.342 31.8066C14.8448 31.9422 14.3886 31.486 14.5242 30.9888L15.7632 26.446C15.8547 26.1105 16.0321 25.8048 16.278 25.5589L25.103 16.7333ZM26.489 22.0618C26.7493 22.0618 27.0046 22.0836 27.2534 22.1255L27.4073 22.7614C27.6373 23.715 28.5967 24.3015 29.5503 24.0715L29.6371 24.0482L30.1709 23.8894C30.4928 24.3041 30.7507 24.7744 30.9289 25.284L30.5318 25.6661C29.8622 26.3105 29.8075 27.3535 30.3818 28.0625L30.5074 28.2018L30.9289 28.6079C30.7509 29.1172 30.4932 29.5871 30.1716 30.0016L29.6371 29.8436C28.6965 29.5657 27.7085 30.103 27.4306 31.0436L27.4073 31.1305L27.2534 31.7663C27.0046 31.8083 26.7493 31.8301 26.489 31.8301C26.2285 31.8301 25.9729 31.8082 25.7238 31.7662L25.5707 31.1305C25.3407 30.1769 24.3813 29.5904 23.4277 29.8204L23.3409 29.8436L22.8065 30.0016C22.4848 29.5871 22.2271 29.1172 22.0491 28.6079L22.4462 28.2258C23.1531 27.5456 23.1747 26.4213 22.4946 25.7145L22.4462 25.6661L22.0491 25.284C22.2271 24.7747 22.4848 24.3048 22.8065 23.8903L23.3409 24.0482C24.2816 24.3262 25.2695 23.7889 25.5475 22.8483L25.5707 22.7614L25.7238 22.1257C25.9729 22.0837 26.2285 22.0618 26.489 22.0618ZM26.489 25.6139C25.7781 25.6139 25.2017 26.2103 25.2017 26.9459C25.2017 27.6816 25.7781 28.278 26.489 28.278C27.2 28.278 27.7764 27.6816 27.7764 26.9459C27.7764 26.2103 27.2 25.6139 26.489 25.6139ZM31.4 14.9307C32.641 16.1717 32.641 18.1837 31.4 19.4247L30.5386 20.2854L26.0443 15.792L26.9061 14.9307C28.147 13.6898 30.1591 13.6898 31.4 14.9307Z"
          fill="white"
        />
      </svg>
    </IconButton>
  );
};

export default GridEditButton;