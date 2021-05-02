# Redis Benchmarks

Designed to simulate highly parallel situations (express) with varying data sizes.

## Environment
```
  Node: 12.9.0

  Model Name:	MacBook Pro
  Processor Name:	6-Core Intel Core i7
  Processor Speed:	2.6 GHz
  Number of Processors:	1
  Total Number of Cores:	6
  L2 Cache (per Core):	256 KB
  L3 Cache:	12 MB
  Hyper-Threading Technology:	Enabled
  Memory:	16 GB
```

## Results
```
redis x 597 ops/sec ±1.07% (253 runs sampled)
ioredis x 584 ops/sec ±1.23% (253 runs sampled)
ioredis pipeline x 684 ops/sec ±1.49% (252 runs sampled)
ioredis generic pool x 694 ops/sec ±1.17% (253 runs sampled)
redis generic pool x 684 ops/sec ±1.41% (253 runs sampled)
Fastest is ioredis generic pool,redis generic pool,ioredis pipeline
```