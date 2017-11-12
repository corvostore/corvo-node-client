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
        resolve(data);
      });
    });
  }

  writeToServer(message) {
    return new Promise(resolve => {
      this.client.write(message, function(data) {
        resolve(1);
      });
    });
  }

  async set(key, val) {
    const message = Encoder.encode("SET", key, val);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hvals(key) {
    const message = Encoder.encode("HVALS", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hstrlen(key, field) {
    const message = Encoder.encode("HSTRLEN", key, field);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hmset(key, field, value, ...moreParams) {
    const message = Encoder.encode("HMSET", key, field, value, ...moreParams);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hdel(key, field, ...moreFields) {
    const message = Encoder.encode("HDEL", key, field, ...moreFields);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hget(key, field) {
    const message = Encoder.encode("HGET", key, field);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hgetall(key) {
    const message = Encoder.encode("HGETALL", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hlen(key) {
    const message = Encoder.encode("HLEN", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hsetnx(key, field, value) {
    const message = Encoder.encode("HSETNX", key, field, value);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hmget(key, field, ...moreFields) {
    const message = Encoder.encode("HMGET", key, field, ...moreFields);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hincrby(key, field, increment) {
    const message = Encoder.encode("HINCRBY", key, field, increment);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hkeys(key) {
    const message = Encoder.encode("HKEYS", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  //----
  async hset(keys) {
    const message = Encoder.encode("HSET", keys);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }
  //----
  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
