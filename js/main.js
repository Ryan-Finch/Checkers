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
    position: [],
    class: "checker red-checker",
    player: 'red',
};
const blackCheckers = {
    position: [],
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
let message = document.querySelector('h1');

/* -----event listeners-----*/
document.querySelector('button').addEventListener('click', play);

/* -----functions-----*/
function checkerSelection(evt){
    if(scores.winner !== null) return;
    evt.stopImmediatePropagation();
    const target = evt.target;

    if((target.attributes.player.value !== playerTurn) && (pieceSelected === true)){
        console.log('kingMove')
        if(selectedPieceArray[0].classList.contains('red-king') || selectedPieceArray[0].classList.contains('black-king')){
            kingJump(target, selectedPieceArray);
            pieceSelected = [];
            return;
        }
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
        
        return;
    }
    if(target.attributes.player.value !== playerTurn) return

    selectedPieceArray.push(target)
    pieceSelected = true;
    console.log(selectedPieceArray)
    

}
function selectSquare(evt){
    console.log(evt.target)
    const targetSquare = evt.target;
    const targetPiece = selectedPieceArray[0];
    if(pieceSelected === false) return
    if(targetSquare.getAttribute('occupied') === 'true')return;
    if(targetPiece.classList.contains('red-king') || targetPiece.classList.contains('black-king')){
        kingMove(targetSquare, targetPiece);
    }
    if(targetPiece.getAttribute('player') === 'red'){
        redMove(targetSquare, targetPiece);
    }else if(targetPiece.getAttribute('player') === 'black'){
        blackMove(targetSquare, targetPiece);
    }else{
        return;
    }

    if(evt.target.getAttribute('occupied') === 'true'){ 
        render();
    }else{
        selectedPieceArray = [];
        pieceSelected = false;
    }
}
function redJump(checkerToJump, checkerJumping){
    const a = checkerToJump.getAttribute('position');
    const x = a[0];
    const y = a[2];
    const coordinateX = moves.redJump.x[0] + parseInt(x);
    const coordinateY = moves.redJump.x[1] + parseInt(y);
    const coordinateX1 = moves.redJump.y[0] + parseInt(x);
    const coordinateY1= moves.redJump.y[1] + parseInt(y);

    jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump,checkerJumping);
}
function jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump, checkerJumping){

    for(let i = 0; i < boardSquares.length; i++){
        if(((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY)) && (boardSquares[i].attributes.occupied.value !== 'true')){
           if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])) {
                console.log(parseInt(boardSquares[i].getAttribute('position')[0]))
                console.log(parseInt(checkerJumping[0].getAttribute('position')[0]) + 2)
                    const tarSqr = boardSquares[i];
                    checkerToJump.parentElement.setAttribute('occupied', 'false')
                    checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value)
                    checkerJumping[0].parentElement.setAttribute('occupied', 'false')
                    tarSqr.setAttribute('occupied', true)
                    checkerToJump.remove(checkerToJump);
                    tarSqr.appendChild(checkerJumping[0])
                    isKing(checkerJumping[0]);
                    checkerJumping =[];
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
                isKing(checkerJumping[0]);
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

    jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump,checkerJumping);
}
function kingJump(checkerToJump, checkerJumping){
    blackJump(checkerToJump,checkerJumping);
    redJump(checkerToJump, checkerJumping);
}
function kingMove(square, checker){
    redMove(square, checker);
    blackMove(square ,checker);
}
function redMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
    let x = a[0] - b[0];
    let y = a[2] - b[2]; 

   move(square, checker, x, y);
   
}
function move(square, checker, x, y){
    if(checker.getAttribute('player') === 'red' || checker.classList.contains('red-king') || checker.classList.contains('black-king')){
        if((moves.redMove.x[0] === x && moves.redMove.x[1] === y) || moves.redMove.y[0] === x && moves.redMove.y[1] === y){
            checker.setAttribute('position', square.attributes.position.value)
            square.setAttribute('occupied', true)
            checker.parentElement.setAttribute('occupied', false)
            square.appendChild(checker);
            isKing(checker);
            selectedPieceArray = [];
        }
    } 
    if(checker.getAttribute('player') === 'black' || checker.classList.contains('red-king') || checker.classList.contains('black-king')){
        if((moves.blackMove.x[0] === x && moves.blackMove.x[1] === y) || moves.blackMove.y[0] === x && moves.blackMove.y[1] === y){
            checker.setAttribute('position', square.attributes.position.value)
            checker.parentElement.setAttribute('occupied', false)
            square.setAttribute('occupied', true)
            square.appendChild(checker);
            isKing(checker);
            selectedPieceArray = [];
        }else{
            return selectedPieceArray = [];
        }
    }
}
function blackMove(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
    let x = a[0] - b[0];
    let y = a[2] - b[2];

    move(square, checker, x, y);
}   
function render(){
    changeTurn();
    renderScores();
    displayTurn();
    getWinner();
    selectedPieceArray = [];
    pieceSelected = false;
}
function displayTurn(){
    if(playerTurn === scores.player1){
        message.innerHTML = `Player 1, it's your turn!`
    }
    if(playerTurn === scores.player2){
        message.innerHTML = `Player 2, it's your turn!`
    }
}

function getWinner(){
    if(scores.redPieceCount === 0){
        scores.winner = scores.player2;
        message.innerHTML = `Winner is Player 2!!`
    }else if(scores.blackPieceCount === 0){
        scores.winner = scores.player1;
        console.log('hmmm');
        message.innerHTML = `Winner is Player 1!!`
    }
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
    resetScores();
    init(); 
  
}
function resetScores(){
    scores.redPieceCount = 12;
    scores.blackPieceCount = 12
    scores.blackPiecesTaken = 0;
    scores.redPiecesTaken = 0;
    scores.winner = null;
}
function init(){
    console.log('Lets get it on')
    renderScores();
    setBoard();
    createCheckers();
    message.innerHTML = `Player 1! It's your turn!`
    playerTurn = redCheckers.player;
    console.log(playerTurn)
    console.log(selectedPieceArray)
    console.log(pieceSelected)
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
        checker.setAttribute('king', redCheckers.king)
        checker.addEventListener('click', checkerSelection)
        boardSquares[i].setAttribute('occupied', true);
    }

    for(let i = 20; i < 32; i++){
        const checker = document.createElement('div'); 
        checker.setAttribute('class',  blackCheckers.class);
        checker.setAttribute('color', blackCheckers.color);
        checker.setAttribute('player', blackCheckers.player);
        boardSquares[i].appendChild(checker);
        checker.setAttribute('king', blackCheckers.king)
        checker.setAttribute('position',checkerBoard[i] )
        checker.addEventListener('click', checkerSelection)
        boardSquares[i].setAttribute('occupied', true);
    }
}
function isKing(checker){
    const kingCheck = checker
    console.log(kingCheck)
    if(kingCheck.getAttribute('player') === 'red'){
            if(parseInt(kingCheck.getAttribute('position')[0]) === 8){
                kingCheck.classList.add('red-king');
            }
        }
    if(kingCheck.getAttribute('player') === 'black'){
            if(parseInt(kingCheck.getAttribute('position')[0]) === 1){console.log(kingCheck)
                kingCheck.classList.add('black-king'); 
            }
        }
    
}