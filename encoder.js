import Net from 'net';

class Encoder {
  static encode(...tokens) {
    let respString = '*' + tokens.length + '\r\n';

    tokens.forEach((token) => {
      let segment = this.genLengthToken(token);
      segment += '\r\n';
      segment += token;
      segment += '\r\n';
      respString += segment;
    });

    return respString;
  }

  static genLengthToken(token) {
    return '$' + token.length;
  }
}

export default Encoder;
