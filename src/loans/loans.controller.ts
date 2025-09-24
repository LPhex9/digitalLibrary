import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  getAllLoans() {
    return this.loansService.getAllLoans();
  }

  @Get('active')
  getActiveLoans() {
    return this.loansService.getActiveLoans();
  }

  @Get('user/:userId')
  getUserLoans(@Param('userId') userId: string) {
    return this.loansService.getUserLoans(userId);
  }

  @Post()
  createLoan(@Body() loanData: any) {
    return this.loansService.createLoan(loanData);
  }

  @Get(':id')
  getLoan(@Param('id') id: string) {
    return this.loansService.getLoan(id);
  }

  @Put(':id')
  updateLoan(@Param('id') id: string, @Body() loanData: any) {
    return this.loansService.updateLoan(id, loanData);
  }

  @Delete(':id')
  deleteLoan(@Param('id') id: string) {
    return this.loansService.deleteLoan(id);
  }

  @Post(':id/return')
  returnLoan(@Param('id') id: string) {
    return this.loansService.returnLoan(id);
  }
}