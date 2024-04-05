const PLAYER_WIDTH = 18;
const PLAYER_HEIGHT = 70;
const PLAYER_DIST_X = 150;
const PLAYER_DIST_Y = 35

/*
    let Player

    variables:
        width - 플레이어 패들의 가로 길이
        height - 플레이어 패들의 세로 길이
        x - 플레이어 패들의 x 좌표
        y - 플레이어 패들의 y 좌표
        score - 플레이어가 획득한 점수
        move - 플레이어 패들이 움직이는 방향 (y)
        speed - 플레이어 패들의 속도
        side - 플레이어 진영(left, right)
    
    methods:
        new : function (dir, canvas_width, canvas_height)
            객체를 생성할 때 초기값을 설정
*/
let Player = {
	new: function (dir, canvas_width, canvas_height) {
		return {
			width: PLAYER_WIDTH,
			height: PLAYER_HEIGHT,
			x: dir === 'left' ? PLAYER_DIST_X : canvas_width - PLAYER_DIST_X,
			y: (canvas_height / 2) - (PLAYER_WIDTH * 2),
			score: 0,
			move: DIRECTION.IDLE,
			speed: 10,
            side: dir
		};
	}
};

/* export */
export { Player };