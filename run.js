import { MOVE_DIRECTION, WINNABLE_ROUND, CANVAS_HEIGHT, CANVAS_WIDTH } from './script/global.js';
import { Ball } from './script/ball.js';
import { Player } from './script/player.js';
import { Game } from './script/game.js';

const READY_TIME = 2000;

const keyState = {
    87: false, // 'w'
    38: false, // 'up'
    83: false, // 's'
    40: false  // 'down'
};

class GameManager {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.canvas.style.width = (CANVAS_WIDTH / 2) + 'px';
        this.canvas.style.height = (CANVAS_HEIGHT / 2) + 'px';

        this.game = new Game();
        this.player_left = new Player('left');
        this.player_right = new Player('right');
        this.ball = new Ball();

        this.readyTimer = READY_TIME;
    }

    draw = () => {
        // clear canvas
        this.context.clearRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        this.game.drawBack(this.context);
        this.game.drawNet(this.context);
        
        this.player_left.drawPlayer(this.context);
        this.player_right.drawPlayer(this.context);
        this.ball.drawBall(this.context); // check : need to check turnDelay

        this.game.drawScore(this.context);

        if (!this.game.getRunningState())
            this.game.drawMessage(this.context, 'Press any key to begin');
        if (this.game.getOverState())
        {   
            if (this.game.getWinner() === 'left')
                this.game.drawMessage(this.context, "PLAYER LEFT WIN!!!");
            else
                this.game.drawMessage(this.context, "PLAYER RIGHT WIN!!!");
        }
    }

    update() {
        if (!this.game.getOverState())
        {
            // 패배 조건 체크
            if (this.ball.isBallTouchLeftBorder())
                this.resetTurn('left');
            else if (this.ball.isBallTouchRightBorder())
                this.resetTurn('right');

            // 공 움직임
            if (!this.readyTimer)
                this.ball.moveBall();

            // 플레이어 움직임
            this.player_left.movePlayer();
            this.player_right.movePlayer();

            // 공과 플레이어 충돌 판정
            this.ball.hitPlayerPaddle(this.player_left.getPlayerPositionInfo(), this.player_right.getPlayerPositionInfo());
        }

        // 게임 사이사이 Timer, 0이 될때까지 공이 움직이지 않음
        if (this.readyTimer)
        {
            this.readyTimer -= 1000 / 60;
            if (this.readyTimer < 0)
                this.readyTimer = 0;
        }
    }

    loop = () => {
        this.update();
        this.draw();

        if (!this.game.getOverState()) // not over
            requestAnimationFrame(this.loop);
    };

    listen = () => {
        document.addEventListener('keydown', (key) => {
            if (this.game.getRunningState() === false) {
                this.game.setRunningState(true);
                window.requestAnimationFrame(this.loop.bind(this)); // check : okay?
            }

            keyState[key.keyCode] = true;
            this.updatePlayerMovement();
        });

        document.addEventListener('keyup', (key) => {
            
            keyState[key.keyCode] = false;
            this.updatePlayerMovement();
        });
    }

    updatePlayerMovement = () => {
        if (keyState[87]) { // 'w'
            this.player_left.setMoveDirection(MOVE_DIRECTION.UP);
        } else if (keyState[83]) { // 's'
            this.player_left.setMoveDirection(MOVE_DIRECTION.DOWN);
        } else {
            this.player_left.setMoveDirection(MOVE_DIRECTION.IDLE);
        }

        if (keyState[38]) { // 'up'
            this.player_right.setMoveDirection(MOVE_DIRECTION.UP);
        } else if (keyState[40]) { // 'down'
            this.player_right.setMoveDirection(MOVE_DIRECTION.DOWN);
        } else {
            this.player_right.setMoveDirection(MOVE_DIRECTION.IDLE);
        }
    }

    resetTurn(loser) {
        this.ball.resetBall(loser);
        this.game.resetGame(loser);
        this.readyTimer = READY_TIME;
    }
};

let GameExecuter = new GameManager();
GameExecuter.draw();
GameExecuter.listen();