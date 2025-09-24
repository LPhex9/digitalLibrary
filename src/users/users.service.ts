import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@email.com', membership: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', membership: 'active' }
  ];

  getAllUsers() {
    return { users: this.users, total: this.users.length };
  }

  createUser(userData: any) {
    const newUser = { id: this.users.length + 1, ...userData };
    this.users.push(newUser);
    return { message: 'User created successfully', user: newUser };
  }

  getUser(id: string) {
    return this.users.find(user => user.id === parseInt(id));
  }

  updateUser(id: string, userData: any) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex > -1) {
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