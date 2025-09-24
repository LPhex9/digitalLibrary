import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  private authors = [
    { id: 1, name: 'J.K. Rowling', nationality: 'British', booksWritten: 15 },
    { id: 2, name: 'Stephen King', nationality: 'American', booksWritten: 65 }
  ];

  getAllAuthors() {
    return { authors: this.authors, total: this.authors.length };
  }

  createAuthor(authorData: any) {
    const newAuthor = { id: this.authors.length + 1, ...authorData };
    this.authors.push(newAuthor);
    return { message: 'Author created successfully', author: newAuthor };
  }

  getAuthor(id: string) {
    return this.authors.find(author => author.id === parseInt(id));
  }

  updateAuthor(id: string, authorData: any) {
    const authorIndex = this.authors.findIndex(author => author.id === parseInt(id));
    if (authorIndex > -1) {
      this.authors[authorIndex] = { ...this.authors[authorIndex], ...authorData };
      return { message: 'Author updated successfully', author: this.authors[authorIndex] };
    }
    return { message: 'Author not found' };
  }

  deleteAuthor(id: string) {
    const authorIndex = this.authors.findIndex(author => author.id === parseInt(id));
    if (authorIndex > -1) {
      const deletedAuthor = this.authors.splice(authorIndex, 1);
      return { message: 'Author deleted successfully', author: deletedAuthor };
    }
    return { message: 'Author not found' };
  }
}