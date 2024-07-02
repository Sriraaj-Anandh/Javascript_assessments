class Book {
    constructor(id, title, author, type) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.type = type;
        this.isBorrowed = false;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }

    addBook(title, author, type) {
        const newBook = new Book(this.nextId++, title, author, type);
        this.books.push(newBook);
        return newBook;
    }

    viewBooks() {
        return this.books;
    }

    borrowBook(id) {
        const book = this.books.find(book => book.id === id);
        if (!book) throw new Error('Book not found.');
        if (book.isBorrowed) throw new Error('Book is already borrowed.');
        book.isBorrowed = true;
        return book;
    }

    returnBook(id) {
        const book = this.books.find(book => book.id === id);
        if (!book) throw new Error('Book not found.');
        if (!book.isBorrowed) throw new Error('Book is not borrowed.');
        book.isBorrowed = false;
        return book;
    }
}

const library = new Library();

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const type = document.getElementById('type').value;
    
    if (!title || !author) {
        displayMessage('Title and Author are required.');
        return;
    }

    const book = library.addBook(title, author, type);
    displayMessage(`Book added: ${book.title} by ${book.author}`);
    updateBookList();
}

function updateBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    const books = library.viewBooks();
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Type: ${book.type}, Borrowed: ${book.isBorrowed}`;
        bookList.appendChild(li);
    });
}

function borrowBook() {
    const bookId = parseInt(document.getElementById('book-id').value);

    try {
        const book = library.borrowBook(bookId);
        displayMessage(`Book borrowed: ${book.title}`);
        updateBookList();
    } catch (error) {
        displayMessage(error.message);
    }
}

function returnBook() {
    const bookId = parseInt(document.getElementById('book-id').value);

    try {
        const book = library.returnBook(bookId);
        displayMessage(`Book returned: ${book.title}`);
        updateBookList();
    } catch (error) {
        displayMessage(error.message);
    }
}

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
}
