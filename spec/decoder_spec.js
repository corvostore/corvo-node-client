import Decoder from '../decoder.js';

describe("decoder", () => {
  it("decodes resp-formatted string response from server", () => {
    const response = "+OK\r\n";
    const result = Decoder.decode(response);

    expect(result).toBe("OK");
  });

  it("decodes resp-formatted integer response from server", () => {
    const response = ":1\r\n";
    const result = Decoder.decode(response);

    expect(result).toBe(1);
  });

  it("decodes resp-formatted error response from server", () => {

  });

  it("decodes resp-formatted array response from server", () => {
    const response = "*3\r\n$-1\r\n:1\r\n$3\r\nkey\r\n";
    const result = Decoder.decode(response);

    expect(result).toEqual([null, 1, "key"]);
  });

  it("decodes resp-formatted bulk string response from server", () => {
    const response = "$-1\r\n";
    const result = Decoder.decode(response);

    expect(result).toBe(null);
  });
});
