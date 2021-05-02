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
        .add("redis", benchRedis.options)
        .add("ioredis", benchIoredis.options)
        .add("ioredis pipeline", benchIoredisPipeline.options)
        .add("ioredis generic pool", benchIoredisGenericPool.options)
        .add("redis generic pool", benchRedisGenericPool.options)
        // add listeners
        .on("cycle", function (event: any) {
          console.log(String(event.target));
        })
        .on("complete", function () {
          console.log("Fastest is " + suite.filter("fastest").map("name"));

          resolve(true);
        })
        // run async
        .run({ async: true, minSamples: 200 });
    });

    console.log("Finished");
  } catch (err) {
    console.error(err);
  }
})();
