import Encoder from '../encoder.js';

describe("Encoder", () => {
  it("encodes tokens for set request", () => {
    const tokens = ['SET', 'k', 'val'];
    const expectedResult = "*3\r\n$3\r\nSET\r\n$1\r\nk\r\n$3\r\nval\r\n";
    const result = Encoder.encode(...tokens);

    expect(result).toBe(expectedResult);
  });

  it("encodes tokens for hvals request", () => {
    const tokens = ['HVALS', 'key1'];
    const expectedResult = "*2\r\n$5\r\nHVALS\r\n$4\r\nkey1\r\n";
    const returnVal = Encoder.encode(...tokens);
    expect(returnVal).toBe(expectedResult);
  });

  it("encodes tokens for hstrlen command", () => {
    const tokens = ['HSTRLEN', 'key1', 'field1'];
    const expectedResult = "*3\r\n$7\r\nHSTRLEN\r\n$4\r\nkey1\r\n$6\r\nfield1\r\n";
    const returnVal = Encoder.encode(...tokens);
    expect(returnVal).toBe(expectedResult);
  });

  it("encodes tokens for hmset command", () => {
    const tokens = ['HMSET', 'key1', 'field1', 'value1'];
    const expectedResult = "*4\r\n$5\r\nHMSET\r\n$4\r\nkey1\r\n$6\r\nfield1\r\n$6\r\nvalue1\r\n";
    const returnVal = Encoder.encode(...tokens);
    expect(returnVal).toBe(expectedResult);
  });
});
