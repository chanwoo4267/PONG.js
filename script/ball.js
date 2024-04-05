import { MOVE_DIRECTION } from './global';

const BALL_WIDTH = 18;
const BALL_HEIGHT = 18;
const BALL_SPEED = 9;

/*
    let Ball

    variables:
        width - 공의 가로 크기
        height - 공의 세로 크기
        x - 공의 x좌표 위치
        y - 공의 y좌표 위치
        moveX - 현재 움직이는 방향(X)
        moveY - 현재 움직이는 방향(Y)
        speed - 움직임 속도
    
    methods:
        new : function (canvas_width, canvas_height)
            객체를 생성할 때 초기값을 설정
*/
let Ball = {
	new: function (canvas_width, canvas_height) {
		return {
			width: BALL_WIDTH,
			height: BALL_HEIGHT,
			x: (canvas_width / 2) - (BALL_WIDTH / 2),
			y: (canvas_height / 2) - (BALL_HEIGHT / 2),
			moveX: DIRECTION.IDLE,
			moveY: DIRECTION.IDLE,
			speed: BALL_SPEED
		};
	}
};

/* export */
export { Ball };