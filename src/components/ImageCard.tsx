import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import UploadButtons from "./UploadButton";
import { Grid } from "@mui/material";

interface CardImage {
  image?: string | undefined;
  altText?: string;
  height?: number;
  text?: string;
  imageTitle?: string;
  buttonTexts?: string;
  size?: number;
}

const defaultImage =
  "https://res.cloudinary.com/pxmvault/image/upload/v1661294981/default-thumbnail_xn1tqn.jpg";

export default function ImageCard({
  image,
  altText,
  height,
  text,
  imageTitle,
  buttonTexts,
  size,
}: CardImage) {
  return (
    <Grid item xs={12} md={size}>
      <Card sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          height={height}
          image={image && image.length > 0 ? image : defaultImage}
          alt={altText}
        />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          {imageTitle && (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: "18px" }}
            >
              {imageTitle}
            </Typography>
          )}
          {text && (
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "16px",
          }}
        >
          <UploadButtons text={buttonTexts} />
        </CardActions>
      </Card>
    </Grid>
  );
}
