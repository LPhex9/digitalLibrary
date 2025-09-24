import { Injectable } from '@nestjs/common';

@Injectable()
export class LoansService {
  private loans = [
    { 
      id: 1, 
      bookId: 1, 
      userId: 1, 
      bookTitle: 'The Great Gatsby',
      userName: 'John Doe',
      loanDate: '2024-01-15', 
      dueDate: '2024-01-29',
      returnDate: null,
      status: 'active'
    },
    { 
      id: 2, 
      bookId: 2, 
      userId: 2, 
      bookTitle: 'To Kill a Mockingbird',
      userName: 'Jane Smith', 
      loanDate: '2024-01-10',
      dueDate: '2024-01-24',
      returnDate: '2024-01-20',
      status: 'returned'
    }
  ];

  getAllLoans() {
    return { loans: this.loans, total: this.loans.length };
  }

  createLoan(loanData: any) {
    const newLoan = { 
      id: this.loans.length + 1, 
      status: 'active',
      returnDate: null,
      ...loanData 
    };
    this.loans.push(newLoan);
    return { message: 'Loan created successfully', loan: newLoan };
  }

  getLoan(id: string) {
    return this.loans.find(loan => loan.id === parseInt(id));
  }

  updateLoan(id: string, loanData: any) {
    const loanIndex = this.loans.findIndex(loan => loan.id === parseInt(id));
    if (loanIndex > -1) {
      this.loans[loanIndex] = { ...this.loans[loanIndex], ...loanData };
      return { message: 'Loan updated successfully', loan: this.loans[loanIndex] };
    }
    return { message: 'Loan not found' };
  }

  deleteLoan(id: string) {
    const loanIndex = this.loans.findIndex(loan => loan.id === parseInt(id));
    if (loanIndex > -1) {
      const deletedLoan = this.loans.splice(loanIndex, 1);
      return { message: 'Loan deleted successfully', loan: deletedLoan };
    }
    return { message: 'Loan not found' };
  }

  returnLoan(id: string) {
    const loanIndex = this.loans.findIndex(loan => loan.id === parseInt(id));
    if (loanIndex > -1) {
      this.loans[loanIndex].status = 'returned';
      this.loans[loanIndex].returnDate = new Date().toISOString().split('T')[0];
      return { message: 'Book returned successfully', loan: this.loans[loanIndex] };
    }
    return { message: 'Loan not found' };
  }

  getActiveLoans() {
    const activeLoans = this.loans.filter(loan => loan.status === 'active');
    return { loans: activeLoans, total: activeLoans.length };
  }

  getUserLoans(userId: string) {
    const userLoans = this.loans.filter(loan => loan.userId === parseInt(userId));
    return { loans: userLoans, total: userLoans.length };
  }
}