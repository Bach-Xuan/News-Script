initBackToTopButton();
document.addEventListener("DOMContentLoaded", () => {
    fetchNewsData();
});

// BACK TO TOP BUTTON
function initBackToTopButton() {
    const backToTopButton = document.getElementById("backToTop");
    let isScrolling;

    window.addEventListener("scroll", () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        }, 100);
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

async function fetchNewsData() {
    const apiUrl = "https://newsdata.io/api/1/latest?apikey=pub_6851165a998287bd633cd273478508dd9fdfe&category=politics&country=au&language=en";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const topStories = document.querySelector(".top-stories");
        const latestNews = document.querySelector(".latest-news");
        const categories = document.querySelector(".categories .category");

        // Clear existing content
        topStories.innerHTML = "";
        latestNews.innerHTML = "";
        categories.innerHTML = "";

        // Populate top stories
        data.results.slice(0, 2).forEach(article => {
            const articleElement = document.createElement("article");
            articleElement.classList.add("top-story");
            articleElement.innerHTML = `
                <img src="${article.image_url || './image/800x400.png'}" loading="lazy">
                <div class="top-story-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                </div>
            `;
            articleElement.onclick = () => {
                localStorage.setItem('selectedArticle', JSON.stringify(article));
                location.href = 'article.html';
            };
            topStories.appendChild(articleElement);
        });

        // Populate latest news
        data.results.slice(2, 5).forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("latest-news-item");
            newsItem.innerHTML = `
                <img src="${article.image_url || './image/150x100.png'}" loading="lazy">
                <div>
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                </div>
            `;
            newsItem.onclick = () => {
                localStorage.setItem('selectedArticle', JSON.stringify(article));
                location.href = 'article.html';
            };
            latestNews.appendChild(newsItem);
        });

        // Populate categories
        data.results.slice(5, 11).forEach(article => {
            const categoryItem = document.createElement("article");
            categoryItem.classList.add("category-item");
            categoryItem.innerHTML = `
                <img src="${article.image_url || './image/400x200.png'}" loading="lazy">
                <h4>${article.category}</h4>
                <p>${article.description}</p>
            `;
            categoryItem.onclick = () => {
                localStorage.setItem('selectedArticle', JSON.stringify(article));
                location.href = 'article.html';
            };
            categories.appendChild(categoryItem);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
