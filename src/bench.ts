import { add, complete, cycle, save, suite } from "benny";
import { Options } from "benny/lib/internal/common-types";
import * as benchIoredis from "./benchIoredis";
import * as benchIoredisPipeline from "./benchIoredisPipeline";
import * as benchRedis from "./benchRedis";
import { init } from "./init";

const options: Options = {
  maxTime: 1,
};

(async (): Promise<void> => {
  console.log("Init");
  await init();
  console.log("Init complete");

  suite(
    "Redis",

    add(
      "redis",
      async () => {
        // setup
        await benchRedis.init();

        return async () => {
          // Run
          await benchRedis.bench();
        };
      },
      options
    ),

    add(
      "ioredis",
      async () => {
        // setup
        await benchIoredis.init();

        return async () => {
          // Run
          await benchIoredis.bench();
        };
      },
      options
    ),

    add(
      "ioredis pipeline",
      async () => {
        // setup
        await benchIoredisPipeline.init();

        return async () => {
          // Run
          await benchIoredisPipeline.bench();
        };
      },
      options
    ),

    complete(async () => {
      await benchRedis.dispose();
      await benchIoredis.dispose();
      await benchIoredisPipeline.dispose();
    })
  );
})();
