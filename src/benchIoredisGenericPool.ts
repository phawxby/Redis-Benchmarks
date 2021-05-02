import Redis from "ioredis";
import { getRandomKey, redisIp, redisPort } from "./static";
import genericPool from "generic-pool";

let pool: genericPool.Pool<Redis.Redis>;

export function init() {
  const factory: genericPool.Factory<Redis.Redis> = {
    create: async () => {
      return new Redis({ host: redisIp, port: redisPort });
    },
    destroy: async (client: Redis.Redis) => {
      client.disconnect();
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
  })
}

async function getRandom() {
  let client: Redis.Redis | undefined;

  try {
    client = await pool.acquire();
    await client.get(getRandomKey());
  } finally {
    if (client) {
      pool.release(client);
    }
  }
}