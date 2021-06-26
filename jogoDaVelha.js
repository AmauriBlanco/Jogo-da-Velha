const boardTable = document.querySelector('.board');
const gameOverDialog = document.querySelector('.game-over-dialog');
const gameOverMessage = gameOverDialog.querySelector('.game-over-message');
const restartButton = gameOverDialog.querySelector('.restart-button',);
const zerar = document.querySelector('.zerar',);


boardTable.addEventListener('click', setPlayerMove);
restartButton.addEventListener('click', startGame);
zerar.addEventListener('click',
    function(){
        location.reload();
    }
);

let currentPlayer,
    winner,
    isGameOver,
    turn,
    isXWinner,
    isOWinner;
    
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

function startGame(){
    currentPlayer = 'X';
    winner = null;
    isGameOver = false;
    turn = 0;
    
    boardTable.style.setProperty('--current-player', '"X"');
    hideGameOverDialog();
    clearBoard();
    jogadorAtual();
}

function clearBoard(){
    boardTable.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function setPlayerMove({target}){
    if(!isGameOver && target.classList.contains('cell') && target.innerText === ''){
        target.innerText = currentPlayer;
        turn++;
        
        if(turn > 4){
            checkGameOver();
        }
        togglePlayer();
    }
}

function togglePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    boardTable.style.setProperty('--current-player', `"${currentPlayer}"`);
    jogadorAtual();
    soundPlay();
    
}

function checkGameOver(){
    winner = checkWinner();
    if(winner){
        showGameOverDialog(`Vitória do ${winner}`);
        isGameOver = true;
    }else if(turn > 8){
        showGameOverDialog(`Deu Velha!`);
        isGameOver = true;
    }
    placar();
}

function checkWinner(){
    let cells = boardTable.querySelectorAll('.cell');
    cells = Array.from(cells).map(element => element.innerText);
    const values = winningConditions.map(condition => condition.map(position => cells[position]).join(''));
    isOWinner = values.includes('OOO');
    isXWinner = values.includes('XXX');

    if(isOWinner || isXWinner){
        isGameOver = true;
        if(isOWinner){
            return 'O';
        }
        return 'X';
    }
    return null;
    
}

function showGameOverDialog(message){
    gameOverMessage.innerText = message;
    gameOverDialog.setAttribute('open', 'true');
}

function hideGameOverDialog(){
    gameOverDialog.removeAttribute('open');
}
function jogadorAtual(){
     document.getElementById('player').innerHTML = currentPlayer;
}
function placar(){
    let pontoX = document.getElementById('scoreX');  
    let pontoO = document.getElementById('scoreO');
    if(isXWinner){
        pontoX.innerHTML = Number(pontoX.innerHTML) + 1;
    }
    if(isOWinner){
        pontoO.innerHTML = Number(pontoO.innerHTML) + 1;
    }
    

}
function soundPlay(){
    let audioWin = document.getElementById('win');
    let audioClick = document.getElementById('click');
    let audioVelha = document.getElementById('velha');
    audioClick.play();
    if(winner){
        audioWin.play();
    }
    if(!winner && isGameOver){
        audioVelha.play();
    }        
}
startGame();
