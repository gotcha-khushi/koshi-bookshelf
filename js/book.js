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

    const hex = book.color.replace('#','');
    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);
    const brightness = (r* 0.299) + (g*0.587) + (b*0.114);

    // 3. Apply the style based on the math
    if (brightness > 128) {
        titleSpan.style.color = "#111111";
    } else {
        titleSpan.style.color = "#f4f4f4";
    }

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



