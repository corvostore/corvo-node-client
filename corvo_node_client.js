import Net from 'net';

class CorvoNodeClient {
  constructor() {
    this.client = new Net.Socket();
    this.client.connect(6379, '127.0.0.1', this.handleConnection.bind(this));
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

  handleConnection(conn) {
    this.client.setEncoding("utf-8");

    this.client.on('close', function() {
      console.log('Connection closed');
    });
  }

  async set(key, val) {
    const message = "*3\r\n$3\r\nSET\r\n$1\r\nk\r\n$3\r\nabc\r\n";
    const writeDone = await this.writeToServer(message);
    const returnVal = await this.resolveOnData();

    this.client.destroy();
    return returnVal;
  }
}

export default CorvoNodeClient;
