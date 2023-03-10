import { Transaction } from "../../../domain/entities/extends/transaction";
import { TransactionsRepository } from "../../../application/ports/repositories/transactions";

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async findById(id: string): Promise<Transaction | undefined> {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  async listByUserId(userId: string): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => transaction.payerId === userId || transaction.payeeId === userId);
  }

  async calculateBalance(userId: string): Promise<number> {
    const transactions = this.transactions.filter(
      (transaction) => transaction.payerId === userId || transaction.payeeId === userId,
    );
    const balance = transactions.reduce((acc, transaction) => {
      if (transaction.payerId === userId) {
        return acc - transaction.value;
      }
      return acc + transaction.value;
    }, 0);
    return balance;
  }
}
