import { MOVE_DIRECTION, WINNABLE_ROUND } from './script/global.js';
import { Ball } from './script/ball.js';
import { Paddle } from './script/player.js';
import { Game } from './script/game.js';

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 1000;

let GameManager = {
    initialize: function() {
        this.canvas = document.querySelector('canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;

		this.canvas.style.width = (this.canvas.width / 2) + 'px';
		this.canvas.style.height = (this.canvas.height / 2) + 'px';

        // Game
        this.game_info = Game.new();

        // Player
		this.player_left = Player.new('left', this.canvas.width, this.canvas.height);
		this.player_right = Player.new('right', this.canvas.width, this.canvas.height);
		
        // Ball
        this.ball = Ball.new(this.canvas.width, this.canvas.height);
    }
};