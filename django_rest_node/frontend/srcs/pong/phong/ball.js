export class Ball {
    constructor() {
        this.pos = [0, 0, 0];
        this.dir = [-1, 0, 0];
    }

    len(vec) {
        return vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2];
    }

    dist(vec1, vec2) {
        let answer = [];
        answer.push(vec1[0] - vec2[0]);
        answer.push(vec1[1] - vec2[1]);
        answer.push(vec1[2] - vec2[2]);
        return Math.sqrt(this.len(answer));
    }

    crash(posi) {
        let length = this.dist(this.pos, posi);
        if (length <= 0.5)
            return true;
        return false;
    }

    normalized(vec) {
        let answer = [vec[0], vec[1], vec[2]];
        let length = this.len(vec);
        if (Math.abs(length) < 0.000000001) {
            answer[0] = 0;
            answer[1] = 0;
            answer[2] = 0;
            return answer;
        }
        length = Math.sqrt(length);
        answer[0] /= length;
        answer[1] /= length;
        answer[2] /= length;
        return answer;
    }

    crashStick(stk) {
        if (this.pos[1] > stk.top[1] || this.pos[1] < stk.bottom[1])
            return false;
        if (Math.abs(this.pos[0] - stk.top[0]) > 0.5)
            return false;
        return true;
    }

    dot(vec1, vec2) {
        return Math.abs(vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]);
    }

    update(stick1, stick2, speed) {
        if (this.pos[0] > 15.5 || this.pos[0] < -15.5) {
            this.pos = [0, 0, 0];
            this.dir = [-1, 0, 0];
            return false;
        }
        let dir1 = [0, 0, 0], dir2 = [0, 0, 0], dir3 = [0, 0, 0], dir4 = [0, 0, 0];
        if (this.crash([this.pos[0], 7.75, 0])) {
            let dir_tmp = [0, -1, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[1] *= len;
            dir1 = this.normalized(sumDir(dir_tmp, this.dir));
        }
        if (this.crash([this.pos[0], -7.75, 0])) {
            let dir_tmp = [0, 1, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[1] *= len;
            dir2 = this.normalized(sumDir(dir_tmp, this.dir));
        }
        if (this.crashStick(stick1)) {
            let dir_tmp = [1, 0, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[0] *= len;
            dir3 = this.normalized(sumDir(dir_tmp, this.dir));
            dir3 = this.normalized(sumDir(dir3, stick1.dir));
        }
        if (this.crashStick(stick2)) {
            let dir_tmp = [-1, 0, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[0] *= len;
            dir4 = this.normalized(sumDir(dir_tmp, this.dir));
            dir4 = this.normalized(sumDir(dir4, stick2.dir));
        }
        let total = this.normalized(sumDir(dir1, dir2));
        total = this.normalized(sumDir(total, dir3));
        total = this.normalized(sumDir(total, dir4));
        this.dir = this.normalized(sumDir(total, this.dir));
        let move = this.dir;
        move[0] *= speed;
        move[1] *= speed;
        move[2] *= speed;

        //debug
        console.log("speed : " + speed);
        //console.log("move : " + move);
        
        //test
        this.pos = sumDir(this.pos, move);
        return true;
    }

    updateSquare(stick1, stick2, stick3, stick4, speed) {
        if (this.pos[0] > 15.5 || this.pos[0] < -15.5) {
            this.pos = [0, 0, 0];
            this.dir = [-1, 0, 0];
            return false;
        }
        let dir1 = [0, 0, 0], dir2 = [0, 0, 0], dir3 = [0, 0, 0], dir4 = [0, 0, 0];
        
        if (this.crashStick(stick1)) {
            let dir_tmp = [1, 0, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[0] *= len;
            dir1 = this.normalized(sumDir(dir_tmp, this.dir));
            dir1 = this.normalized(sumDir(dir3, stick1.dir));
        }
        if (this.crashStick(stick2)) {
            let dir_tmp = [-1, 0, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[0] *= len;
            dir2 = this.normalized(sumDir(dir_tmp, this.dir));
            dir2 = this.normalized(sumDir(dir4, stick2.dir));
        }
        if (this.crashStick(stick3)) {
            let dir_tmp = [0, -1, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[1] *= len;
            dir3 = this.normalized(sumDir(dir_tmp, this.dir));
            dir3 = this.normalized(sumDir(dir3, stick1.dir));
        }
        if (this.crashStick(stick4)) {
            let dir_tmp = [0, 1, 0];
            let len = 2 * this.dot(dir_tmp, this.dir);
            dir_tmp[1] *= len;
            dir4 = this.normalized(sumDir(dir_tmp, this.dir));
            dir4 = this.normalized(sumDir(dir4, stick2.dir));
        }
        let total = this.normalized(sumDir(dir1, dir2));
        total = this.normalized(sumDir(total, dir3));
        total = this.normalized(sumDir(total, dir4));
        this.dir[0] *= 2;
        this.dir[1] *= 2;
        this.dir[2] *= 2;
        this.dir = this.normalized(sumDir(total, this.dir));
        let move = this.dir;
        move[0] *= speed;
        move[1] *= speed;
        move[2] *= speed;
        
        //test
        this.pos = sumDir(this.pos, move);
        return true;
    }
}

function sumDir(dir1, dir2) {
    let answer = [0, 0, 0];
    answer[0] = dir1[0] + dir2[0];
    answer[1] = dir1[1] + dir2[1];
    answer[2] = dir1[2] + dir2[2];
    return answer;
}

export class Stick {
    constructor(position) {
        this.top;
        this.bottom;
        this.pos = position;
        if (this.pos[0] < 0) {
            this.top = [this.pos[0] + 0.25, this.pos[1] + 1.5, 0];
            this.bottom = [this.pos[0] + 0.25, this.pos[1] - 1.5, 0];
        }
        else {
            this.top = [this.pos[0] - 0.25, this.pos[1] + 1.5, 0];
            this.bottom = [this.pos[0] - 0.25, this.pos[1] - 1.5, 0];
        }
        this.dir = [0, 0, 0];
    }
    update(move) {
        if (this.top[1] + move > 7.75 || this.bottom[1] + move < -7.75) {
            this.dir = [0, 0, 0];
            return;
        }
        this.top[1] += move;
        this.bottom[1] += move;
        this.pos[1] += move;
        if (move > 0)
            this.dir = [0, 1, 0];
        else if (move < 0)
            this.dir = [0, -1, 0];
        else
            this.dir = [0, 0, 0];
    }
}