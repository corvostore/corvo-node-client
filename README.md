# Summary

Corvo client is a Node.js client library intended to be used with CorvoStore.

# Installation

### Installing the NPM module with the Command Line

Install the module with the following command:

`$ npm install corvo-node-client`

Then, navigate to the following directory:

`cd ~/node_modules/corvo-node-client`

And then make sure to execute the following command:

`$ npm install`

# Usage Example

```javascript
require('./node_modules/corvo-node-client');

const client = new CorvoNodeClient();

client.hmset("key1", "field1", "value1", "field2", "value2").then((response) => {
  console.log(response);
});
client.hgetall("key1").then((response) => {
  console.log(response);
});
client.hlen("key1").then((response) => {
  console.log(response);
});
client.hsetnx("key1", "field2", "updated-value").then((response) => {
  console.log(response);
  client.destroyClient();
});

```

Running the code above in a file, as in the following, will display:

```
$ node example.js

OK
[ 'field1', 'value1', 'field2', 'value2' ]
2
0
```

This API is asynchronous, and uses promises to retrieve data from the server. Each CorvoStore command is available as a method on the `client` object. Every method takes a list of individual arguments matching the possible number of arguments for that command. The methods each return a JS Promise that resolves to the value returned by the server. The return value itself can be accessed inside the `.then` callback after invoking the method, as shown in the usage example above.

# Supported Commands

Corvo client supports the following commands for each data type:

#### String

* `get`
* `set`
* `append`
* `strlen`
* `incr`
* `decr`

#### List

* `lpush`
* `rpush`
* `lindex`
* `lrem`
* `llen`
* `linsert`
* `lpop`
* `rpop`
* `lset`

#### Hash

* `hkeys`
* `hvals`
* `hstrlen`
* `hmset`
* `hdel`
* `hget`
* `hgetall`
* `hlen`
* `hsetnx`
* `hmget`
* `hincrby`
* `hset`

#### Set

* `sadd`
* `scard`
* `sismember`
* `spop`
* `srem`
* `smembers`
* `sunion`
* `sinter`
* `sdiff`
* `sunionstore`
* `sinterstore`
* `sdiffstore`

#### Sorted Set  

* `zincrby`
* `zadd`
* `zscore`
* `zrem`
* `zcard`
* `zinterstore`
* `zunionstore`

It also supports the following commands for CorvoStore keys in general:

* `del`
* `touch`
* `exists`
* `rename`
* `renamenx`
* `type`

These commands are intended to function the same way as the Redis commands that correspond to them. Please see the [Redis command reference](http://www.redis.io/commands) for full details on how each command operates.
