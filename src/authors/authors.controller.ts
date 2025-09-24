import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Post()
  createAuthor(@Body() authorData: any) {
    return this.authorsService.createAuthor(authorData);
  }

  @Get(':id')
  getAuthor(@Param('id') id: string) {
    return this.authorsService.getAuthor(id);
  }

  @Put(':id')
  updateAuthor(@Param('id') id: string, @Body() authorData: any) {
    return this.authorsService.updateAuthor(id, authorData);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(id);
  }
}