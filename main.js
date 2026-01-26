const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers-container');
const themeSwitch = document.getElementById('checkbox');

const getBallColor = (number) => {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa';    // Gray
    return '#b0d840';                   // Green
};

// Theme switcher logic
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
  
    if (currentTheme === 'dark-mode') {
        themeSwitch.checked = true;
    }
}

themeSwitch.addEventListener('change', function(event) {
    if(event.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }    
});


generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const numbers = new Set();

    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.classList.add('number-ball');
            ball.style.backgroundColor = getBallColor(number);
            ball.textContent = number;
            numbersContainer.appendChild(ball);
        }, index * 200); // Stagger the animation
    });
});
