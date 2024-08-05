let dom_replay = document.querySelector("#replay");
let dom_score = document.querySelector("#score");
let dom_canvas = document.querySelector("#canvas");

let CTX = dom_canvas.getContext("2d");

const W = (dom_canvas.width = 500);
const H = (dom_canvas.height = 500);
const SW = (W/4);
const SH = (H/4);
CTX.font = "30px Comic_Sans";
CTX.textAlign = "center";

let board = [];
for (let i = 0; i<4; i++) {
    let row = []
    for (let j = 0; j<4; j++) {
        row.push(i * 4 + j)
    }
    board.push(row);
}

console.log(board);
function draw_board() {
    for (let i = 0; i<4; i++) {
        for (let j = 0; j<4; j++) {
            CTX.beginPath();
            CTX.fillStyle = "#ffcc99";
            CTX.fillRect(j * SW, i * SH, SW, SH);
            CTX.fillStyle = "white";
            CTX.strokeStyle = "white";
            CTX.rect(j * SW, i * SH, SW, SH);
            CTX.fillText(board[i][j],j*SW + SW/2, i*SH + SH/2 +5);
            CTX.stroke();
        }
    }
}

draw_board();