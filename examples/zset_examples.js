import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

console.log("Application started");

// add data
client.zadd("key1", "10", "aa", "20", "bb", "25", "cc").then((response) => {
  console.log(response === 2);
}).then(() => {

  // add data
  return client.zadd("key2", "222", "bb", "30", "cc", "40", "dd");

}).then((response) => {
  console.log(response === 2);
}).then(() => {

  // test zinterstore
  return client.zinterstore("key3", "2", "key1", "key2");

}).then((response) => {
  console.log(response === 5);
}).then(() => {

  // test zunionstore
  return client.zunionstore("key3", "2", "key1", "key2");

}).then((response) => {
  console.log(response === 5);
  console.log("Application ended");
  client.destroyClient();
});
