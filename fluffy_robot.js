let dom_replay = document.querySelector("#replay");
let dom_score = document.querySelector("#score");
let dom_canvas = document.querySelector("#canvas");
let dom_win = document.querySelector("#win");
let dom_new = document.querySelector("#new");
let dom_continue = document.querySelector("#continue");
let CTX = dom_canvas.getContext("2d");
let dom_lose = document.querySelector("#lose");
let dom_newgame = document.querySelector("#newgame");
let dom_highscore = document.querySelector("#highScore");

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
let score = 0
const W = (dom_canvas.width = 500);
const H = (dom_canvas.height = 500);
const SW = (W / 4);
const SH = (H / 4);
CTX.font = "30px Comic Sans";
CTX.textAlign = "center";

// dom_lose.style.display = 'block';

let board = [];
function reset() {
    board = [];
    for (let i = 0; i < 4; i++) {
        let row = []
        for (let j = 0; j < 4; j++) {
            row.push(0);
        }
        board.push(row);
        
    }
    score = 0;
    dom_score.innerHTML = score.toString();
    dom_win.style.display = 'none';
}

console.log(board);
function draw_board() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            CTX.beginPath();
            if(board[i][j] == 0) {
                CTX.fillStyle = "#E3CAA0";
                //#E3CAA0 #ffcc99
                CTX.fillRect(j * SW, i * SH, SW, SH);
            }
            if(board[i][j] > 0) {
                //Get Better Colors
                let r = Math.log2(board[i][j]) / 12 * -57 + 234;
                let g = Math.log2(board[i][j]) / 12 * -66 + 192;
                let b = Math.log2(board[i][j]) / 12 * 6 + 25;
                CTX.fillStyle = "rgba(" + r +", " + g + ", " + b + ", 1)";
                CTX.fillRect(j * SW, i * SH, SW, SH);
                CTX.fillStyle = "white";
                CTX.fillText(board[i][j], j * SW + SW / 2, i * SH + SH / 2 + 5);
            }
            CTX.strokeStyle = "#BDA989";
            CTX.lineWidth = 5;
            CTX.rect(j * SW, i * SH, SW, SH);
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
let menu = true;
function check(e) {
    if (menu == false) {
        return
    }
    let prev = board;
    var code = e.keyCode;
    switch (code) {
        case 83: dom_win.style.display = 'block'; break
        case 65: dom_lose.style.display = 'block'; break
        case 70: localStorage.setItem("highScore", 29452); dom_highscore.innerHTML = 29452; break
        case 68: localStorage.setItem("highScore", 0); dom_highscore.innerHTML = 0; break
        case 37: rotate(); rotate(); rotate(); rotate(); squish(); add_boxes(); squish(); draw_board(); break
        case 38: rotate(); squish(); add_boxes(); squish(); rotate(); rotate(); rotate(); draw_board(); break;
        case 39: rotate(); rotate(); squish(); add_boxes(); squish(); rotate(); rotate(); draw_board(); break;
        case 40: rotate(); rotate(); rotate(); squish(); add_boxes(); squish(); rotate(); draw_board(); break;
    }
    for (let i = 0; i<4; i++) {
        for (let j = 0; j<4; j++) {
            if (prev[i][j] != board[i][j]) {
                random_box();
                draw_board();
                return;
            }
        }
    }
    if (lose() == false) {
        dom_lose.style.display = 'block';
        menu = false;

    }
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
                score = score + board[i][j];
                if (score > localStorage.getItem("highScore")) {
                    localStorage.setItem("highScore", score);
                    dom_highscore.innerHTML = score.toString();
                    draw_board();
                }
                dom_score.innerHTML = score.toString();
                if (board[i][j] == 2048) {
                    dom_win.style.display = 'block';
                    menu = false;
                }
            }
        }
    }
}

dom_replay.addEventListener("click", () => {
    reset();
    random_box();
    draw_board();
    dom_lose.style.display = 'none';
});

dom_newgame.addEventListener("click", () => {
    reset();
    random_box();
    draw_board();
    dom_lose.style.display = 'none';
});

dom_new.addEventListener("click", () => {
    reset();
    random_box();
    draw_board();
    dom_lose.style.display = 'none';
    menu = true;
})

dom_continue.addEventListener("click", ()=> {
    dom_win.style.display = 'none';
    menu = true;
})

function lose() {
    for(i = 0; i<4; i++) {
        for(j = 0; j<4; j++) {
            if(board[i][j] == 0) {
                return true
            }}}
    for (let i = 0; i<4; i++) {
        rotate();
        for (let j = 0; j<4; j++) {
            for (let k = 0; k<4; k++) {
                if(board[j][k] == board[j][k+1]) {
                    return true
                }
            }
        }
    }
    return false
}
localStorage.setItem("highScore", 0);

reset();
random_box();
draw_board();
