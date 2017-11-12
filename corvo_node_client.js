import Net from 'net';
import Encoder from './encoder.js';
import Decoder from './decoder.js';

class CorvoNodeClient {
  constructor() {
    this.client = new Net.Socket();
    this.client.connect(6379, '127.0.0.1', this.handleConnection.bind(this));
  }

  handleConnection(conn) {
    this.client.setEncoding("utf-8");

    this.client.on('close', function() {
      console.log('Connection closed');
    });
  }

  resolveOnData() {
    return new Promise(resolve => {
      this.client.on('data', function(data) {
        resolve(Decoder.decode(data));
      });
    });
  }

  writeToServer(command, ...restOfParams) {
    return new Promise(resolve => {
      const message = Encoder.encode(command, ...restOfParams);
      this.client.write(message, function(data) {
        resolve(1);
      });
    });
  }

  async set(key, val) {
    const writeDone = await this.writeToServer("SET", key, val);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hvals(key) {
    const writeDone = await this.writeToServer("HVALS", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hstrlen(key, field) {
    const writeDone = await this.writeToServer("HSTRLEN", key, field);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hmset(key, field, value, ...moreParams) {
    const writeDone = await this.writeToServer("HMSET", key, field, value, ...moreParams);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hdel(key, field, ...moreFields) {
    const writeDone = await this.writeToServer("HDEL", key, field, ...moreFields);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hget(key, field) {
    const writeDone = await this.writeToServer("HGET", key, field);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hgetall(key) {
    const writeDone = await this.writeToServer("HGETALL", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hlen(key) {
    const writeDone = await this.writeToServer("HLEN", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hsetnx(key, field, value) {
    const writeDone = await this.writeToServer("HSETNX", key, field, value);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hmget(key, field, ...moreFields) {
    const writeDone = await this.writeToServer("HMGET", key, field, ...moreFields);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hincrby(key, field, increment) {
    const writeDone = await this.writeToServer("HINCRBY", key, field, increment);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hkeys(key) {
    const writeDone = await this.writeToServer("HKEYS", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  //----
  async hset(...keys) {
    const writeDone = await this.writeToServer("HSET", ...keys);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }
  //----
  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
