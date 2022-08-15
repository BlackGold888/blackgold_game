import './App.css';
import { emitter as Emitter } from './events';
import { GameSocket } from './socket';
import { useEffect, useState } from 'react';
import { Container, Paper, styled } from '@mui/material';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [socket, setSocket] = useState(new GameSocket('ws://localhost:3000'));
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');

    const addClient = () => {
        if (playerName.length < 3) {
            console.log('Player name must be at least 3 characters long');
            toast.error('Player name must be at least 3 characters long');
            return;
        }

        const client = {
            name: playerName,
            age: 25,
            balance: 100
        };
        socket.callRemote('player.add', client);
    };

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
                height: '100vh',
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Login addClient={ addClient } setPlayerName={setPlayerName} /> } />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme={'dark'}
            />
        </Container>
    );
}

export default App;
