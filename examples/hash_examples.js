import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

console.log("Application started");

// test hset
client.hset("key1", "field1", "value1").then((response) => {
  console.log(response === 1);
}).then(() => {

  // test hvals
  return client.hvals("key1");

}).then((response) => {
  console.log(_.isEqual(response, ["value1"]));
}).then(() => {

  // test hstrlen
  return client.hstrlen("key1", "field1");

}).then((response) => {
  console.log(_.isEqual(response, 6));
}).then(() => {

  // test hmset
  return client.hmset("key1", "field2", "value2", "field-longer3", "value-longer3");

}).then((response) => {
  console.log(response === "OK");
}).then(() => {

  // test hmget
  return client.hmget("key1", "field1", "no-such-field", "field2", "field-longer3");

}).then((response) => {
  console.log(_.isEqual(response, ["value1", null, "value2", "value-longer3"]));
}).then(() => {

  // test hdel, arguments are non-existent fields
  return client.hdel("key1", "no-such-field-1");

}).then((response) => {
  console.log("hdel : ", response);
  console.log(response === 0);
}).then(() => {

  // test hdel, arguments are mix of existing and non-existent fields
  return client.hdel("key1", "field1", "no-such-field-2", "field2");

}).then((response) => {
  console.log("hdel : ", response);
  console.log(response === 2);
}).then(() => {

  // test hget, for a non-existent key
  return client.hget("key5", "field1");

}).then((response) => {
  console.log(response === null);
}).then(() => {

  // test hget, for a non-existent field
  return client.hget("key1", "no-such-field-1");

}).then((response) => {
  console.log(response === null);
}).then(() => {

  // test hget, for a field with string value
  return client.hget("key1", "field2");

}).then((response) => {
  console.log(response === "value2");








  console.log("Application ended");
  client.destroyClient();
});
