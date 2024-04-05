let Game = {
    new: function() {
        this.running = false;
        this.over = false;
        this.turn = left;
        this.timer = 0;
        this.color = '#2c3e50';
    }
};

/* export */
export { Game };