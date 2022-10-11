import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { UploadButton } from "./forms";
import { Alert, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";

interface CardImage {
  image?: string | undefined;
  altText?: string;
  height?: number;
  text?: string;
  imageTitle?: string;
  buttonTexts?: string;
  size?: number;
  handleUpload: Function;
  name?: string;
  error?: boolean;
  accepted?: string;
}

const defaultImage =
  "https://res.cloudinary.com/pxmvault/image/upload/v1661294981/default-thumbnail_xn1tqn.jpg";

export default function ImageCard({
  altText,
  height,
  text,
  imageTitle,
  buttonTexts,
  size,
  handleUpload,
  image,
  name,
  error,
  accepted,
}: CardImage) {
  return (
    <Grid item xs={6} md={size}>
      {error && (
        <Stack sx={{ width: 250, marginBottom: 2 }} spacing={2}>
          <Alert variant="outlined" severity="error">
            tiene que subir una foto en este campo
          </Alert>
        </Stack>
      )}
      <Card sx={{ maxWidth: 250 }}>
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
          <UploadButton
            text={buttonTexts}
            handleUpload={(e: any) => handleUpload(e)}
            name={name}
            accepted={accepted}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
