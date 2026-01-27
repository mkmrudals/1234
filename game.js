const choices = ['바위', '가위', '보'];
const choiceToEmoji = {
    '바위': '✊',
    '가위': '✌️',
    '보': '✋'
};

// DOM 요소 가져오기
const choiceButtons = document.querySelectorAll('.choices button');
const countdownDisplay = document.getElementById('countdown');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');
const resetButton = document.getElementById('reset-button');

let isPlaying = false;
let countdownTimeout; // To store countdown animation timeouts

// --- Event Listeners ---
resetButton.addEventListener('click', initializeGame);

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isPlaying) {
            playRound(button.dataset.choice);
        }
    });
});

// --- Game Logic ---

function initializeGame() {
    isPlaying = false;
    countdownDisplay.textContent = '가위바위보 중 하나를 선택하세요!';
    countdownDisplay.classList.remove('animate-zoom-in-out'); // Stop animation on reset
    resultMessage.textContent = '결과';
    resultMessage.classList.remove('show', 'win', 'lose', 'draw'); // Remove animation and color classes
    
    playerChoiceEl.textContent = '';
    playerChoiceEl.classList.remove('show'); // Hide emoji
    computerChoiceEl.textContent = '';
    computerChoiceEl.classList.remove('show'); // Hide emoji
    
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.style.display = 'none';
    clearTimeout(countdownTimeout); // Clear any pending timeouts
}

function playRound(playerChoice) {
    isPlaying = true;
    choiceButtons.forEach(button => button.disabled = true);
    resultMessage.textContent = '';
    resultMessage.classList.remove('show', 'win', 'lose', 'draw');
    playerChoiceEl.classList.remove('show');
    computerChoiceEl.classList.remove('show');

    let count = 3;
    countdownDisplay.textContent = count;
    countdownDisplay.classList.add('animate-zoom-in-out'); // Start countdown animation

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownDisplay.classList.remove('animate-zoom-in-out');
            countdownDisplay.textContent = '결과는...';
            // Delay showing result slightly after countdown '결과는...'
            countdownTimeout = setTimeout(() => {
                showResult(playerChoice);
            }, 500); 
        }
    }, 1000);
}

function showResult(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let winnerClass = '';

    playerChoiceEl.textContent = choiceToEmoji[playerChoice];
    playerChoiceEl.classList.add('show'); // Show emoji with animation

    computerChoiceEl.textContent = choiceToEmoji[computerChoice];
    computerChoiceEl.classList.add('show'); // Show emoji with animation

    let resultText;
    if (playerChoice === computerChoice) {
        resultText = '무승부!';
        winnerClass = 'draw';
    } else if (
        (playerChoice === '바위' && computerChoice === '가위') ||
        (playerChoice === '가위' && computerChoice === '보') ||
        (playerChoice === '보' && computerChoice === '바위')
    ) {
        resultText = '승리!';
        winnerClass = 'win';
    } else {
        resultText = '패배!';
        winnerClass = 'lose';
    }

    // Delay result message appearance slightly after emojis
    countdownTimeout = setTimeout(() => {
        resultMessage.textContent = resultText;
        resultMessage.classList.add('show', winnerClass); // Show result with animation and color
        resetButton.style.display = 'block';
        isPlaying = false;
    }, 800); // Adjust this delay as needed after emoji animation
}

function getWinner(player, computer) { /* This function is no longer used directly as showResult handles it */
    // Kept for clarity, though its logic is now inline in showResult for class determination
}

// Initial game start
initializeGame();