/* -----Constants-----*/
const checkerBoard = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

const redCheckers = {
    color: 'red',
    position: 0,
    king: false,
    // draggable: true,
    class: "checker red-checker",
    player: 'red',
};

const blackCheckers = {
    color: 'black',
    position: 0,
    king: false,
    // draggable: true,
    class: "checker black-checker",
    player: 'black'
};
const moves ={
    redMove: [-3, -4, -5],
    redJump: [-7, -9],
    blackMove: [3, 4, 5],
    blackJump: [7, 9],
    kingMove: [3, -3, 4.-4, 5, -5],
    kingJump: [7, -7, 9, -9]
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
    
}
function redMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
  
    if(moves.redMove.includes(a-b)){
        console.log(a-b)
        square.appendChild(checker);
        selectedPieceArray = [];
    }
    render();
}
function blackMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')

    if(moves.blackMove.includes(a-b)){
        console.log(a-b)
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
    createCheckers();
    setBoard();
    // setAttributes();
}
function setBoard(){
    
    checkerBoard.forEach(function(i){
        console.log(i)
        boardSquares[i].setAttribute('position', checkerBoard[i]);
        boardSquares[i].addEventListener('click', selectSquare)
    })
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