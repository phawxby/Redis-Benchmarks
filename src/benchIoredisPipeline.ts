import Redis from "ioredis";
import { getRandomKey, redisIp, redisPort } from "./static";
import Benchmark from "benchmark";

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

export const options: Benchmark.Options = {
  defer: true,
  minSamples: 200,
  setup: () => {
    init();
  },
  fn: async (deferred: any) => {
    bench().finally(() => deferred.resolve());
  },
  teardown: () => {
    dispose();
  },
};
