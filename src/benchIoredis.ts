import Redis from "ioredis";
import { getRandomKey, redisIp, redisPort } from "./static";

let client: Redis.Redis;

export function init() {
  client = new Redis({ host: redisIp, port: redisPort });
}

export async function bench() {
  client.get(getRandomKey());
  client.get(getRandomKey());
  client.get(getRandomKey());
  client.get(getRandomKey());
  client.get(getRandomKey());

  await client.get(getRandomKey());
}

export function dispose() {
  if (client) {
    client.disconnect();
  }
}
