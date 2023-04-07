import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ButtonInputs {
  color?: string;
  title?: string;
  url?: string;
  handleClick: Function;
}

export const ButtonInput = ({
  color,
  title,
  url,
  handleClick,
}: ButtonInputs) => {
  if (url) {
    return (
      <Link component={RouterLink} to={url}>
        <Button
          color={"primary"}
          variant={"contained"}
          sx={{
            borderRadius: 10,
            width: 200,
            height: 35,
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          {title}
        </Button>
      </Link>
    );
  } else if (color === "primary") {
    return (
      <Button
        color={"primary"}
        variant={"contained"}
        sx={{
          borderRadius: 10,
          width: 200,
          height: 35,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={(e: any) => handleClick(e)}
      >
        {title}
      </Button>
    );
  } else if (color === "secondary") {
    return (
      <Button
        color={"secondary"}
        variant={"contained"}
        sx={{
          borderRadius: 10,
          width: 200,
          height: 35,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={(e: any) => handleClick(e)}
      >
        {title}
      </Button>
    );
  }
};
