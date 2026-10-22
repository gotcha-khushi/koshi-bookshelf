const navBookshelf = document.getElementById('nav-bookshelf');
const navAbout = document.getElementById('nav-about');

const bookshelfView = document.getElementById('bookshelf-view');
const aboutView = document.getElementById('about-view');

const aboutHeading = document.getElementById('about-heading');
const aboutText = document.getElementById('about-text');

async function fetchAboutData() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();
        aboutHeading.textContent = data.heading;
        aboutText.replaceChildren();
        data.content.forEach((paragraph) => {
            const element = document.createElement('p');
            element.textContent = paragraph;
            aboutText.appendChild(element);
        });
    } catch (error) {
        aboutHeading.textContent = "Hi I'm Koshi!";
        aboutText.textContent = "about koshi";
    }
}

fetchAboutData();

if (navBookshelf) {
    navBookshelf.addEventListener('click', () => {
        aboutView.classList.add('hidden');
        bookshelfView.classList.remove('hidden');
    });
}

if (navAbout) {
    navAbout.addEventListener('click', () => {
        bookshelfView.classList.add('hidden');
        aboutView.classList.remove('hidden');
    });
}