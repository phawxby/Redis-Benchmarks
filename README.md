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
redis x 954 ops/sec ±3.28% (62 runs sampled)
ioredis x 942 ops/sec ±3.43% (57 runs sampled)
ioredis pipeline x 804 ops/sec ±3.08% (61 runs sampled)
ioredis generic pool x 840 ops/sec ±3.77% (66 runs sampled)
redis generic pool x 921 ops/sec ±2.20% (58 runs sampled)
Fastest is redis,ioredis
```