import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const BasicStack = ({data}:any) => {
  console.log(data);
  return (
    <Box sx={{ width: '100%',  maxHeight: 200,
    overflow: 'auto' }}>
      <Stack spacing={2}>
        {data.map((e:any)=>(
          <Item>{e.text}</Item>
        ))
        }     
      </Stack>
    </Box>
  );
}

const Comments = () => {
  const [data, setData]:any = useState([]);
  const [text, setText]:any = useState('');


  const handleSave = ()=>{
    setData([...data, {text}])
    console.log(data)
  }

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
       
      }}
      
    >
      

      <div style={{display: 'flex'}}>
        <div style={{position: 'relative', width: '300px'}}>
        <AccountCircle style={{position: 'absolute', bottom: 0, right: '10px'}}/>
        <TextField style={{position: 'absolute', left: 0, }} fullWidth label="fullWidth" id="fullWidth" onChange={(e)=>setText(e.target.value)}/>
        
        </div>
        <Button variant="contained" onClick={handleSave}>Enviar</Button>
      </div>

      {data &&
        <BasicStack data={data}/>
      }
      
     
    </Box>
  );
}




export {Comments};

