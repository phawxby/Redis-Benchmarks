import Benchmark from "benchmark";
import * as benchIoredis from "./benchIoredis";
import * as benchIoredisGenericPool from "./benchIoredisGenericPool";
import * as benchIoredisPipeline from "./benchIoredisPipeline";
import * as benchRedisGenericPool from "./benchRedisGenericPool";
import * as benchRedis from "./benchRedis";
import { init } from "./init";

var suite = new Benchmark.Suite();

(async (): Promise<void> => {
  try {
    console.log("Init data");
    await init();
    console.log("Init complete");

    await new Promise((resolve, reject) => {
      // add tests
      suite
        .add("redis", {
          defer: true,
          setup: () => {
            benchRedis.init();
          },
          fn: async (deferred: any) => {
            benchRedis.bench().finally(() => deferred.resolve());
          },
          teardown: () => {
            benchRedis.dispose();
          },
        })
        .add("ioredis", {
          defer: true,
          setup: () => {
            benchIoredis.init();
          },
          fn: async (deferred: any) => {
            benchIoredis.bench().finally(() => deferred.resolve());
          },
          teardown: () => {
            benchIoredis.dispose();
          },
        })
        .add("ioredis pipeline", {
          defer: true,
          setup: () => {
            benchIoredisPipeline.init();
          },
          fn: async (deferred: any) => {
            benchIoredisPipeline.bench().finally(() => deferred.resolve());
          },
          teardown: () => {
            benchIoredisPipeline.dispose();
          },
        })
        .add("ioredis generic pool", {
          defer: true,
          setup: () => {
            benchIoredisGenericPool.init();
          },
          fn: async (deferred: any) => {
            benchIoredisGenericPool.bench().finally(() => deferred.resolve());
          },
          teardown: () => {
            benchIoredisGenericPool.dispose();
          },
        })
        .add("redis generic pool", {
          defer: true,
          setup: () => {
            benchRedisGenericPool.init();
          },
          fn: async (deferred: any) => {
            benchRedisGenericPool.bench().finally(() => deferred.resolve());
          },
          teardown: () => {
            benchRedisGenericPool.dispose();
          },
        })
        // add listeners
        .on("cycle", function (event: any) {
          console.log(String(event.target));
        })
        .on("complete", function () {
          console.log("Fastest is " + suite.filter("fastest").map("name"));

          resolve(true);
        })
        // run async
        .run({ async: true });
    });

    console.log("Finished");
  } catch (err) {
    console.error(err);
  }
})();
