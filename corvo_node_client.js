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

  async del(keys) {
    const message = Encoder.encode("DEL", keys);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lpush(...keys) {
    const message = Encoder.encode("LPUSH", ...keys);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async hset(keys) {
    const message = Encoder.encode("HSET", keys);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lindex(key, index) {
    index = index.toString();
    const message = Encoder.encode("LINDEX", key, index);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lrem(key, count, value) {
    const message = Encoder.encode("LREM", key, index);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  };

  async llen(key, count, value) {
    const message = Encoder.encode("LREM", key, index);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  };

  async linsert(key, flag, pivot, value) {
    const message = Encoder.encode("LINSERT", key, flag, pivot, value);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async rpush(...keys) {
    const message = Encoder.encode("RPUSH", ...keys);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lpop(key) {
    const message = Encoder.encode("LPOP", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async rpop(key) {
    const message = Encoder.encode("RPOP", key);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  }

  async lset(key, index, val) {
    const message = Encoder.encode("LSET", key, index, val);
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    return returnVal;
  };

  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
