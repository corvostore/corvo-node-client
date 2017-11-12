import CorvoNodeClient from '../corvo_node_client';

describe("client", () => {
/*
  let response = "response not received";
  // const client = new CorvoNodeClient();
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
  const client = new CorvoNodeClient();
    client.set("mykey", "myval").then((response) => {
      expect(response).toBe("+OK\r\n");
    });
    client.destroyClient();
  });

  it("uses hvals command and receives an array of field values", () => {
    const client = new CorvoNodeClient();
    client.hset("key1", "field1", "val1").then();
    client.hset("key1", "field2", "val2").then();
    client.hvals("key1").then((response) => {
      expect(response).toEqual(["val1", "val2"]);
    });
   client.destroyClient();
  });

  it("uses hvals command and receives an empty array for non-existent key", () => {
    const client = new CorvoNodeClient();
    client.hvals("key5").then((response) => {
      expect(response).toEqual([]);
    });
    client.destroyClient();
  });

  it("uses strlen command and receives value of field", () => {
    const client = new CorvoNodeClient();
    client.hset("key1", "field1", "val1").then();
    client.hstrlen("key1", "field1").then((response) => {
      expect(response).toBe(4);
    });
    client.destroyClient();
  });

  it("uses strlen command and receives 0 when for non-existent field in key", () => {
    const client = new CorvoNodeClient();
    client.hset("key1", "field1", "val1").then((reponse) => {
    });
    client.hstrlen("key1", "field2").then((response) => {
      expect(response).toBe(0);
    });
    client.destroyClient();
  });
*/
});

describe("client", () => {
  let response = "response not received";
  let client;
  beforeEach(() => {
    client = new CorvoNodeClient();
  });
  
  it("write test for client set command", () => {
    client.set("mykey", "myval").then((response) => {
      expect(response).toBe("+OK\r\n");
    });
  });

  afterEach(() => {
    client.destroyClient();
  });
});
