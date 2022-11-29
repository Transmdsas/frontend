import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AccountCircle, Send } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import { CommentsList } from './CommentsList';

const CommentsContainer = () => {
  const [data, setData]: any = useState([]);
  const [text, setText]: any = useState('');


  const handleSave = () => {
    setData([...data, text])
    console.log(data)
    setText('');
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{
        padding: 2
      }}>
        <Grid item xs={8}>
          <TextField
            className="text-input"
            fullWidth
            variant="outlined"
            value={text}
            // error={meta.touched && Boolean(meta.error)}
            // helperText={meta.touched && meta.error}
            size="small"
            sx={{
              // marginTop: 1,
              // marginBottom: 1,
              "& .MuiInputBase-root": { borderRadius: "20px" },
            }}
            label="Comentarios"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} pl={4}>
          {/* <Button variant="contained" onClick={handleSave} endIcon={<Send />}></Button>*/}
          <IconButton color='primary' aria-label='Agregar Comentario' onClick={handleSave}>
            <Send />
          </IconButton>
        </Grid>

      </Grid>
      <CommentsList data={data} />
    </React.Fragment>
  );
}




export { CommentsContainer };

