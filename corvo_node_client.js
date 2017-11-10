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

  destroyClient() {
    this.client.destroy();
  }
}

export default CorvoNodeClient;
