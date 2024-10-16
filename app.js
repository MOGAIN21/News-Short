const apiKey = '6430fbcaddf745c5826737bcd7744671';  // Replace with your NewsAPI key
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

let newsData = [];

// Fetch and display news based on category
async function fetchNews(category = '') {
    try {
        let url = apiUrl;

        // Filter by category if selected
        if (category && category !== 'all') {
            url += `&category=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            newsData = data.articles.map(article => ({
                title: article.title,
                summary: article.description || article.content || 'No summary available',
                date: new Date(article.publishedAt).toLocaleDateString(),
            }));
            startTicker(newsData);  // Start displaying the ticker with news one by one
            displayNews(newsData);  // Display all news cards in the main section
        } else {
            displayNoNewsMessage();
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        displayNoNewsMessage();
    }
}

// Function to display news one by one in the ticker
// Function to display news headlines one by one in the ticker
function startTicker(news) {
    const tickerText = document.getElementById('ticker-text');
    let currentNewsIndex = 0;

    function updateTicker() {
        const currentNews = news[currentNewsIndex];
        tickerText.textContent = `${currentNews.title}`;  // Only display the headline
        currentNewsIndex = (currentNewsIndex + 1) % news.length;  // Loop back to the start when reaching the end
    }

    updateTicker();  // Show the first news immediately
    setInterval(updateTicker, 20000);  // Change news every 20 seconds
}

// Display news cards in the main section
function displayNews(news) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <small>${item.date}</small>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// Show message if no news is available
function displayNoNewsMessage() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>No news available at the moment. Please try again later.</p>';
}

// Handle button clicks for filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchNews(category);
    });
});

// Fetch news when page loads
fetchNews();

// Update ticker every hour by fetching new news
setInterval(() => {
    fetchNews();
}, 3600000);  // 1 hour in milliseconds
