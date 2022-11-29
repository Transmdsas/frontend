import React from 'react'
import { Box, Stack } from '@mui/system'
import { Grid, Paper, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
}));

export const CommentsList = ({ data }: any) => {
    console.info("Entro al list ", data);


    return (
        <Grid container spacing={1}>
            <Grid item xs={8}>
                <Stack spacing={1} sx={{
                    paddingLeft: 2,
                    paddingRight: 2
                }}>
                    {data.length > 0 ? (data.map((e: any) => (
                        <React.Fragment> 
                            <Item sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant='body1'>{e}</Typography>
                                <Typography variant='caption' >fecha</Typography>

                            </Item>
                        </React.Fragment>
                    ))) : <Item>No hay comentarios</Item>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}