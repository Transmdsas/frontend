
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Alert, Box, Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { PageTitle } from "../PageTitle";
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

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
`

const CardContainer = styled.div`
  width: 100%;
  padding: 10px;
`
const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

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
        width: '70%',
        display: 'flex',
        flexDirection: "column",
        marginRight: '10px',
        padding: '20px',
        borderRadius: 10,
        }}>
        
        <CardPageTitle />

        <Container>
          {[1,2].map((_,index)=>(<CardContainer>
            <CardMedia
              component="img"
              height={300}
              image={image && image.length > 0 ? image : OneImage}
              alt={altText}
            />
            {index == 0 ? <InfoContainer>
              <div style={{}}>
                <h3>BMP 123</h3>
                <span>Mitsimisu fus</span>
              </div>
              <div>
                <h3>Modelo: 123</h3>
                <span><label>Peso total: </label>{'444'}</span>
              </div>
              <div>
                <h3>Largo: 4.5m</h3>
                <span><label>dsad: </label>{'test'}</span>
              </div>
            </InfoContainer>: 
            <InfoContainer>
              <div>
              <h3>Largo: 4.5m</h3>
              <span><label>dsad: </label>{'test'}</span>
            </div>
          </InfoContainer>
            }
          </CardContainer>))}
        </Container>
          
       
        {/* <CardMedia
          component="img"
          height={height}
          image={image && image.length > 0 ? image : TwoImage}
          alt={altText}
        /> */}
      
        
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