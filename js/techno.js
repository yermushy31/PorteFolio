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
            console.log(data);
            // afficher les données
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


function fetchJsonFile(filepath) {
    return fetch(filepath).then(response => {
        return response.json();
    });
}

async function getGithubRepos() {
    var username = "yermushy31";
    var url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // afficher les données
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
            return "";
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
    cardBody.style.height = '200px';
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

function createCardDiv() {
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    return div;
}

function createCardBody() {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'mb-4', 'box-shadow');
    cardBody.style.height = '200px';
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
    createdDate.innerHTML = `Created the : ${date}`;
    return createdDate;
}

function createCardLanguage(language) {
    const lang = document.createElement('p');
    lang.classList.add('text-muted');
    lang.innerHTML = `Language : ${language}`;
    return lang;
}


function createTableFromJSON() {

    var jsonData = fetch('js/tableau.json').then(response => {
        return response.json();
    });
    
    var table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");

    var tbody = document.createElement("tbody");

    jsonData.forEach(function (obj) {
        var row = tbody.insertRow();

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var cell = row.insertCell();
                cell.innerHTML = obj[key];
            }
        }
    });

    table.appendChild(tbody);

    document.body.appendChild(table);
}
