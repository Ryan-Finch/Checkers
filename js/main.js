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
    class: "red-checker",
    player: 'red',
};
const blackCheckers = {
    position: [],
    class: "black-checker",
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
//checker and square selection, and sends needed information to the jumps and moves functions
function checkerSelection(evt){
    if(scores.winner !== null) return;
    evt.stopImmediatePropagation();
    const target = evt.target;
    
    if((target.attributes.player.value === playerTurn) && (pieceSelected === true)) {
        selectedPieceArray[0].classList.remove('selected')
    }
    if((target.attributes.player.value !== playerTurn) && (pieceSelected === true)){
        readyJump(target, selectedPieceArray);
       
    }else clearSelection();

    if(target.attributes.player.value !== playerTurn) return
    target.classList.add('selected')
    selectedPieceArray.push(target)
    pieceSelected = true;
}
function selectSquare(evt){
    const targetSquare = evt.target;
    const targetPiece = selectedPieceArray[0];
    if(pieceSelected === false) return
    if(targetSquare.getAttribute('occupied') === 'true')return;
    move(targetSquare, targetPiece)   
    if(targetPiece){targetPiece.classList.remove('selected')}
    clearSelection();
}

//These are all the jump functions,readyJump pulls positioning and then sends to jump which sorts through its conditionals to restrict movement. passes the info to landing which sets all the new attributes for checkers and squares
function readyJump(checkerToJump, checkerJumping){
    const checker = checkerJumping[0];
    
    if(checker.classList.contains('red-checker') || checker.classList.contains('king')){
        const a = checkerToJump.getAttribute('position');
        const x = a[0];
        const y = a[2];
        const coordinateX = moves.redJump.x[0] + parseInt(x);
        const coordinateY = moves.redJump.x[1] + parseInt(y);
        const coordinateX1 = moves.redJump.y[0] + parseInt(x);
        const coordinateY1= moves.redJump.y[1] + parseInt(y);
        jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump,checkerJumping);
    }
    if(checker.classList.contains('black-checker') || checker.classList.    contains('king')){
        const a = checkerToJump.getAttribute('position');
        const x = a[0];
        const y = a[2];
        const coordinateX = moves.blackJump.x[0] + parseInt(x);
        const coordinateY = moves.blackJump.x[1] + parseInt(y);
        const coordinateX1 = moves.blackJump.y[0] + parseInt(x);
        const coordinateY1= moves.blackJump.y[1] + parseInt(y);
        jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump,checkerJumping);
    }
}
function jump(coordinateX,coordinateX1,coordinateY,coordinateY1,checkerToJump, checkerJumping){

    for(let i = 0; i < boardSquares.length; i++){
        if(((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY)) && (boardSquares[i].attributes.occupied.value !== 'true')){
           if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])) {
                if((parseInt(boardSquares[i].getAttribute('position')[0]) === parseInt(checkerJumping[0].getAttribute('position')[0]) + 2) || (parseInt(boardSquares[i].getAttribute('position')[0]) === parseInt(checkerJumping[0].getAttribute('position')[0]) - 2)){
                    if((parseInt(boardSquares[i].getAttribute('position')[2]) === (parseInt(checkerJumping[0].getAttribute('position')[2]) + 2)) || (parseInt(boardSquares[i].getAttribute('position')[2]) === (parseInt(checkerJumping[0].getAttribute('position')[2]) - 2))){
                        
                        landing(boardSquares[i],checkerToJump, checkerJumping);
                     }
                }
            }
        }
        if((parseInt(boardSquares[i].getAttribute('position')[0]) === coordinateX1) && (parseInt(boardSquares[i].getAttribute('position')[2]) === coordinateY1) && (boardSquares[i].attributes.occupied.value !== 'true')){
            if(parseInt(boardSquares[i].getAttribute('position')[2]) !== parseInt(checkerJumping[0].getAttribute('position')[2])) {
                if((parseInt(boardSquares[i].getAttribute('position')[0]) === parseInt(checkerJumping[0].getAttribute('position')[0]) + 2) || (parseInt(boardSquares[i].getAttribute('position')[0]) === parseInt(checkerJumping[0].getAttribute('position')[0]) - 2)){
                    if((parseInt(boardSquares[i].getAttribute('position')[2]) === (parseInt(checkerJumping[0].getAttribute('position')[2]) + 2)) || (parseInt(boardSquares[i].getAttribute('position')[2]) === (parseInt(checkerJumping[0].getAttribute('position')[2]) - 2))){
                        landing(boardSquares[i],checkerToJump, checkerJumping);
                    }
                }
            }
        }
    }
}
function landing(boardSquares,checkerToJump, checkerJumping){
    const tarSqr = boardSquares;
    checkerToJump.parentElement.setAttribute('occupied', false);
    console.log( checkerToJump.parentElement)
    checkerJumping[0].setAttribute('position', tarSqr.attributes.position.value);
    checkerJumping[0].parentElement.setAttribute('occupied', false);
    tarSqr.setAttribute('occupied', true);
    checkerToJump.classList.add('removed-item')
    // setTimeout(function(){
        checkerToJump.remove(checkerToJump);
    // }, 500)
    tarSqr.appendChild(checkerJumping[0]);
    isKing(checkerJumping[0]);
    changeScore(checkerJumping)
    checkerJumping[0].classList.remove('selected')
    render();
}

//Move takes information from the event listeners and deteremines what moves can be made. attributes  changes all attributes of affected variables
function move(square, checker){
    let a = checker.getAttribute('position')
    let b = square.getAttribute('position')
    let x = a[0] - b[0];
    let y = a[2] - b[2];
   
    if(checker.getAttribute('player') === 'red' || checker.classList.contains('king')){
        if((moves.redMove.x[0] === x && moves.redMove.x[1] === y) || moves.redMove.y[0] === x && moves.redMove.y[1] === y){
            attributes(checker, square)
        }
    }
    if(checker.getAttribute('player') === 'black' || checker.classList.contains('king')){
        if((moves.blackMove.x[0] === x && moves.blackMove.x[1] === y) || moves.blackMove.y[0] === x && moves.blackMove.y[1] === y){
           attributes(checker, square);
        }
    }
    clearSelection();
}  
function attributes(checker, square){
    checker.setAttribute('position', square.attributes.position.value)
    checker.parentElement.setAttribute('occupied', false)
    square.setAttribute('occupied', true)
    square.appendChild(checker);
    isKing(checker);
    render();
}

//render calls most states of teh board for porper displaying and resetting of some variables
function render(){
    renderScores();
    adjustTurn();
    getWinner();
    clearSelection();
}

//clears out variables for moving pieces, to ensure your selection isnt stuck on one piece.
function clearSelection(){
    pieceSelected = false;
    selectedPieceArray = [];
}

//messages for displaying turn and changes turn
function adjustTurn(){
    if(playerTurn === scores.player1){
        playerTurn = scores.player2;
    }else{
        playerTurn = scores.player1;
    };
    if(playerTurn === scores.player1){
        message.innerHTML = `Player 1, it's your turn!`
    }
    if(playerTurn === scores.player2){
        message.innerHTML = `Player 2, it's your turn!`
    };
}

//messages for displaying winner and setting winner to not null
function getWinner(){
    if(scores.redPieceCount === 0){
        scores.winner = scores.player2;
        message.innerHTML = `Player 2 Wins!!`
    }else if(scores.blackPieceCount === 0){
        scores.winner = scores.player1;
        message.innerHTML = `Player 1 Wins!!`
    }
}

//resets scores to initial value
function resetScores(){
    scores.redPieceCount = 12;
    scores.blackPieceCount = 12
    scores.blackPiecesTaken = 0;
    scores.redPiecesTaken = 0;
    scores.winner = null;
}

//changes teh scores for rendering in the HTML
function changeScore(checkerJumping){
    if(checkerJumping[0].getAttribute('player') === 'red'){
        scores.blackPiecesTaken += 1;
        scores.blackPieceCount -= 1;
    }else{
        scores.redPiecesTaken += 1;
        scores.redPieceCount -= 1;
    }
}

//As it says, initializes the board and HTML
function init(){
    renderScores();
    setBoard();
    createCheckers();
    message.innerHTML = `Player 1! It's your turn!`
    playerTurn = redCheckers.player;
}

//maps board with coordinates for location, adds event listener to each board and gives occupied/false attribute
function setBoard(){
    for(let i = 0; i <boardSquares.length; i++){
        boardSquares[i].setAttribute('position', checkerBoard[i]);
        boardSquares[i].addEventListener('click', selectSquare)
        boardSquares[i].setAttribute('occupied', false)
    }
}

//maps scores to HTML
function renderScores(){
    scoreElements.rpCount.innerText = scores.redPieceCount;
    scoreElements.bpTaken.innerText = scores.blackPiecesTaken;
    scoreElements.bpCount.innerText = scores.blackPieceCount;
    scoreElements.rpTaken.innerText = scores.redPiecesTaken;
}

//remoevs all checkers from the board for re-initializing game for replay
function removeCheckers(){
    let element = document.querySelectorAll('.checker')
    element.forEach(el => { 
        el.classList.add('removed-item')
        setInterval(function(){
            el.remove(el); 
        }, 1000)        
});
}

//creates all checekers for board and gives need attributes and event listeners
function createCheckers(){
    setTimeout(function(){
        for(let i = 0; i < 12; i++){
            const checker = document.createElement('div'); 
            boardSquares[i].appendChild(checker);
            checker.setAttribute('class', redCheckers.class)
            checker.setAttribute('player', redCheckers.player)
            checker.setAttribute('position', checkerBoard[i])
            checker.addEventListener('click', checkerSelection)
            boardSquares[i].setAttribute('occupied', true);  
            checker.classList.add('checker')    
            setInterval(function(){
                checker.style.margin = '5px'
                checker.style.marginLeft = '0';
            }, 100);
        }
    }, 1000)

    setTimeout(function(){
        for(let i = 20; i < 32; i++){
            const checker = document.createElement('div'); 
            boardSquares[i].appendChild(checker);
            checker.setAttribute('class',  blackCheckers.class);
            checker.setAttribute('player', blackCheckers.player);
            checker.setAttribute('position',checkerBoard[i] )
            checker.addEventListener('click', checkerSelection)
            boardSquares[i].setAttribute('occupied', true);
            checker.classList.add('checker');
            setInterval(function(){
                checker.style.margin = '5px'
                checker.style.marginLeft = '0';
            }, 100);
        }
    }, 1000)
}

//button click to create pieces and init the board state
function play(){
    removeCheckers();
    resetScores();
    init(); 
}

//logic for determining if checker becomes a king by its positioning on last row
function isKing(checker){
    if(((checker.getAttribute('player') === 'red') && (parseInt(checker.getAttribute('position')[0]) === 8)) || ((checker.getAttribute('player') === 'black') && (parseInt(checker.getAttribute('position')[0]) === 1))){
        checker.classList.add('king');
    }
}
