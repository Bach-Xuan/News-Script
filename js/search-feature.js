async function fetchNewsArticles(query) {
    try {
        const url = `https://newsdata.io/api/1/latest?apikey=pub_6851165a998287bd633cd273478508dd9fdfe&image=1&language=en&q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

function renderArticles(articles) {
    const articleList = document.getElementById('articleList');
    if (!articleList) return;

    if (articles.length === 0) {
        articleList.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }

    const uniqueArticles = [];
    const titles = new Set();

    articles.forEach(article => {
        if (!titles.has(article.title)) {
            titles.add(article.title);
            uniqueArticles.push(article);
        }
    });

    articleList.innerHTML = uniqueArticles.map((article, index) => {
        const description = article.description || 'No description available';
        const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

        return `
              <li class="article-item">
                  <a href="article.html" onclick="saveArticleToLocalStorage(${index})">
                      <img src="${article.image_url || 'default-image.jpg'}" alt="${article.title}">
                      <div class="article-content">
                          <div class="article-title">${article.title}</div>
                          <div class="article-description">${truncatedDescription}</div>
                          <div class="article-meta">By ${article.creator ? article.creator.join(', ') : 'Unknown'} on ${new Date(article.pubDate).toLocaleDateString()}</div>
                      </div>
                  </a>
              </li>
          `;
    }).join('');

    // Save all articles to localStorage for reference
    localStorage.setItem('articles', JSON.stringify(uniqueArticles));
}

function saveArticleToLocalStorage(index) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const selectedArticle = articles[index];
    localStorage.setItem('selectedArticle', JSON.stringify(selectedArticle));
}

function viewArticle(article) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    window.location.href = 'article.html';
}

async function executeSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const query = searchInput.value.trim();
    if (!query) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = "";
        return;
    }

    const articles = await fetchNewsArticles(query);
    localStorage.setItem('articles', JSON.stringify(articles));
    window.location.href = 'search-results.html';
}

function initializeSearchResultsPage() {
    if (window.location.pathname.endsWith('search-results.html')) {
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        renderArticles(articles);
    }
}

document.addEventListener('DOMContentLoaded', initializeSearchResultsPage);
