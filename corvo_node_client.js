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



  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
