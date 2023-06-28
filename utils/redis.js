import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    // this.client.on('ready', () => {
    //   console.log('connected to redis');
    // });
    this.client.on('error', (err) => {
      console.log('Error connecting to redis', err);
    });
    this.sets = promisify(this.client.set).bind(this.client);
    this.gets = promisify(this.client.get).bind(this.client);
    this.dels = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.gets(key);
    return value;
  }

  async set(key, value, time) {
    await this.sets(key, value, 'EX', time);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
