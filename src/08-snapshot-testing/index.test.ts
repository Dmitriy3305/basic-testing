import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const data = [100, 200, 300];
    const output = {
      value: 100,
      next: {
        value: 200,
        next: {
          value: 300,
          next: { value: null, next: null },
        },
      },
    };

    const result = generateLinkedList(data);
    expect(result).toStrictEqual(output);
  });

  test('should generate linked list from values 2', () => {
    const data = [100, 200, 300];
    const result = generateLinkedList(data);
    expect(result).toMatchSnapshot();
  });
});
