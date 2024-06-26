import { Buffer } from "./graphics/Buffer.js"
import { DefaultFramebuffer } from "./graphics/DefaultFramebuffer.js"
import { Geometry } from "./graphics/Geometry.js"
import { Mat4x4 } from "./graphics/Mat4x4.js"
import { Mesh } from "./graphics/Mesh.js"
import { Program } from "./graphics/Program.js"
import { Shader } from "./graphics/Shader.js"
import { VertexBuffer } from "./graphics/VertexBuffer.js"
import { Ball, Stick } from "./phong/ball.js"

class Main {
    static gl = null;
    static	program = null;
    static	mesh = null;
    static	mesh2 = null;
    static	mesh3 = null;
    static	mesh4 = null;
    static	ball = null;
    static	stick1 = null;
    static	stick2 = null;
    static keyA = 0;
    static keyQ = 0;
    static lastTime = 0;

    static entry() {
        const canvas = document.getElementById("canvas");
        // canvas.width = document.body.clientWidth;
        // canvas.height = document.body.clientHeight;
        canvas.width = 1200;
        canvas.height = 650;
        const	gl = canvas.getContext("webgl2");
        if (!gl) {
            alert("Webgl2 not supported!");
        }
        // 크기 대응 필요

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        const vs = new Shader(gl, gl.VERTEX_SHADER);
        const fs = new Shader(gl, gl.FRAGMENT_SHADER);
        vs.shaderSource(`#version 300 es
        in vec4	position;
        in vec4 color;

        uniform mat4 model;
        uniform mat4 vp;

        out vec4	col;

        vec4 moveMatrix = vec4(0, 0, 0, 0);
        void	main() {
            gl_Position = vp * model * position;
            col = color;
        }`);
        fs.shaderSource(`#version 300 es
        precision mediump float; // float의 바이트를 정함

        in vec4	col;

        out vec4	fragColor;

        void	main() {
            fragColor = col;
        }`);
        vs.compile();
        fs.compile();
        const program = new Program(gl);
        program.attach(vs);
        program.attach(fs);
        program.link();

        // sphere
        let sphere = new Geometry();
        sphere.createSphere();
        const data = new Float32Array(sphere.vertices);
        const	vertex_buffer = new Buffer(gl, gl.ARRAY_BUFFER, sphere.vertices.length * 4, gl.STATIC_DRAW); // 버퍼 생성
        vertex_buffer.setData(0, data, 0, sphere.vertices.length * 4); // 버퍼 정보 입력
        const	position_view = new VertexBuffer(gl, vertex_buffer, 3, gl.FLOAT, false); // 버택스 버퍼(포지션) 읽는 형식 설정 
        let tmpArr = [1, 1, 1, 1];
        let color = [];
        for (let i = 0; i < 21 * 21; i++) {
            for (let j = 0; j < 4; j++)
                color.push(tmpArr[j]);
        }
        color = new Float32Array(color);
        const color_buffer = new Buffer(gl, gl.ARRAY_BUFFER, color.length * 4, gl.STATIC_DRAW);
        color_buffer.setData(0, color, 0, color.length * 4);
        const	color_view = new VertexBuffer(gl, color_buffer, 4, gl.FLOAT, false); 
        const	buffer_view = { // 쉐이더와 데이터 형식 일치
            "position": position_view,
            "color": color_view,
        };
        const	mesh = Mesh.from(gl, buffer_view, sphere.indices); // 메쉬 생성

        // stick1
        let box1 = new Geometry();
        box1.createBox(0.5, 3);
        const v_buffer = new Buffer(gl, gl.ARRAY_BUFFER, 72 * 4, gl.STATIC_DRAW);
        v_buffer.setData(0, new Float32Array(box1.vertices), 0, 72 * 4);
        const pos_view = new VertexBuffer(gl, v_buffer, 3, gl.FLOAT, false);
        let color_data = [];
        let tmp = [0.0, 1.0, 0.0, 1.0];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 4; j++)
                color_data.push(tmp[j]);
        }
        color_data = new Float32Array(color_data);
        const color_box = new Buffer(gl, gl.ARRAY_BUFFER, color_data.length * 4, gl.STATIC_DRAW);
        color_box.setData(0, color_data, 0, color_data.length * 4);
        const color_box_view = new VertexBuffer(gl, color_box, 4, gl.FLOAT, false);
        buffer_view["position"] = pos_view;
        buffer_view["color"] = color_box_view;
        const	mesh2 = Mesh.from(gl, buffer_view, box1.indices); // 메쉬 생성

        // wall
        let box2 = new Geometry();
        box2.createBox(30, 0.5);
        const box2_buffer = new Buffer(gl, gl.ARRAY_BUFFER, box2.vertices.length * 4, gl.STATIC_DRAW);
        box2_buffer.setData(0, new Float32Array(box2.vertices), 0, box2.vertices.length * 4);
        const box2_view = new VertexBuffer(gl, box2_buffer, 3, gl.FLOAT, false);
        buffer_view["position"] = box2_view;
        buffer_view["color"] = color_view;
        const mesh3 = Mesh.from(gl, buffer_view, box2.indices);

        // stick2
        buffer_view["position"] = pos_view;
        const mesh4 = Mesh.from(gl, buffer_view, box1.indices);

        // view 행렬 설정
        let camMatrix = Mat4x4.camMatrix([0, 0, 1], [0, 1, 0], [0, 0, 20]);
        let viewMatrix = Mat4x4.viewMatrix(camMatrix);
        
        // 투영 행렬 설정
        let projectionMatrix = Mat4x4.projectionMatrix(Math.PI / 3, 0.1, 1000, canvas.width / canvas.height);
        let vpLocation = gl.getUniformLocation(program.id, "vp");
        let vpMatirx = Mat4x4.multipleMat4(projectionMatrix, viewMatrix);

        program.use();
        gl.uniformMatrix4fv(vpLocation, true, vpMatirx);

        Main.gl = gl;
        Main.program = program;
        
        Main.mesh = mesh;
        Main.mesh2 = mesh2;
        Main.mesh3 = mesh3;
        Main.mesh4 = mesh4;

        Main.ball = new Ball();
        Main.stick1 = new Stick([-15, 0, 0]);
        Main.stick2 = new Stick([15, 0, 0]);

        Main.lastTime = performance.now();
        document.addEventListener('keydown', function (event) {
            if (event.code === 'KeyQ')
                Main.keyQ = 1;
            if (event.code == 'KeyA')
                Main.keyA = 1;
        });
        document.addEventListener('keyup', function (event) {
            if (event.code === 'KeyQ')
                Main.keyQ = 0;
            if (event.code == 'KeyA')
                Main.keyA = 0;
        });
    }
    static render() {
            DefaultFramebuffer.setClearColor(0.4, 0.4, 0.4, 1.0);
            Main.gl.enable(Main.gl.CULL_FACE | Main.gl.DEPTH_BUFFER_BIT);
            Main.gl.cullFace(Main.gl.BACK);
            DefaultFramebuffer.clearColor(Main.gl);

            let modelLocation = Main.gl.getUniformLocation(Main.program.id, "model");

            Main.program.use();

            // ball
            Main.gl.uniformMatrix4fv(modelLocation, true, Mat4x4.transportMat(Main.ball.pos));
            Main.mesh.draw(Main.program);

            // stick1
            Main.gl.uniformMatrix4fv(modelLocation, true, Mat4x4.transportMat(Main.stick1.pos));
            Main.mesh2.draw(Main.program);

            // stick2
            Main.gl.uniformMatrix4fv(modelLocation, true, Mat4x4.transportMat(Main.stick2.pos));
            Main.mesh4.draw(Main.program);

            // wall_1
            Main.gl.uniformMatrix4fv(modelLocation, true, Mat4x4.transportMat([0, 8, 0]));
            Main.mesh3.draw(Main.program);

            // wall_2
            Main.gl.uniformMatrix4fv(modelLocation, true, Mat4x4.transportMat([0, -8, 0]));
            Main.mesh3.draw(Main.program);
    }
    static update() {
        let dt = (performance.now() - Main.lastTime) / 1000;
        Main.lastTime = performance.now();
        

        Main.stick1.update((Main.keyQ - Main.keyA) * 10 * dt);
        if (Main.ball.pos[1] > Main.stick2.top[1])
            Main.stick2.update(10 * dt);
        else if (Main.ball.pos[1] < Main.stick2.bottom[1])
            Main.stick2.update(-10 * dt);
        Main.ball.update(Main.stick1, Main.stick2, 10 * 0.01);

        Main.render();
        requestAnimationFrame(Main.update);
    }
}

let flag = false;

export function pong_js() {
    console.log("pong.js executed!");

    Main.entry();
    if (!flag)
    {
        requestAnimationFrame(Main.update);
        flag = true;
    }
    return null;
}