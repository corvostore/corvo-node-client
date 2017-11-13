import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

console.log("Application started");

// test hmset
client.hmset("key1", "field1", "value1", "field2", "10").then((response) => {
  console.log(response === "OK");
}).then(() => {

  // test hincrby on field that contains non-numeric string
  return client.hincrby("key1", "field1", "10");

}).then((response) => {
  console.log(response === "StoreError: value at key is not a number string.");
}).then(() => {

  // test hincrby on field that contains numeric string
  return client.hincrby("key1", "field2", "5");

}).then((response) => {
  console.log(response === 15);
}).then(() => {

  // test hincrby on a non-existent key
  return client.hkeys("no-such-key");

}).then((response) => {
  console.log(_.isEqual(response, []));
}).then(() => {

  // test hincrby on a existing key
  return client.hkeys("key1");

}).then((response) => {
  console.log(_.isEqual(response, ["field1", "field2", "field3"]));
  console.log("Application ended");
  client.destroyClient();
});
