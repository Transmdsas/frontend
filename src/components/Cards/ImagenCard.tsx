
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import CardSwitch from "./Switch";
import InformationCard from "./InformationCard";
import { CardPageTitle } from "./CardPageTitle";
import styled from "@emotion/styled";

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

const defaultImage =
  "https://www.centrodiesel.com.co/wp-content/uploads/2022/11/nkr-iii-carga-seca.webp";
  
export default function ImageCard({
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
    <Grid item xs={6} md={size}>
      
        <Stack sx={{ width: 350, height: 30, marginBottom: 4 }} spacing={2}>
        
        </Stack>
        
      <Card sx={{ maxWidth: 350, padding: 3, borderRadius: '20px' }}>
        <CardMedia
          component="img" 
          height={height}
          image={image && image.length > 0 ? image : defaultImage}
          alt={altText}
        />
        <CardPageTitle/>
        <CardContent sx={{ display: "list-item", justifyContent: "center" }}>
          <Typography>
          <InformationCard/>
          </Typography>
        </CardContent>
        <CardActions>
          
         
          
          
          <CardSwitch/>
          <Button
        color={"secondary"}
        variant={"contained"}
        sx={{
          borderRadius: 10,
          width: 200,
          height: 35,
          "&:hover": {
            transform: "scale(1.1)",
            position: "static"
          },
        }}
        // onClick={(e: any) => handleClick(e)}
      >
        Editar
      </Button>
          {/* <UploadButton
            text={buttonTexts}
            //handleUpload={(e: any) => handleUpload(e)}
            name={name}
            accepted={accepted}
          /> */}
        </CardActions>
      </Card>
    </Grid>
  );
}