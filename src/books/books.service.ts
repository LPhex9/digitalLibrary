import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [
    { id: 1, title: 'Sample Book', author: 'Author Name', available: true }
  ];

  getAllBooks() {
    return { books: this.books, total: this.books.length };
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