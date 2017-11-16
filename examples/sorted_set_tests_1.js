import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

// test zadd
client.zadd("key1", "20", "v", "30", "v2").then((response) => {
  console.log(response === 2);
}).then(() => {

  // test zrem
  return client.zrem("key1", "v");

}).then((response) => {
  console.log(response === 1);
}).then(() => {

  // test zcard
  return client.zcard("key1");
}).then((response) => {
  console.log(response === 1);
  client.destroyClient();
});
