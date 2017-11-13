import CorvoNodeClient from '../corvo_node_client';
import _ from 'underscore';

const client = new CorvoNodeClient();

console.log("Peter Test started!");

client.set("key1", "myVal").then(() => {
  // test del
  return client.del("key1");
}).then((response) => {
  console.log(response === 1);
}).then(() => {
  // test lpush
  return client.lpush("someK", "someV");
}).then((response) => {
  console.log(response === 1);
}).then(() => {
  // test rpush
  return client.rpush("someK", "anotherV");
}).then((response) => {
  console.log(response === 2);
}).then(() => {
  // test lpop
  return client.rpop("someK");
}).then((response) => {
  console.log(response === "anotherV");
}).then(() => {
  return client.lpop("someK");
}).then((response) => {
  console.log(response === "someV");
}).then(() => {
  return client.lpush("someK", "a", "b", "c");
}).then((response) => {
  console.log(response === 3);
}).then(() => {
  return client.llen("someK");
}).then((response) => {
  console.log(response === 3);
}).then(() => {
  return client.linsert("someK", "BEFORE", "b", "z");
}).then((response) => {
  console.log(response === 4);
}).then(() => {
  return client.lindex("someK", '0');
}).then((response) => {
  console.log(response === 'c');
}).then(() => {
  return client.lset("someK", '0', "BLAH");
}).then((response) => {
  console.log(response === "OK");
}).then(() => {
  return client.lrem("someK", '0', "BLAH");
}).then((response) => {
  console.log(response === 1);
});
