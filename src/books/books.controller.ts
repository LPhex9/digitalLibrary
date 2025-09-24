import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get('list')
    getBooksList() {
        return this.booksService.getAllBooks();
    }

    @Get('details/:id')
    getBookDetails(@Param('id') id: string) {
        return this.booksService.getBookDetails(id);
    }
}