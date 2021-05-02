import Redis from "redis";
import { allKeys, dataForKey, redisIp, redisPort } from "./static";
import { promisify } from "util";

const client = Redis.createClient({
  host: redisIp,
  port: redisPort,
});

const setex = promisify(client.setex).bind(client);
const dbsize = promisify(client.dbsize).bind(client);

export async function init() {
  for (const key of allKeys) {
    await setex(key, 86400, dataForKey(key));
  }

  console.log(`dbsize: ${await dbsize()}`);

  client.end(true);
}
