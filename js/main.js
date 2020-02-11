/* -----Constants-----*/
const checkerBoard =[ 
    [1,1],[1,3],[1,5],[1,7],
    [2,2],[2,4],[2,6],[2,8],
    [3,1],[3,3],[3,5],[3,7],
    [4,2],[4,4],[4,6],[4,8],
    [5,1],[5,3],[5,5],[5,7],
    [6,2],[6,4],[6,6],[6,8],
    [7,1],[7,3],[7,5],[7,7],
    [8,2],[8,4],[8,6],[8,8],
];

const redCheckers = {
    color: 'red',
    position: [],
    king: false,
    class: "checker red-checker",
    player: 'red',
};
const blackCheckers = {
    color: 'black',
    position: [],
    king: false,
    class: "checker black-checker",
    player: 'black'
};
const moves ={
    redMove: {
        x:[-1, -1],
        y:[-1, 1]},
    redJump: [[-2,-2],[-2,2]],
    blackMove: {
        x: [1,1],
        y: [1,-1]},
    blackJump: [[2, 2],[2,-2]],
    kingMove: [[1,1],[1,-1],[-1,-1],[-1,1]],
    kingJump: [[2,2],[2,-2],[-2,-2], [-2,2],]
}

/* -----app state(variables)-----*/
const scores ={
    redPieceCount: 12,
    blackPieceCount: 12,
    player1: 'red',
    player2: 'black',
    winner: null,
    redPiecesTaken: 0,
    blackPiecesTaken: 0,
    
};
let pieceSelected = false;
let playerTurn = redCheckers.player;
let selectedPieceArray = [];
/* -----chached elements-----*/
const boardSquares = document.getElementsByClassName('white-board-square');
const scoreElements = {
    rpCount: document.querySelector('#red-piece-count'),
    bpTaken: document.querySelector('#black-pieces-taken'),
    bpCount: document.querySelector('#black-piece-count'),
    rpTaken: document.querySelector('#red-pieces-taken')
};

/* -----event listeners-----*/
document.querySelector('button').addEventListener('click', play);

/* -----functions-----*/
function checkerSelection(evt){
    let target = evt.target;
    evt.stopImmediatePropagation();
    if(target.attributes.player.value !== playerTurn) return
    console.log(target)
    selectedPieceArray.push(target)
    pieceSelected = true;
    console.log(selectedPieceArray)
}
function selectSquare(evt){
    let targetSquare = evt.target;
    let targetPiece = selectedPieceArray[0];
 
    if(pieceSelected === false) return

    if(targetPiece.getAttribute('player') === 'red'){
        redMove(targetSquare, targetPiece);
    }
    if(targetPiece.getAttribute('player') === 'black'){
        blackMove(targetSquare, targetPiece);
    }

    pieceSelected = false;
    targetpiece = [];
}
function redMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
    console.log(a[1]);
    console.log(b[1]);
    let x = a[0] - b[0];
    let y = a[2] - b[2];
    let z = [x,y];
    console.log(z);
    

    if((moves.redMove.x[0] === x && moves.redMove.x[1] === y) || moves.redMove.y[0] === x && moves.redMove.y[1] === y){
        console.log('fuck me')
        checker.setAttribute('position', square.attributes.position.value)
        square.setAttribute('occupied', true)
        checker.parentElement.setAttribute('occupied', false)
        square.appendChild(checker);
        selectedPieceArray = [];
    }
    render();
}
function blackMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
    console.log(a[1]);
    console.log(b[1]);
    let x = a[0] - b[0];
    let y = a[2] - b[2];
    let z = [x,y];
    console.log(z);

    if((moves.blackMove.x[0] === x && moves.blackMove.x[1] === y) || moves.blackMove.y[0] === y && moves.blackMove.y[1] === y){
        console.log(a-b)
        checker.setAttribute('position', square.attributes.position.value)
        checker.parentElement.setAttribute('occupied', false)
        square.setAttribute('occupied', true)
        square.appendChild(checker);
        selectedPieceArray = [];
    }
    render();
}   
function render(){

    if(scores.redPieceCount === 0){
        winner = player2;
        console.log('Congrats Player 2! You win')
    }
    if(scores.blackPieceCount === 0){
        winner = player1;
        console.log('Congrats Player 2! You win')
    }
    changeTurn();
}
function changeTurn(){
    
    if(playerTurn === scores.player1){
        playerTurn = scores.player2;
    }else{
        playerTurn = scores.player1;
    };
}


// These functions operates the drag and drop/moves
// function drag(ev){
// console.log(ev.target.class)
//     // if(ev.target.id === 'checker20'){
//     //     return
//     // }
//     ev.dataTransfer.setData('div', ev.target.id)


// }
// function allowDrop(ev){
//     ev.preventDefault();
//     // console.log('hello')
// }
// function drop(ev){
//     ev.preventDefault();
//     var chck = ev.dataTransfer.getData("div");
//     ev.target.appendChild(document.getElementById(chck));
// }

// function setAttributes(){
//     for( let i = 0; i < boardSquares.length; i++)
//     {
//         boardSquares[i].setAttribute("ondrop", "drop(event)")
//         boardSquares[i].setAttribute("ondragover", "allowDrop(event)")
//     }
// }

//Initialinzing gameplay function


function play(){
    removeCheckers();
    init(); 
}

function init(){
    renderScores();
    setBoard();
    createCheckers();
    
    // setAttributes();
}
function setBoard(){
    
    for(let i = 0; i <boardSquares.length; i++){
        boardSquares[i].setAttribute('position', checkerBoard[i]);
        boardSquares[i].addEventListener('click', selectSquare)
        boardSquares[i].setAttribute('occupied', false)
    }

}

function renderScores(){
    scoreElements.rpCount.innerText = scores.redPieceCount;
    scoreElements.bpTaken.innerText = scores.blackPiecesTaken;
    scoreElements.bpCount.innerText = scores.blackPieceCount;
    scoreElements.rpTaken.innerText = scores.redPiecesTaken;
}

function removeCheckers(){
    let element = document.querySelectorAll('.checker')
        element.forEach(el => {
            el.remove(el);        
    });
}
function createCheckers(){
    
    for(let i = 0; i < 12; i++){
        const checker = document.createElement('div'); 
        checker.setAttribute('class', redCheckers.class)
        checker.setAttribute('color', redCheckers.color)
        checker.setAttribute('player', redCheckers.player)
        checker.setAttribute('position', checkerBoard[i])
        boardSquares[i].appendChild(checker);
        checker.addEventListener('click', checkerSelection)
        boardSquares[i].setAttribute('occupied', true);
        //checker.setAttribute('draggable', redCheckers.draggable)
        //checker.setAttribute('ondragstart', 'drag(event)');
    }

    for(let i = 20; i < 32; i++){
        const checker = document.createElement('div'); 
        checker.setAttribute('class',  blackCheckers.class);
        checker.setAttribute('color', blackCheckers.color);
        checker.setAttribute('player', blackCheckers.player);
        boardSquares[i].appendChild(checker);
        checker.setAttribute('position',checkerBoard[i] )
        checker.addEventListener('click', checkerSelection)
        boardSquares[i].setAttribute('occupied', true);
        //checker.setAttribute('draggable', blackCheckers.draggable);
        //checker.setAttribute('ondragstart', 'drag(event)');
    }
}