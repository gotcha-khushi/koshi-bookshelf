document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    setupScrollArrows();
});

async function loadBooks(){
    try{
        const response = await fetch("data/books.json");
        const books = await response.json();
        renderBookshelf(books);

        if (books.length>0){
            displayBookDetails(books[0]);
        }
    } catch(error) {
        console.error("Failed to load book data:", error);
    }
}

function renderBookshelf(books){
    const shelf=document.getElementById("bookshelf");
        if (!shelf) return;
        shelf.innerHTML= "";
        books.forEach((book) => {
            const bookItem=document.createElement("div");
            bookItem.classList.add("book-item");

            const bookScene=document.createElement("div");
            bookScene.classList.add("book-scene");

            const bookEl=document.createElement("div");
            bookEl.classList.add("book");
            bookEl.style.backgroundColor = book.color;

            const titleSpan = document.createElement("span");
            titleSpan.textContent=book.title;
            bookEl.appendChild(titleSpan);

            const coverEl=document.createElement("div");
            coverEl.classList.add("book-cover");
            coverEl.style.setProperty("--cover-color", book.color);

            if (book.cover) {
                const coverImage=document.createElement("img");
                coverImage.src=book.cover;
                coverImage.alt=`${book.title} cover`;
                coverImage.addEventListener("error", () => coverImage.remove(), { once:true });
                coverEl.appendChild(coverImage);
            }

            bookScene.append(bookEl, coverEl);
            bookItem.appendChild(bookScene);
            bookItem.addEventListener("click", () => {
                const wasActive = bookItem.classList.contains("active");
                shelf.querySelectorAll(".book-item.active").forEach((activeBook) => {
                    activeBook.classList.remove("active");
                });
                if (!wasActive) {
                    bookItem.classList.add("active");
                    requestAnimationFrame(() => {
                        const itemLeft = bookItem.getBoundingClientRect().left
                            - shelf.getBoundingClientRect().left + shelf.scrollLeft;
                        shelf.scrollTo({
                            left: Math.max(0, itemLeft + 173 - shelf.clientWidth),
                            behavior: "smooth"
                        });
                    });
                }
                displayBookDetails(book);
            });
            shelf.appendChild(bookItem);
        });
}

function displayBookDetails(book) {
    const titleEl = document.getElementById("book-title");
    const authorEl = document.getElementById("book-author");
    const readTimeEl = document.getElementById("book-readtime");
    const ratingEl = document.getElementById("book-rating");
    const reviewEl = document.getElementById("book-review");


    if (titleEl) titleEl.textContent = book.title;
    if (authorEl) authorEl.textContent = `Author:${book.author}`;
    if (readTimeEl) readTimeEl.textContent = `Read:${book.readTime || book.readtime}`;
    if (ratingEl) ratingEl.textContent = `Rating: ${book.rating}`;
    if (reviewEl) reviewEl.textContent = book.review;

}


//function for arrow scroll

let scrollTimer;

function setupScrollArrows(){
    const shelf = document.getElementById("bookshelf");
    const leftArrow=document.querySelector(".scroll-left");
    const rightArrow=document.querySelector(".scroll-right");

    if (!shelf || !leftArrow || !rightArrow) return;

    function startScrolling(direction){
        clearInterval(scrollTimer);

        scrollTimer= setInterval(() => {
            if (direction === "left") {
                shelf.scrollLeft -= 1.5;
            } else if (direction === "right"){
                shelf.scrollLeft += 1.5;
            }
        }, 16);       
    }

    function stopScrolling() {
        clearInterval(scrollTimer);
    }

    leftArrow.addEventListener("mouseenter",() => startScrolling("left"));
    leftArrow.addEventListener("mouseleave", stopScrolling);


    rightArrow.addEventListener("mouseenter",() => startScrolling("right"));
    rightArrow.addEventListener("mouseleave", stopScrolling);
}
