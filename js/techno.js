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
            const div = createCardDiv();
            const cardBody = createCardBody();
            const title = createCardTitle(repo.name);
            const description = createCardDescription(repo.description);
            const stars = createCardStars(repo.stargazers_count);
            const date = createCardDate(repo.created_at);
            const language = createCardLanguage(repo.language);
            const div2 = createCardDiv2();
            const link = createCardLink(repo.html_url);

            appendElements(div2, [link]);
            appendElements(cardBody, [title, description, div2, stars, date, language]);
            appendElements(div, [cardBody]);
            reposContainer.appendChild(div);
        });
    } catch (error) {
        console.log(error);
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

function appendElements(parent, elements) {
    elements.forEach(element => {
        parent.appendChild(element);
    });
}

function createHtmlTable(data) {
    var table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    var thead = document.createElement('thead');
    thead.classList.add('thead-dark');

    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');

    for (var key in data[0]) {
        var th = document.createElement('th');
        th.innerHTML = key;
        tr.appendChild(th);
    }

    thead.appendChild(tr);

    data.forEach(item => {
        var tr = document.createElement('tr');
        for (var key in item) {
            var td = document.createElement('td');
            td.innerHTML = item[key];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}
