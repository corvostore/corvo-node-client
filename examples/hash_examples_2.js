import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

console.log("Application started");

// test hset
client.hmset("key1", "field1", "value1", "field2", "value2").then((response) => {
  console.log(response === "OK");
}).then(() => {

  // test hgetall
  return client.hgetall("key1");

}).then((response) => {
  console.log(_.isEqual(response, ["field1", "value1", "field2", "value2"]));
}).then(() => {

  // test hlen
  return client.hlen("key1");

}).then((response) => {
  console.log(response === 2);
}).then(() => {

  // test hsetnx for an existing field
  return client.hsetnx("key1", "field2", "updated-value");

}).then((response) => {
  console.log(response === 0);
}).then(() => {

  // verify hsetnx did not update the field
  return client.hgetall("key1");

}).then((response) => {
  console.log(_.isEqual(response, ["field1", "value1", "field2", "value2"]));
}).then(() => {

  // test hsetnx for an existing field
  return client.hsetnx("key1", "field3", "new-value");

}).then((response) => {
  console.log(response === 1);
}).then(() => {

  // verify hsetnx did created the field
  return client.hgetall("key1");

}).then((response) => {
  const expectedArr = ["field1", "value1", "field2", "value2", "field3", "new-value"];
  console.log(_.isEqual(response, expectedArr));
}).then(() => {

  // test hmget with a mix of existing and non-existent fields
  return client.hmget("key1", "field1", "no-such-field", "field2");

}).then((response) => {
  console.log(_.isEqual(response, ["value1", null, "value2"]));
}).then(() => {

  // test hmget for a non-exsting key
  return client.hmget("no-such-key", "field1", "no-such-field", "field2");

}).then((response) => {
  console.log(_.isEqual(response, [null, null, null]));
  console.log("Application ended");
  client.destroyClient();
});
