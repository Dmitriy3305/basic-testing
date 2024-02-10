import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const firstAccount = getBankAccount(1000);
    const secondAccount = getBankAccount(0);
    expect(() => firstAccount.transfer(1500, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(1500);
    expect(account.getBalance()).toBe(2500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(1000);
    const secondAccount = getBankAccount(0);
    firstAccount.transfer(500, secondAccount);
    expect(firstAccount.getBalance()).toBe(500);
    expect(secondAccount.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    account.fetchBalance = jest.fn().mockResolvedValue(1000);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
