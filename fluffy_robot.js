let dom_replay = document.querySelector("#replay");
let dom_score = document.querySelector("#score");
let dom_canvas = document.createElement("canvas");
document.querySelector("canvas").appendChild
(dom_canvas);
let CTX = dom_canvas.getContext("2d");

const W = (dom_canvas.width = 500);
const H = (dom_canvas.height = 500);

let board = [];
for (let i = 0; i<4; i++) {
    let row = []
    for (let j = 0; j<4; j++) {
        row.push(i * 4 + j)
    }
    board.push(row);
}

console.log(board);
// function draw_board()