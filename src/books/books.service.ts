import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService {
    private books = [
        { id: 1, title: 'Book 1', author: 'Author 1', available: true },
        { id: 2, title: 'Book 2', author: 'Author 2', available: true },
        { id: 3, title: 'Book 3', author: 'Author 3', available: false },
        { id: 4, title: 'Book 4', author: 'Author 4', available: true },
        { id: 5, title: 'Book 5', author: 'Author 5', available: true },
        { id: 6, title: 'Book 6', author: 'Author 6', available: false },
        { id: 7, title: 'Book 7', author: 'Author 7', available: true },
        { id: 8, title: 'Book 8', author: 'Author 8', available: true },
        { id: 9, title: 'Book 9', author: 'Author 9', available: true },
        { id: 10, title: 'Book 10', author: 'Author 10', available: false }
    ];

    getAllBooks() {
        return { books: this.books, total: this.books.length };
    }

    getBookDetails(id: string) {
        const bookId = parseInt(id);
        const book = this.books.find(book => book.id === bookId);
        
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        
        return book;
    }

    addBook(bookData: any) {
        const newBook = { id: this.books.length + 1, ...bookData };
        this.books.push(newBook);
        return { message: 'Book added successfully', book: newBook };
    }

    getBook(id: string) {
        return this.books.find(book => book.id === parseInt(id));
    }
}