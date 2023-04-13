
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Alert, Box, Button, Container, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { PageTitle } from "../PageTitle";
import { CardPageTitle } from "./CardPageTitle";

interface CardImage {
  image?: string | undefined;
  altText?: string;
  height?: number;
  text?: string;
  imageTitle?: string;
  buttonTexts?: string;
  size?: number;
  handleUpload?: Function;
  name?: string;
  error?: boolean;
  accepted?: string;
}

const OneImage =
  "https://www.centrodiesel.com.co/wp-content/uploads/2022/11/nkr-iii-carga-seca.webp";

  const TwoImage =
  "https://www.centrodiesel.com.co/wp-content/uploads/2022/11/nkr-iii-carga-seca.webp";
export default function TwoImageCard({

  altText = "cargar",
  height,
  text = "cargar",
  imageTitle ="foto",
  buttonTexts = 'Cargar',
  size,
  handleUpload,
  image,
  name = "foto",
  error = false,
  accepted,
}: CardImage) {
  return (
    
      <Grid container spacing={2}>         
      
      <Card sx={{
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        marginRight: '10px',
        padding: '65px',
        
        }}>
          
        <CardMedia
          component="img"
          height={height}
          image={image && image.length > 0 ? image : OneImage}
          alt={altText}
        />
        <CardMedia
          component="img"
          height={height}
          image={image && image.length > 0 ? image : TwoImage}
          alt={altText}
          
        />
      
        
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "16px",
            borderTopWidth: '65px'
          }}
        >
          
        </CardActions>
        
      </Card>
    </Grid>
  );
}