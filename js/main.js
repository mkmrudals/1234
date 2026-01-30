document.addEventListener('DOMContentLoaded', () => {
    const articleGrid = document.querySelector('.article-grid');

    // Example article data (replace with real data from a CMS or API later)
    const articles = [
        {
            title: '가위바위보의 역사와 문화적 의미',
            excerpt: '단순한 손 게임을 넘어, 가위바위보가 전 세계 문화에 미친 영향과 그 유래를 탐구합니다.',
            link: 'articles/history.html',
            image: 'https://via.placeholder.com/400x200/4a90e2/ffffff?text=History+of+RPS'
        },
        {
            title: 'AI와 가위바위보: 필승 전략은 존재하는가?',
            excerpt: '인공지능과의 가위바위보 대결! AI는 어떤 패턴으로 승리하며, 인간은 어떻게 대처해야 할까요?',
            link: 'articles/strategy.html',
            image: 'https://via.placeholder.com/400x200/50e3c2/ffffff?text=AI+Strategy'
        }
    ];

    articles.forEach(article => {
        const articleCard = document.createElement('a');
        articleCard.href = article.link;
        articleCard.classList.add('article-card');

        articleCard.innerHTML = `
            <div class="article-card-image" style="background-image: url('${article.image}')"></div>
            <div class="article-card-content">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <span class="read-more">더 읽기 &rarr;</span>
            </div>
        `;
        articleGrid.appendChild(articleCard);
    });
});
