import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

// test set
client.set("key1", "value1").then((response) => {
  console.log(response === "OK");
}).then(() => {

  // test get
  return client.get("key1");

}).then((response) => {
  console.log(response === "value1");
}).then(() => {

  // test append
  return client.append("key1", "a");

}).then((response) => {
  console.log(response === 7);
}).then(() => {

  // test strlen
  return client.strlen("key1");

}).then((response) => {
  console.log(response === 7);
}).then(() => {

  // test touch
  return client.touch("key1");

}).then((response) => {
  console.log(response === 1);
}).then(() => {

  return client.set("key2", "1");

}).then((response) => {
  console.log(response === "OK");
}).then(() => {

  // test incr
  return client.incr("key2");

}).then((response) => {
  console.log(response === 2);
}).then(() => {

  // test decr
  return client.decr("key2");

}).then((response) => {
  console.log(response === 1);
}).then(() => {

  // test exists
  return client.exists("key2");

}).then((response) => {
  console.log(response === 1);

}).then(() => {
  // test rename
  return client.rename("key2", "keytwo")
}).then((response) => {
  // test response
  console.log(response === "OK");
}).then(() => {
  // test renamenx
  return client.renamenx("key1", "keyone")
}).then((response) => {
  // test response
  console.log(response === 1);
}).then(() => {
  // test type
  return client.type("keyone")
}).then((response) => {
  // test response
  console.log(response === "string");
  client.destroyClient();
});
