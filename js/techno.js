/* Obtenir le flux RSS depuis medium.com */

// Thème : cyber sécurité
// URL : https://medium.com/feed/topic/cyber-security
async function getRSSFeed() {
    if (document.getElementById('articles')) {
        var url = "https://medium.com/feed/tag/cyber-security";
        var rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${url}`;

        try {
            const response = await fetch(rss2json);
            const data = await response.json();
    
            articlesContainer = document.getElementById('articles');

            data.items.slice(0, 6).forEach(item => {
                const div = createCardDiv();
                const cardBody = createCardBody();
                const title = createCardTitle(item.title);
                const description = createCardDescription(item.description);
                const div2 = createCardDiv2();
                const link = createCardLink(item.link);
                const pubDate = createCardPubDate(item.pubDate);

                appendElements(div2, [link, pubDate]);
                appendElements(cardBody, [title, description, div2]);
                appendElements(div, [cardBody]);
                articlesContainer.appendChild(div);
            });
        } catch (error) {
            console.log(error);
        }
    }
}


async function getGithubRepos() {
   
    var url = `https://api.github.com/users/yermushy31/repos`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        reposContainer = document.getElementById('repos');

        data.slice(0, 6).forEach(repo => {
            const language = createCardLanguage(repo.language);
            const div = createCardDiv();
            const cardBody = createCardBody();
            const title = createCardTitle(repo.name);
            const image = createCardImage(repo.language);
            const description = createCardDescription(repo.description);
            const stars = createCardStars(repo.stargazers_count);
            const date = createCardDate(repo.created_at);
            
            const div2 = createCardDiv2();
            const link = createCardLink(repo.html_url);
        
            cardBody.style.flexDirection = 'column';
            cardBody.style.alignItems = 'center';

            appendElements(div2, [link]);
            appendElements(cardBody, [title, description,image, language, div2, stars, date]);
            appendElements(div, [cardBody]);
            reposContainer.appendChild(div);
        });
    } catch (error) {
        console.log(error);
    }
}

function createCardImage(language) {
    const image = document.createElement('img');
    image.classList.add('card-image');
    image.src = getImageUrl(language);
    return image;
}

function getImageUrl(language) {
    switch (language) {
        case 'JavaScript':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png';
        case 'Python':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png';
        case 'Java':
            return 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png';
        case 'C++':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png';
        case 'HTML':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png';
        case 'PHP':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/800px-PHP-logo.svg.png';
        default:
            return "data:image/png;base64,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";
    }
}

function createCardDiv() {
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    return div;
}

function createCardBody() {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'mb-4', 'box-shadow');
    cardBody.style.height = '500px';
    cardBody.style.overflow = 'auto';
    return cardBody;
}

function createCardTitle(text) {
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = text;
    return title;
}

function createCardDescription(text) {
    const description = document.createElement('p');
    description.classList.add('card-text', 'text-center');
    description.innerHTML = text;
    return description;
}

function createCardDiv2() {
    const div2 = document.createElement('div');
    div2.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    return div2;
}

function createCardLink(url) {
    const link = document.createElement('a');
    link.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    link.href = url;
    link.innerHTML = 'Show';
    return link;
}

function createCardPubDate(date) {
    const pubDate = document.createElement('small');
    pubDate.classList.add('text-muted');
    pubDate.innerHTML = date;
    return pubDate;
}

function createCardStars(count) {
    const stars = document.createElement('p');
    stars.classList.add('text-muted');
    stars.innerHTML = `Stars : ${count}`;
    return stars;
}

function createCardDate(date) {
    const createdDate = document.createElement('p');
    createdDate.classList.add('text-muted');
    createdDate.innerHTML = `Created on: ${new Date(date).toLocaleDateString()}`;
    return createdDate;
}

function createCardLanguage(language) {
    const lang = document.createElement('p');
    lang.classList.add('text-muted');
    lang.innerHTML = `Language: ${language}`;
    return lang;
}

function appendElements(parent, elements) {
    elements.forEach(element => {
        parent.appendChild(element);
    });
}


