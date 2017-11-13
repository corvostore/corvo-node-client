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

  writeToServer(...tokens) {
    return new Promise(resolve => {
      const message = Encoder.encode(...tokens);
      this.client.write(message, function(data) {
        resolve(1);
      });
    });
  }

  async set(...tokens) {
    const allTokens = ['SET'].concat(tokens);
    const writeDone = await this.writeToServer(allTokens);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async get(key) {
    const writeDone = await this.writeToServer("GET", key);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async set(key, val, ...flags) {
    const writeDone = await this.writeToServer("SET", key, val, ...flags);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async append(key, val) {
    const writeDone = await this.writeToServer("APPEND", key, val);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async strlen(key) {
    const writeDone = await this.writeToServer("STRLEN", key);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async del(...tokens) {
    const allTokens = ['DEL'].concat(tokens);
    const writeDone = await this.writeToServer(allTokens);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hkeys(key) {
    const writeDone = await this.writeToServer("HKEYS", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lpush(...tokens) {
    const allTokens = ['LPUSH'].concat(tokens);
    const writeDone = await this.writeToServer(...allTokens);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lindex(key, index) {
    const writeDone = await this.writeToServer("LINDEX", key, index);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lrem(key, count, value) {
    const writeDone = await this.writeToServer("LREM", key, count, value);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async llen(key, count, value) {
    const writeDone = await this.writeToServer("LREM", key, index);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async linsert(key, flag, pivot, value) {
    const writeDone = await this.writeToServer("LINSERT", key, flag, pivot, value);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async rpush(...keys) {
    const allTokens = ["RPUSH"].concat(keys);
    const writeDone = await this.writeToServer(allTokens);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lpop(key) {
    const writeDone = await this.writeToServer("LPOP", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async rpop(key) {
    const writeDone = await this.writeToServer("RPOP", key);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lset(key, index, val) {
    const writeDone = await this.writeToServer("LSET", key, index, val);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async touch(...keys) {
    const writeDone = await this.writeToServer("TOUCH", ...keys);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async incr(key) {
    const writeDone = await this.writeToServer("INCR", key);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async decr(key) {
    const writeDone = await this.writeToServer("DECR", key);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async exists(...keys) {
    const writeDone = await this.writeToServer("EXISTS", ...keys);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async rename(key, newKey) {
    const writeDone = await this.writeToServer("RENAME", key, newKey);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async renamenx(key, newKey) {
    const writeDone = await this.writeToServer("RENAMENX", key, newKey);
    const returnVal = await this.resolveOnData();
    return returnVal;
  }

  async type(key) {
    const writeDone = await this.writeToServer("TYPE", key);
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

  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
