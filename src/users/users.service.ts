import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'JOHN DOE', email: 'john@email.com', membership: 'active', phone: '123-456-7890' },
    { id: 2, name: 'JANE SMITH', email: 'jane@email.com', membership: 'active', phone: '123-456-7891' },
    { id: 3, name: 'BOB JOHNSON', email: 'bob@email.com', membership: 'inactive', phone: '123-456-7892' }
  ];

  getAllUsers() {
    return { users: this.users, total: this.users.length };
  }

  searchUsersByName(name: string) {
    return this.users.filter(user => user.name.includes(name));
  }

  getUserDetails(id: string) {
    return this.users.find(user => user.id === parseInt(id));
  }

  createUser(userData: any) {
    const newUser = { 
      id: this.users.length + 1, 
      ...userData,
      name: userData.name.toUpperCase()
    };
    this.users.push(newUser);
    return { message: 'User created successfully', user: newUser };
  }

  getUser(id: string) {
    return this.users.find(user => user.id === parseInt(id));
  }

  updateUser(id: string, userData: any) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex > -1) {
      if (userData.name) userData.name = userData.name.toUpperCase();
      
      this.users[userIndex] = { ...this.users[userIndex], ...userData };
      return { message: 'User updated successfully', user: this.users[userIndex] };
    }
    return { message: 'User not found' };
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex > -1) {
      const deletedUser = this.users.splice(userIndex, 1);
      return { message: 'User deleted successfully', user: deletedUser };
    }
    return { message: 'User not found' };
  }
}