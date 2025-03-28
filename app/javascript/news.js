let currentCategory = 'technology';
let currentPage = 1;
const articlesPerPage = 6;
let newsData = [];

function createArticleCard(article) {
    const imageUrl = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
    const title = article.title || 'No title';
    const source = article.source.name || 'Unknown source';
    const description = article.description || 'No description available.';
    const url = article.url || '#';
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="news-card">
                <img src="${imageUrl}" alt="${title}" class="news-img">
                <h5 class="card-title">${title}</h5>
                <p class="source mb-2">${source}</p>
                <p class="card-text">${description}</p>
                <a href="${url}" target="_blank" class="btn btn-primary btn-sm mt-2">Read more</a>
            </div>
        </div>
    `;
}

function displayNews() {
    const newsContainer = document.getElementById('news-container');
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const currentArticles = newsData.slice(start, end);
    
    newsContainer.innerHTML = '';
    currentArticles.forEach(article => {
        newsContainer.innerHTML += createArticleCard(article);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(newsData.length / articlesPerPage);
    const paginationContainer = document.querySelector('.pagination');
    let paginationHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="prev">Previous</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="next">Next</a>
        </li>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function loadNews(category = 'technology') {
    const apiKey = '85f94c52bc0e4f3c81b7168f8c21d4f1';
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
    const newsContainer = document.getElementById('news-container');
    
    newsContainer.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error in API response');
            return response.json();
        })
        .then(data => {
            if (data.articles?.length > 0) {
                newsData = data.articles;
                currentPage = 1;
                displayNews();
            } else {
                newsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p>No news articles available for this category.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p>Error loading news. Please try again later.</p>
                </div>
            `;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.news-section')) {
        loadNews();

        document.querySelectorAll('.category-filter .btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.category-filter .btn')
                    .forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                currentCategory = this.dataset.category;
                loadNews(currentCategory);
            });
        });

        document.querySelector('.pagination').addEventListener('click', function(e) {
            e.preventDefault();
            if (!e.target.classList.contains('page-link')) return;
            
            const page = e.target.dataset.page;
            const totalPages = Math.ceil(newsData.length / articlesPerPage);
            
            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (page !== 'prev' && page !== 'next') {
                currentPage = parseInt(page);
            }
            
            displayNews();
        });
    }
}); 