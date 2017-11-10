import CorvoNodeClient from '../corvo_node_client';

describe("first test", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();
  //
  // beforeEach((done) => {
  //   client.writeToServer();
  //   client.client.on('data', function(data) {
  //     console.log("In testing callback");
  //     response = data;
  //     // done();
  //   });
  // });

  it("write test for client set command", () => {
    client.set("mykey", "myval").then((response) => {
      expect(response).toBe("+OK\r\n");
    });
  });
});
