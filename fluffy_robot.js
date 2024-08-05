let dom_replay = document.querySelector("#replay");
let dom_score = document.querySelector("#score");
let dom_canvas = document.querySelector("#canvas");
let CTX = dom_canvas.getContext("2d");

window.addEventListener('keydown', this.check, false);

const start = {
    r:234,
    g:192,
    b:25,
}
const end = {
    r:177,
    g:126,
    b:31,
}
const W = (dom_canvas.width = 500);
const H = (dom_canvas.height = 500);
const SW = (W / 4);
const SH = (H / 4);
CTX.font = "30px Comic_Sans";
CTX.textAlign = "center";

let board = [];
for (let i = 0; i < 4; i++) {
    let row = []
    for (let j = 0; j < 4; j++) {
        row.push(0);
    }
    board.push(row);
}

console.log(board);
function draw_board() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            CTX.beginPath();
            CTX.fillStyle = "#ffcc99";
            CTX.fillRect(j * SW, i * SH, SW, SH);
            CTX.fillStyle = "white";
            CTX.strokeStyle = "white";
            CTX.rect(j * SW, i * SH, SW, SH);
            CTX.fillText(board[i][j], j * SW + SW / 2, i * SH + SH / 2 + 5);
            CTX.stroke();
        }
    }
}
function rotate() {
    let newBoard = [];
    for (let i = 3; i >= 0; i--) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            row.push(board[j][i]);
        }
        newBoard.push(row);
    }
    board = newBoard;
}

function squish() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                board[i].splice(j, 1);
                j--;
            }
        }
        while (board[i].length < 4) {
            board[i].push(0);
        }
    }
}

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: squish(); add_boxes(); squish(); break
        case 38: rotate(); squish(); add_boxes(); squish(); rotate(); rotate(); rotate(); break;
        case 39: rotate(); rotate(); squish(); add_boxes(); squish(); rotate(); rotate(); break;
        case 40: rotate(); rotate(); rotate(); squish(); add_boxes(); squish(); rotate(); break;
    }
    random_box();
    draw_board();
}

function random_box() {
    let daniel = [];
    for(i = 0; i<4; i++) {
        for(j = 0; j<4; j++) {
            if(board[i][j] == 0) {
                daniel.push([i,j]);
            }
        }
    }
    let chosen_one = daniel[Math.round(Math.random() * daniel.length)];
    board[chosen_one[0]][chosen_one[1]] = 2;
}

function add_boxes() {
    for(let i = 0; i<4; i++) {
        for(let j = 0; j<4; j++) {
            if(board[i][j] == board[i][j+1]) {
                board[i][j] = board[i][j] * 2;
                board[i][j+1] = 0;
            }
        }
    }
}

function color_change(color_value) {
    let r = color_value / 4096 *
    let g = 1;
    let b = 1;
    color_value / 4096 
}
random_box();
draw_board();

