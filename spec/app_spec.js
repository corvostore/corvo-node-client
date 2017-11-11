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

  client.destroyClient();
});

describe("del", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("deletes a single key and returns 1", () => {
    client.set("myKEY", "myval");
    client.del("myKEY").then((response) => {
      expect(response).toBe(":1\r\n");
    });
  });

  client.destroyClient();
});

describe("del", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("deletes multiple keys and returns the number of deletions", () => {
    client.set("mykey1", "myval");
    client.set("mykey2", "anotherVal");
    client.del("mykey1", "mykey2").then((response) => {
      expect(response).toBe(":2\r\n");
    });
  });

  client.destroyClient();
});

describe("hset", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("creates a hash, sets field and val, and returns 1", () => {
    client.hset("my_key", "myField", "myVal").then((response) => {
      expect(response).toBe(":1\r\n");
    });
  });

  client.destroyClient();
});

describe("lpush", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("creates a new list and adds a value", () => {
    client.lpush("somekey", "myval").then((response) => {
      expect(response).toBe(":1\r\n");
    });
  });

  client.destroyClient();
});

describe("lpush multiple", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("creates a list and adds multiple values", () => {
    client.lpush("ZKEY", "myval", "sdfa", "dasfasd").then((response) => {
      expect(response).toBe(":3\r\n");
    });
  });

  client.destroyClient();
});

describe("lindex", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("returns val at given index in list", () => {
    client.lpush("zzz", "a", "b", "c");
    client.lindex("asdfcd", 1).then((response) => {
      expect(response).toBe("+b\r\n");
    });
  });

  client.destroyClient();
});

describe("lrem", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("returns number of removed elements", () => {
    client.lpush("myList", "hello", "foo", "hello", "hello");
    client.lrem("mylist", -2, "hello").then((response) => {
      expect(response).toBe(":2\r\n");
    });
  });

  client.destroyClient();
});

describe("llen", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("returns the length of the list", () => {
    client.lpush("myOtherList", "hello", "foo", "hello", "hello");
    client.llen("myOtherlist").then((response) => {
      expect(response).toBe(":4\r\n");
    });
  });

  client.destroyClient();
});

describe("linsert", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("the length of the list after the insert operation", () => {
    client.lpush("myOtherOtherList", "hello", "foo", "hello", "hello");
    client.linsert("myOtherOtherList", "AFTER", "foo", "newVal");
    client.llen("myOtherOtherlist").then((response) => {
      expect(response).toBe(":5\r\n");
    });
  });

  client.destroyClient();
});

describe("rpush", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("creates a new list and adds a value returning the length of the list", () => {
    client.lpush("someNEWkey", "myval").then((response) => {
      expect(response).toBe(":1\r\n");
    });
  });

  client.destroyClient();
});

describe("rpush multiple", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("creates a list and adds multiple values", () => {
    client.lpush("XYZKEY", "myval", "sdfa", "dasfasd").then((response) => {
      expect(response).toBe(":3\r\n");
    });
  });

  client.destroyClient();
});

describe("lpop", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("pops the left value off a list and returns it", () => {
    client.lpush("zzzzbbbb", "myval", "sdfa", "dasfasd");
    client.lpop("zzzzbbbb").then((response) => {
      expect(response).toBe("+dasfasd\r\n");
    });
  });

  client.destroyClient();
});

describe("rpop", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("pops the right value off a list and returns it", () => {
    client.lpush("zzb", "myval", "sdfa", "dasfasd");
    client.lpop("zzb").then((response) => {
      expect(response).toBe("+myval\r\n");
    });
  });

  client.destroyClient();
});

describe("lset", () => {
  let response = "response not received";
  const client = new CorvoNodeClient();

  it("returns OK if a value is successfully set", () => {
    client.rpush("ZZZZZZZList", "aVAL!");
    client.lset("ZZZZZZZList", 0, "differentVal").then((response) => {
      expect(response).toBe("+OK\r\n");
    });
  });

  client.destroyClient();
});
