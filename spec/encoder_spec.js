import Encoder from '../encoder.js';

describe("Encoder", () => {
  it("encodes tokens for set request", () => {
    const tokens = ['SET', 'k', 'val'];
    const expectedResult = "*3\r\n$3\r\nSET\r\n$1\r\nk\r\n$3\r\nval\r\n";
    const result = Encoder.encode(...tokens);

    expect(result).toBe(expectedResult);
  });
});
