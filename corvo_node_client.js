import Net from 'net';

class CorvoNodeClient {
  constructor() {
    this.client = new Net.Socket();
    this.client.connect(6379, '127.0.0.1', this.handleConnection.bind(this));
  }

  handleConnection(conn) {

    this.client.setEncoding("utf-8");

    // this.client.on('data', function(data) {
    //   console.log('Received: ' + data);
    //   // client.destroy(); // kill client after server's response
    // });

    this.client.on('close', function() {
      console.log('Connection closed');
    });
  }

  set(key, val, callback) {
    // create new promise, execute callback when data
    const p = Promise.resolve(this.client.write("*2\r\n$3\r\nGET\r\n$1\r\nk\r\n"));

    p.then(function(data) {
      console.log(data);
    });
  }


}

export default CorvoNodeClient;
