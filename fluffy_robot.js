let dom_replay = document.querySelector("#replay");
let dom_score = document.querySelector("#score");
let dom_canvas = document.querySelector("#canvas");
let CTX = dom_canvas.getContext("2d");

window.addEventListener('keydown',this.check,false);

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
function rotate() {
    let newBoard = [];
    for (let i =3; i>=0; i--) {
        let row = [];
        for (let j = 0; j<4; j++) {
            row.push(board[j][i]);
        }
        newBoard.push(row);
    }
    board = newBoard
}



function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: alert("Left"); break
        case 38: alert("Up"); break;
        case 39: alert("Right"); break;
        case 40: rotate(); break;
    }
    draw_board();
}

function addNumbers() {
    
}    

function random_box() {

}
draw_board();

