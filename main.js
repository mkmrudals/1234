const generateBtn = document.getElementById('generate-btn');
const menuContainer = document.getElementById('numbers-container'); // Reusing the same container
const themeSwitch = document.getElementById('checkbox');

const dinnerMenus = [
    "치킨", "피자", "삼겹살", "족발", "보쌈", "짜장면", "짬뽕", "탕수육",
    "초밥", "회", "파스타", "리조또", "스테이크", "햄버거", "샌드위치",
    "김치찌개", "된장찌개", "부대찌개", "순두부찌개", "청국장",
    "떡볶이", "순대", "튀김", "라면", "우동", "소바", "냉면",
    "불고기", "갈비찜", "닭갈비", "찜닭", "아구찜", "해물찜",
    "쌀국수", "분짜", "팟타이", "카레", "돈까스", "마라탕", "양꼬치"
];

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
    menuContainer.innerHTML = ''; // Clear previous result

    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    const selectedMenu = dinnerMenus[randomIndex];

    const menuElement = document.createElement('div');
    menuElement.classList.add('menu-item');
    menuElement.textContent = selectedMenu;
    menuContainer.appendChild(menuElement);
});
