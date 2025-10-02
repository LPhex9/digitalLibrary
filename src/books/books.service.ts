import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [
    { 
      id: 1, 
      title: 'THE GREAT GATSBY', 
      author: 'F. SCOTT FITZGERALD',
      isbn: '978-0-7432-7356-5',
      year: 1925, 
      genre: 'Fiction',
      available: true,
      description: 'A story of wealth, love, and the American Dream in the 1920s.',
      publisher: 'Charles Scribner\'s Sons',
      pages: 180
    },
    { 
      id: 2, 
      title: 'TO KILL A MOCKINGBIRD', 
      author: 'HARPER LEE',
      isbn: '978-0-06-112008-4', 
      year: 1960, 
      genre: 'Fiction',
      available: false,
      description: 'A gripping story of racial injustice and childhood innocence.',
      publisher: 'J.B. Lippincott & Co.',
      pages: 281
    },
    { 
      id: 3, 
      title: 'GREAT EXPECTATIONS', 
      author: 'CHARLES DICKENS',
      isbn: '978-0-14-143956-3',
      year: 1861, 
      genre: 'Classic',
      available: true,
      description: 'A coming-of-age story of an orphan named Pip.',
      publisher: 'Chapman & Hall',
      pages: 544
    },
    { 
      id: 4, 
      title: 'THE GREAT ALONE', 
      author: 'KRISTIN HANNAH',
      isbn: '978-0-316-40400-0',
      year: 2018, 
      genre: 'Fiction',
      available: true,
      description: 'A family struggles for survival in the Alaskan wilderness.',
      publisher: 'St. Martin\'s Press',
      pages: 440
    }
  ];

  getAllBooks() {
    return { books: this.books, total: this.books.length };
  }

  getAvailableBooks() {
    const availableBooks = this.books.filter(book => book.available);
    return { books: availableBooks, total: availableBooks.length };
  }

  searchBooksByName(name: string) {
    return this.books.filter(book => 
      book.title.includes(name) || 
      book.author.includes(name)
    );
  }

  getBookDetails(id: string) {
    const book = this.books.find(book => book.id === parseInt(id));
    return book;
  }

  createBook(bookData: any) {
    const newBook = { 
      id: this.books.length + 1, 
      available: true, 
      ...bookData,
      title: bookData.title.toUpperCase(),
      author: bookData.author.toUpperCase()
    };
    this.books.push(newBook);
    return { message: 'Book added successfully', book: newBook };
  }

  getBook(id: string) {
    return this.books.find(book => book.id === parseInt(id));
  }

  updateBook(id: string, bookData: any) {
    const bookIndex = this.books.findIndex(book => book.id === parseInt(id));
    if (bookIndex > -1) {
      if (bookData.title) bookData.title = bookData.title.toUpperCase();
      if (bookData.author) bookData.author = bookData.author.toUpperCase();
      
      this.books[bookIndex] = { ...this.books[bookIndex], ...bookData };
      return { message: 'Book updated successfully', book: this.books[bookIndex] };
    }
    return { message: 'Book not found' };
  }

  deleteBook(id: string) {
    const bookIndex = this.books.findIndex(book => book.id === parseInt(id));
    if (bookIndex > -1) {
      const deletedBook = this.books.splice(bookIndex, 1);
      return { message: 'Book deleted successfully', book: deletedBook };
    }
    return { message: 'Book not found' };
  }

  updateAvailability(id: string, available: boolean) {
    const bookIndex = this.books.findIndex(book => book.id === parseInt(id));
    if (bookIndex > -1) {
      this.books[bookIndex].available = available;
      return { 
        message: `Book ${available ? 'marked as available' : 'marked as unavailable'}`, 
        book: this.books[bookIndex] 
      };
    }
    return { message: 'Book not found' };
  }
}