class Player {
    constructor(player) {
        this.player = player;
        // Init all events
        this.init();
    }

    init() {
        this.player.on('player.add', this.playerAddHandle);
    }

    playerAddHandle = (data) => {
        console.log('client added');
        this.player.send(JSON.stringify({ eventName: 'player.added', payload: data }));
    }
}

export { Player };
