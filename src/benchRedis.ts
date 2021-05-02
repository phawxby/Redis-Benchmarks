import Redis from "redis";
import { getRandomKey, redisIp, redisPort } from "./static";
import { promisify } from "util";
import Benchmark from "benchmark";

let client: Redis.RedisClient;
let get: (arg1: string) => Promise<string | null>;

export function init() {
  client = Redis.createClient({
    host: redisIp,
    port: redisPort,
  });
  get = promisify(client.get).bind(client);
}

export async function bench() {
  get(getRandomKey());
  get(getRandomKey());
  get(getRandomKey());
  get(getRandomKey());
  get(getRandomKey());

  await get(getRandomKey());
}

export function dispose() {
  if (client) {
    client.end(true);
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
