import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const test = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(test).toBe(8);
  });

  test('should subtract two numbers', () => {
    const test = simpleCalculator({ a: 2, b: 1, action: Action.Subtract });
    expect(test).toBe(1);
  });

  test('should multiply two numbers', () => {
    const test = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    expect(test).toBe(4);
  });

  test('should divide two numbers', () => {
    const test = simpleCalculator({ a: 8, b: 4, action: Action.Divide });
    expect(test).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const test = simpleCalculator({ a: 2, b: 3, action: 'some action' });
    expect(test).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 5,
      b: false,
      action: Action.Subtract,
    });
    expect(result).toBeNull();
  });
});
