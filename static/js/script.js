document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const spinner = document.getElementById('spinner');
    const btnText = document.querySelector('.btn-text');
    const newsGrid = document.getElementById('news-grid');
    const errorContainer = document.getElementById('error-container');

    const fetchNews = async () => {
        setLoadingState(true);
        errorContainer.classList.add('hidden');
        renderSkeletons();

        try {
            const response = await fetch('/api/news');
            const data = await response.json();

            if (data.status === 'success') {
                renderArticles(data.articles);
            } else {
                showError(data.message || 'Failed to fetch news.');
            }
        } catch (error) {
            showError('Network error. Please try again.');
        } finally {
            setLoadingState(false);
        }
    };

    const setLoadingState = (isLoading) => {
        refreshBtn.disabled = isLoading;
        if (isLoading) {
            spinner.style.display = 'inline-block';
            btnText.textContent = 'Refreshing...';
        } else {
            spinner.style.display = 'none';
            btnText.textContent = 'Refresh News';
        }
    };

    const showError = (message) => {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        newsGrid.innerHTML = '';
    };

    const renderSkeletons = () => {
        const skeletons = Array(6).fill('').map(() => `
            <div class="article-card skeleton">
                <div class="skeleton-img"></div>
                <div class="article-content">
                    <div class="skeleton-text title"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div style="display: flex; gap: 0.5rem; margin-top: auto; padding-top: 1rem;">
                        <div class="skeleton-btn"></div>
                        <div class="skeleton-btn"></div>
                    </div>
                </div>
            </div>
        `).join('');
        newsGrid.innerHTML = skeletons;
    };

    const renderArticles = (articles) => {
        if (!articles || articles.length === 0) {
            newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No articles found.</p>';
            return;
        }

        const articlesHtml = articles.map(article => {
            const defaultImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22400%22%20height%3D%22200%22%20fill%3D%22%23e2e8f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%2364748b%22%3ENo%20Image%20Available%3C%2Ftext%3E%3C%2Fsvg%3E';
            const imageUrl = article.fields?.thumbnail || defaultImage;
            const excerpt = article.fields?.trailText || 'Click to read more about this topic.';
            const author = article.fields?.byline || 'The Guardian';
            const date = new Date(article.webPublicationDate).toLocaleDateString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            // Construct LinkedIn share URL
            // https://www.linkedin.com/sharing/share-offsite/?url=URL
            const articleUrl = encodeURIComponent(article.webUrl);
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`;

            return `
                <article class="article-card">
                    <img src="${imageUrl}" alt="Article thumbnail" class="article-image" onerror="this.src='${defaultImage}'">
                    <div class="article-content">
                        <h2 class="article-title"><a href="${article.webUrl}" target="_blank" rel="noopener noreferrer">${article.webTitle}</a></h2>
                        <div class="article-meta">
                            <span>${author}</span> &bull; <time>${date}</time>
                        </div>
                        <p class="article-excerpt">${excerpt}</p>
                        <div class="article-actions">
                            <a href="${article.webUrl}" target="_blank" rel="noopener noreferrer" class="read-more">Read More</a>
                            <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-share">
                                <svg class="linkedin-icon" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                Post
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        newsGrid.innerHTML = articlesHtml;
    };

    // Initial fetch
    fetchNews();

    // Bind refresh button
    refreshBtn.addEventListener('click', fetchNews);
});
