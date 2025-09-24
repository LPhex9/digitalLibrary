import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {
  
  @Get('list')
  getBooksList() {
    return {
      success: true,
      books: [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          year: 1925,
          available: true
        },
        {
          id: 2, 
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee', 
          year: 1960,
          available: false
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          year: 1949,
          available: true
        }
      ],
      total: 3,
      available: 2,
      timestamp: new Date().toISOString()
    };
  }
}