import CorvoNodeClient from '../corvo_node_client';

describe("get", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("returns value stored at key", () => {
    client.set("mykey", "myval");
    client.get("mykey").then((response) => {
      expect(response).toBe("myval");
      client.destroyClient();
    });
  });

  it("returns null when key does not exist", () => {
    client.get("mykey").then((response) => {
      expect(response).toBe(null);
      client.destroyClient();
    });
  });
});

describe("set", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("write test for client set command", () => {
    client.set("mykey", "myval").then((response) => {
      expect(response).toBe("+OK\r\n");
      client.destroyClient();
    });
  });


});
