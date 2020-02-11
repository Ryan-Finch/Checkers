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
    redJump: {
        x: [1,1],
        y: [1,-1]
    },
    blackMove: {
        x: [1,1],
        y: [1,-1]},
    blackJump: {
        x:[-1, -1],
        y:[-1, 1]
    },
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
    const target = evt.target;
    evt.stopImmediatePropagation();

    console.log(target)
    
    if((target.attributes.player.value !== playerTurn) && (pieceSelected === true)){
        if(playerTurn === 'red'){
            redJump(target,selectedPieceArray);
            pieceSelected = [];
            return;
        }else if(playerTurn === 'black'){
            blackJump(target,selectedPieceArray);
            pieceSelected = []
            return;
        }
    }else if(pieceSelected === true){
        return
    }
    selectedPieceArray.push(target)
    pieceSelected = true;
    console.log(selectedPieceArray)
    
}

function selectSquare(evt){
    const targetSquare = evt.target;
    const targetPiece = selectedPieceArray[0];
    if(pieceSelected === false) return
    if(targetSquare.getAttribute('occupied') === 'true')return;
    if(targetPiece.getAttribute('player') === 'red'){
        redMove(targetSquare, targetPiece);
    }
    if(targetPiece.getAttribute('player') === 'black'){
        blackMove(targetSquare, targetPiece);
    }

    pieceSelected = false;
    selectedPieceArray = [];
    render();
}
function redJump(checkerToJump, checkerJumping){
    const a = checkerToJump.getAttribute('position');
    const x = a[0];
    const y = a[2];
    const coordinateX = moves.redJump.x[0] + parseInt(x);
    const coordinateY = moves.redJump.x[1] + parseInt(y);
    const coordinateX1 = moves.redJump.y[0] + parseInt(x);
    const coordinateY1= moves.redJump.y[1] + parseInt(y);

    for(let i = 0; i < boardSquares.length; i++){
        if(((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY)) && (boardSquares[i].attributes.occupied.value !== 'true')){
           if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])){
                    
                const tarSqr = boardSquares[i];
                checkerToJump.parentElement.setAttribute('occupied', 'false')
                checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value)
                checkerJumping[0].parentElement.setAttribute('occupied', 'false')
                tarSqr.setAttribute('occupied', true)
                checkerToJump.remove(checkerToJump);
                tarSqr.appendChild(checkerJumping[0])
                scores.blackPiecesTaken += 1;
                scores.blackPieceCount -= 1;
                render();
                return;
            }
        }else if((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX1) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY1) && (boardSquares[i].attributes.occupied.value !== 'true')){
            if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])){
                const tarSqr = boardSquares[i];
                checkerToJump.parentElement.setAttribute('occupied', false)
                checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value)
                checkerJumping[0].parentElement.setAttribute('occupied', false)
                tarSqr.setAttribute('occupied', true)
                checkerToJump.remove(checkerToJump);
                tarSqr.appendChild(checkerJumping[0])
                checkerJumping =[];
                scores.blackPiecesTaken += 1;
                scores.blackPieceCount -= 1;
                render();
                return;
            }
        }
    }
}
function blackJump(checkerToJump, checkerJumping){
    const a = checkerToJump.getAttribute('position');
    const x = a[0];
    const y = a[2];
    const coordinateX = moves.blackJump.x[0] + parseInt(x);
    const coordinateY = moves.blackJump.x[1] + parseInt(y);
    const coordinateX1 = moves.blackJump.y[0] + parseInt(x);
    const coordinateY1= moves.blackJump.y[1] + parseInt(y);

    for(let i = 0; i < boardSquares.length; i++){
        if(((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY)) && (boardSquares[i].attributes.occupied.value !== 'true')){
           if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])){
                    
                const tarSqr = boardSquares[i];
                checkerToJump.parentElement.setAttribute('occupied', 'false')
                checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value)
                checkerJumping[0].parentElement.setAttribute('occupied', 'false')
                tarSqr.setAttribute('occupied', true)
                checkerToJump.remove(checkerToJump);
                tarSqr.appendChild(checkerJumping[0]);
                scores.redPiecesTaken += 1;
                scores.redPieceCount -= 1;
                render();
                return;
            }
        }else if((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX1) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY1) && (boardSquares[i].attributes.occupied.value !== 'true')){
            if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])){
                const tarSqr = boardSquares[i];
                checkerToJump.parentElement.setAttribute('occupied', false)
                checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value)
                checkerJumping[0].parentElement.setAttribute('occupied', false)
                tarSqr.setAttribute('occupied', true)
                checkerToJump.remove(checkerToJump);
                tarSqr.appendChild(checkerJumping[0])
                checkerJumping =[];
                scores.redPiecesTaken += 1;
                scores.redPieceCount -= 1;
                render();
                return;
            }
        }
    }
}
function redMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
   
    let x = a[0] - b[0];
    let y = a[2] - b[2]; 

    if((moves.redMove.x[0] === x && moves.redMove.x[1] === y) || moves.redMove.y[0] === x && moves.redMove.y[1] === y){
        
        checker.setAttribute('position', square.attributes.position.value)
        square.setAttribute('occupied', true)
        checker.parentElement.setAttribute('occupied', false)
        square.appendChild(checker);
        selectedPieceArray = [];
    }else{
        return selectedPieceArray = [];
    }
    
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

    if((moves.blackMove.x[0] === x && moves.blackMove.x[1] === y) || moves.blackMove.y[0] === x && moves.blackMove.y[1] === y){
        console.log('fuck me?')
        checker.setAttribute('position', square.attributes.position.value)
        checker.parentElement.setAttribute('occupied', false)
        square.setAttribute('occupied', true)
        square.appendChild(checker);
        selectedPieceArray = [];
    }else{
        return selectedPieceArray = [];
    }
    
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
    renderScores();
    selectedPieceArray = [];
    pieceSelected = false;
    console.log(selectedPieceArray)
    console.log(pieceSelected);
    console.log(playerTurn)
}
function changeTurn(){
    
    if(playerTurn === scores.player1){
        playerTurn = scores.player2;
    }else{
        playerTurn = scores.player1;
    };
}

function play(){
    removeCheckers();
    init(); 
  
}

function init(){
    renderScores();
    setBoard();
    createCheckers();
    playerTurn = redCheckers.player;
    console.log(playerTurn)
    console.log(selectedPieceArray)
    console.log(pieceSelected)
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