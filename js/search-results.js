function calculateLevenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let prev = Array(n + 1).fill(0),
        curr = Array(n + 1).fill(0);

    for (let j = 0; j <= n; j++) prev[j] = j;

    for (let i = 1; i <= m; i++) {
        curr[0] = i;
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
        }
        [prev, curr] = [curr, prev];
    }
    return prev[n];
}

function getNormalizedDistance(a, b) {
    const maxLen = Math.max(a.length, b.length);
    return maxLen === 0 ? 0 : calculateLevenshteinDistance(a, b) / maxLen;
}

function isFuzzyMatch(item, query, threshold = 0.4) {
    const lowerItem = item.toLowerCase(),
        lowerQuery = query.toLowerCase();
    return lowerItem.includes(lowerQuery) || getNormalizedDistance(lowerItem, lowerQuery) < threshold;
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const searchButton = createSearchButton();

    if (searchInput && resultsContainer) {
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value.trim()) searchInput.value = "";
            resultsContainer.style.display = 'none';
        });

        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeSearch();
        });
    }
}

function createSearchButton() {
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.className = 'search-button';

    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer) {
        searchContainer.appendChild(searchButton);
    }

    return searchButton;
}

document.addEventListener('DOMContentLoaded', setupSearch);