const choices = ['바위', '가위', '보']; // 바위:0, 가위:1, 보:2

// DOM 요소 가져오기
const rockBtn = document.getElementById('rock');
const scissorsBtn = document.getElementById('scissors');
const paperBtn = document.getElementById('paper');
const choiceButtons = [rockBtn, scissorsBtn, paperBtn];

const countdownDisplay = document.getElementById('countdown');
const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');
const resultMessage = document.getElementById('result-message');
const resetButton = document.getElementById('reset-button');

let isPlaying = false; // 게임 진행 중인지 확인

// 게임 초기화 (다시하기 버튼 클릭 시)
resetButton.addEventListener('click', initializeGame);

function initializeGame() {
    isPlaying = false;
    // 초기화 메시지
    countdownDisplay.textContent = '가위바위보 중 하나를 선택하세요!';
    resultMessage.textContent = '결과';

    // 이미지 초기화
    playerChoiceImg.removeAttribute('data-choice');
    playerChoiceImg.style.backgroundImage = 'none';
    computerChoiceImg.removeAttribute('data-choice');
    computerChoiceImg.style.backgroundImage = 'none';

    // 버튼 활성화
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.style.display = 'none'; // 다시하기 버튼 숨기기
}

// 사용자 선택 핸들러
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isPlaying) {
            const playerChoice = button.dataset.choice;
            playRound(playerChoice);
        }
    });
});

// 게임 한 라운드 플레이
function playRound(playerChoice) {
    isPlaying = true;
    // 버튼 비활성화
    choiceButtons.forEach(button => button.disabled = true);

    let count = 3;
    countdownDisplay.textContent = count;
    resultMessage.textContent = ''; // 결과 메시지 초기화

    // 카운트다운 로직
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else if (count === 0) {
            countdownDisplay.textContent = '시작!';
        } else {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = ''; // 카운트다운 메시지 제거
            determineWinner(playerChoice);
        }
    }, 1000);
}

// 승자 결정 및 결과 표시
function determineWinner(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // 선택 이미지 업데이트
    playerChoiceImg.setAttribute('data-choice', playerChoice);
    computerChoiceImg.setAttribute('data-choice', computerChoice);

    let result;
    if (playerChoice === computerChoice) {
        result = '무승부!';
    } else if (
        (playerChoice === '바위' && computerChoice === '가위') ||
        (playerChoice === '가위' && computerChoice === '보') ||
        (playerChoice === '보' && computerChoice === '바위')
    ) {
        result = '승리!';
    } else {
        result = '패배!';
    }

    resultMessage.textContent = result;

    // 다시하기 버튼 표시 및 활성화
    resetButton.style.display = 'block';
    isPlaying = false;
}

// 초기 게임 시작
initializeGame();