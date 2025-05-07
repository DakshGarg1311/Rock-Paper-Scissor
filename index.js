const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const resetBtn = document.getElementById('reset-btn');

let playerScore = 0;
let computerScore = 0;

// Map choice to emoji
const emojis = {
    rock: '👊',
    paper: '✋',
    scissors: '✌️'
};

// Game logic
choices.forEach(choice => {
    choice.addEventListener('click', function() {
        const playerChoice = this.id;
        const computerChoice = getComputerChoice();
        
        // Update display
        playerChoiceElem.textContent = emojis[playerChoice];
        computerChoiceElem.textContent = emojis[computerChoice];
        
        // Determine winner
        const result = getWinner(playerChoice, computerChoice);
        updateScore(result);
        
        // Add animation
        if (result === 'player') {
            playerChoiceElem.classList.add('win-animation');
            setTimeout(() => playerChoiceElem.classList.remove('win-animation'), 500);
        } else if (result === 'computer') {
            computerChoiceElem.classList.add('win-animation');
            setTimeout(() => computerChoiceElem.classList.remove('win-animation'), 500);
        }
    });
});

// Get random computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function getWinner(player, computer) {
    if (player === computer) {
        resultText.textContent = "It's a tie!";
        return 'tie';
    }
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        resultText.textContent = "You win!";
        return 'player';
    } else {
        resultText.textContent = "Computer wins!";
        return 'computer';
    }
}

// Update score
function updateScore(result) {
    if (result === 'player') {
        playerScore++;
        playerScoreElem.textContent = playerScore;
    } else if (result === 'computer') {
        computerScore++;
        computerScoreElem.textContent = computerScore;
    }
}

// Reset game
resetBtn.addEventListener('click', function() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = '0';
    computerScoreElem.textContent = '0';
    resultText.textContent = 'Choose your weapon!';
    playerChoiceElem.textContent = '❔';
    computerChoiceElem.textContent = '❔';
});