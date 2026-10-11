// js/book.js
function createBookComponent(book){
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const bookScene = document.createElement("div");
    bookScene.classList.add("book-scene");

    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.style.backgroundColor = book.color;

    const titleSpan = document.createElement("span");
    titleSpan.textContent = book.title;
    bookEl.appendChild(titleSpan);

    const coverEl = document.createElement("div");
    coverEl.classList.add("book-cover");
    coverEl.style.setProperty("--cover-color", book.color);

    if (book.coverimage){
        const coverImage= document.createElement("img");
        coverImage.src = book.coverimage;
        coverImage.alt= `${book.title} cover`;
        coverEl.appendChild(coverImage);
    }

    bookScene.append(bookEl,coverEl);
    bookItem.appendChild(bookScene);

    return bookItem;

}

