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

  writeToServer(tokens) {
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
  };

  async llen(key, count, value) {
    const writeDone = await this.writeToServer("LREM", key, index);
    const returnVal = await this.resolveOnData();

    return returnVal;
  };

  async linsert(key, flag, pivot, value) {);
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
  };

  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
