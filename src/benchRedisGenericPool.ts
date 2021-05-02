import Redis from "redis";
import { getRandomKey, redisIp, redisPort } from "./static";
import genericPool from "generic-pool";

let pool: genericPool.Pool<Redis.RedisClient>;

export function init() {
  const factory: genericPool.Factory<Redis.RedisClient> = {
    create: async () => {
      return Redis.createClient({
        host: redisIp,
        port: redisPort,
      });
    },
    destroy: async (client: Redis.RedisClient) => {
      client.end(true);
    },
  };

  const opts: genericPool.Options = {
    max: 10,
    min: 2,
  };

  pool = genericPool.createPool(factory, opts);
}

export async function bench() {
  getRandom();
  getRandom();
  getRandom();
  getRandom();
  getRandom();

  await getRandom();
}

export function dispose() {
  pool.drain().then(() => {
    pool.clear();
  });
}


async function getRandom() {
  let client: Redis.RedisClient | undefined;

  try {
    client = await pool.acquire();

    return await new Promise((resolve, reject) => {
      if (!client) {
        reject("No client!");
      } else {
        client.get(getRandomKey(), (error, val) => {
          if (error) {
            reject(error);
          } else {
            resolve(val);
          }
        });
      }
    });
  } finally {
    if (client) {
      pool.release(client);
    }
  }
}