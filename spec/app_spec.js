import CorvoNodeClient from '../corvo_node_client';

describe("first test", () => {
  it("write test for client set command", () => {

    const client = new CorvoNodeClient();

    client.set("string key", "string val", function(response) {
      console.log(response);
      expect(response).toBe("+OK\r\n");
    });
  });
});
