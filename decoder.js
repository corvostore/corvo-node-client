/*
For Simple Strings the first byte of the reply is "+"
For Errors the first byte of the reply is "-"
For Integers the first byte of the reply is ":"
For Bulk Strings the first byte of the reply is "$"
For Arrays the first byte of the reply is "*"
*/
class Decoder {
  static decode(respString) {
    if (respString === "+OK\r\n") {
      return "OK";
    } else if (respString === "$-1\r\n") {
      return null;
    } else if (respString[0] === "+") {
      return respString.slice(1, respString.length - 2);
    } else if (respString[0] === "-") {
      // modify to handle error, currently just returning as string
      return respString.slice(1, respString.length - 2);
    } else if (respString[0] === ":") {
      return parseInt(respString.slice(1, respString.length - 2), 10);
    } else if (respString[0] === "*") {
      let result = [];
      const elems = respString.split(/\r\n/).slice(0, -1);
      const length = parseInt(elems[0].slice(1), 10);

      elems.shift();

      while(elems.length) {
        let elem = elems.shift();

        if (elem.slice(0, 2) === "$-") {
          result.push(null);
        } else if (elem[0] === ":") {
          result.push(parseInt(elem.slice(1), 10));
        } else {
          result.push(elems.shift());
        }
      }
      return result;
    }
  }
}

export default Decoder;
