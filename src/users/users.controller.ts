import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UppercasePipe } from '../pipes/uppercase.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('search')
  searchUsers(@Query('name', UppercasePipe) name: string) {
    if (!name) {
      return { success: false, message: 'Name query parameter is required' };
    }
    
    const users = this.usersService.searchUsersByName(name);
    
    return {
      success: true,
      searchTerm: name,
      results: users,
      total: users.length
    };
  }

  @Get('details/:id')
  getUserDetails(@Param('id') id: string) {
    const user = this.usersService.getUserDetails(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return {
      success: true,
      user: user
    };
  }

  @Post()
  createUser(@Body() userData: any) {
    return this.usersService.createUser(userData);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: any) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}