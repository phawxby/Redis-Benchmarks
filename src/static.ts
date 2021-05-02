import { randomBytes } from "crypto";

export const redisIp = "127.0.0.1";
export const redisPort = 6379;

// 5kB
const smallKeySize = 5000;
const smallKeyCount = 5000;
const smallKeys = Array.from(Array(smallKeyCount).keys()).map(
  (x) => `key-small-${x}`
);

// 25kB
const mediumKeySize = 25000;
const mediumKeyCount = 500;
const mediumKeys = Array.from(Array(mediumKeyCount).keys()).map(
  (x) => `key-medium-${x}`
);

// 250kB
const largeKeySize = 250000;
const largeKeyCount = 25;
const largeKeys = Array.from(Array(largeKeyCount).keys()).map(
  (x) => `key-large-${x}`
);

// All possible keys
export const allKeys = smallKeys.concat(mediumKeys).concat(largeKeys);

export function getRandomKey() {
  return allKeys[Math.floor(Math.random() * allKeys.length)];
}

export function dataForKey(key: string): string {
  if (key.includes("small")) {
    return getStringOfByteLength(smallKeySize);
  } else if (key.includes("medium")) {
    return getStringOfByteLength(mediumKeySize);
  } else if (key.includes("large")) {
    return getStringOfByteLength(largeKeySize);
  } else {
    throw new Error(`Unknown key type: ${key}`);
  }
}

export function getStringOfByteLength(size: number): string {
  let str: string = "";
  while (Buffer.byteLength(str) < size) {
    str += randomBytes(3).toString("utf8");
  }

  return str;
}
