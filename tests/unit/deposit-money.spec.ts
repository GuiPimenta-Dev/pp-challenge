import { DepositMoney } from "../../src/usecases/deposit-money";
import { InMemoryTransactionsRepository } from "../../src/infra/repositories/in-memory/transactions";
import { InMemoryUsersRepository } from "../../src/infra/repositories/in-memory/users";
import { UserBuilder } from "../utils/builder/user";

it("shoould be able to deposit money", async () => {
  const usersRepository = new InMemoryUsersRepository();
  const user = UserBuilder.anUser().build();
  await usersRepository.create(user);
  const transactionsRepository = new InMemoryTransactionsRepository();

  const sut = new DepositMoney({ usersRepository, transactionsRepository });
  const input = { value: 100, userId: user.id };
  await sut.execute(input);

  const balance = await transactionsRepository.calculateBalance(user.id);
  expect(balance).toBe(100);
});
