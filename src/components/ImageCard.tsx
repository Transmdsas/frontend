import React, { useState } from 'react';
import { Button, CardContent, CardMedia, CircularProgress, FormControlLabel, Grid, Stack } from '@mui/material';
import { useField } from "formik";


interface Image {
  name: string;
  url: string;
}

const ImageUploader: React.FC = (props: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<Image | null>(null);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      setUploading(true);
      // Aquí se realiza la subida de la imagen al servidor
      // y se guarda la URL en la base de datos
      setTimeout(() => {
        setImage({ name: selectedFile.name, url: '' });
        setUploading(false);
      }, 2000);
    }
  };

  return (
    
    <Grid container spacing={16} >
      <Grid item xs={12} sm={6} >
        <h1> Cargar Foto   </h1>
        {/* <Stack sx={{ width: 250, marginBottom: 2 }} spacing={2}>
          <Alert variant="outlined" severity="error">
            tiene que subir una foto en este campo
          </Alert>
        </Stack> */}
        
        <CardMedia >
          <input type="file" onChange={handleFileInput} />
          {previewUrl && <img src={previewUrl} alt="avatar.name" width="100%"  />}
        </CardMedia>
      
      <Grid item xs={12} sm={6}>
        <CardContent sx={{ display: "flex" }}>
          {uploading && <CircularProgress />}
          {/* {image && (
            <>
              <h1>{image.name}</h1>
             
            </>
          )} */}

          {!uploading && !image && (
            <Button variant="contained" color="primary" onClick={handleUploadClick}>
              Subir imagen
            </Button>
            
          )}
        </CardContent >
      </Grid>
    </Grid>
    </Grid>
  );
};
export default ImageUploader;
