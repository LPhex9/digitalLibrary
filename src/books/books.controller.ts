import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { UppercasePipe } from '../pipes/uppercase.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('available')
  getAvailableBooks() {
    return this.booksService.getAvailableBooks();
  }

  @Get('search')
  searchBooks(@Query('name', UppercasePipe) name: string) {
    if (!name) {
      return { success: false, message: 'Name query parameter is required' };
    }
    
    const books = this.booksService.searchBooksByName(name);
    
    return {
      success: true,
      searchTerm: name,
      results: books,
      total: books.length
    };
  }

  @Get('details/:id')
  getBookDetails(@Param('id') id: string) {
    const book = this.booksService.getBookDetails(id);
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    return {
      success: true,
      book: book
    };
  }

  @Post()
  createBook(@Body() bookData: any) {
    return this.booksService.createBook(bookData);
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() bookData: any) {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

  @Put(':id/availability')
  updateAvailability(@Param('id') id: string, @Body() availabilityData: any) {
    return this.booksService.updateAvailability(id, availabilityData.available);
  }
}