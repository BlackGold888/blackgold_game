import logo from './logo.svg';
import './App.css';
import {emitter as Emitter} from './events';
import { GameSocket } from './socket';
import { useEffect, useState } from 'react';

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
        <div className="App">
            <label htmlFor="">Name</label>
            <input type="text"/>
            <button onClick={ () => {
                addClient();
            } }>Click
            </button>
        </div>
    );
}

export default App;
