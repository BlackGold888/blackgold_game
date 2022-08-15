import WebSocket, { WebSocketServer } from 'ws';
import { Player } from './Player.js';

class GameSocket {
    constructor(server){
        this.players = new WebSocketServer({ server });
        this.players.on('connection',(client) => {
            client.on('message', (data) => {
                const parsed = JSON.parse(data);
                const { eventName, payload } = parsed;
                client.emit(eventName, payload);
            });

            client.player = new Player(client);
        })
    }
}

export { GameSocket }
