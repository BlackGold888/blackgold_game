import './App.css';
import {emitter as Emitter} from './events';
import { GameSocket } from './socket';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Stack, styled } from '@mui/material';
import * as PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function App() {
    const [socket, setSocket] = useState(new GameSocket('ws://localhost:3000'));
    const [players, setPlayers] = useState([]);

    const addClient = () => {
        const client = {
            name: 'BlackGold',
            age: '25'
        }
        socket.callRemote('player.add', client);
    }

    useEffect(() => {
        Emitter.on('player.added', (data) => {
            console.log('client added');
            console.log(JSON.stringify(data));
        });
    }, []);

    return (
        <Container maxWidth="sm" sx={
            {
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }
        }>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={4}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Stack>
            </Box>
        </Container>
    );
}

export default App;
