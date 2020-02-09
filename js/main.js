/* -----Constants-----*/
const checkerBoard = [
    [1,1], [1,3], [1,5], [1,7],
    [2.2], [2,4], [2,6], [2,8],
    [3,1], [3,3], [3,5], [3,7],
    [4,2], [4,4], [4,6], [4,8],
    [5,1], [5,3], [5,5], [5,7],
    [6,2], [6,4], [6,6], [6,8],
    [7,1], [7,3], [7,5], [7,7],
    [8,2], [8,4], [8,6], [8,8]

];

const redCheckers = {
    color: 'red',
    position: [1,1],
    king: false,
    draggable: true,
    class: "checker red-checker",
    player1: 'red',
};

const blackCheckers = {
    color: 'black',
    position: [8,2],
    king: false,
    draggable: true,
    class: "checker black-checker"
};

/* -----app state(variables)-----*/
const scores ={
    redPieceCount: 12,
    blackPieceCount: 12,
    player1: 'red',
    player2: 'black',
    winner: false,
    redPiecesTaken: 0,
    blackPiecesTaken: 0,
    
};
let playerTurn = redCheckers.player1;
console.log(playerTurn)
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

function render(){


    if(redPieceCount === 0){
        winner = player2;
        console.log('Congrats Player 2! You win')
    }
    if(blackPieceCount === 0){
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
function checkerSelection(evt){
    console.log(evt.target.attributes.player1)

    if(evt.target.attributes.player1 !== playerTurn) return

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
    init();
    // removeCheckers();
}

function init(){
    renderScores();
    createCheckers();

    // setAttributes();
}

function renderScores(){
    scoreElements.rpCount.innerText = scores.redPieceCount;
    scoreElements.bpTaken.innerText = scores.blackPiecesTaken;
    scoreElements.bpCount.innerText = scores.blackPieceCount;
    scoreElements.rpTaken.innerText = scores.redPiecesTaken;
}

// function removeCheckers(){

//     for (let i = 0; i < boardSquares.length; i++) {

//         let removal = document.querySelector('.white-board-square')
//         boardSquares[i].removeChild(removal);   
//     }
// }
function createCheckers(){
    
    for(let i = 0; i < 12; i++){
        const checker = document.createElement('div'); 
        // checker.classList.add('checker', 'red-checker');
        checker.setAttribute('class', redCheckers.class)
        checker.setAttribute('color', redCheckers.color)
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
        boardSquares[i].appendChild(checker);
        checker.addEventListener('click', checkerSelection)
        boardSquares[i].setAttribute('occupied', true);

        //checker.setAttribute('draggable', blackCheckers.draggable);
        //checker.setAttribute('ondragstart', 'drag(event)');
    }
}