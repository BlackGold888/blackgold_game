import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

function Login({ addClient, setPlayerName }) {
    return (
        <>
            <Box sx={
                {
                    width: '100%',
                    justifyContent: 'center',
                    display: 'flex',
                }
            }>
                <Stack spacing={ 4 }>
                    <TextField
                        onChange={ (e) => setPlayerName(e.target.value) }
                               id="standard-basic" label="Enter Name" variant="standard"/>
                    <Button
                        onClick={addClient}
                        variant="contained"
                    >Login</Button>
                </Stack>
            </Box>
        </>
    );
}

export default Login;
