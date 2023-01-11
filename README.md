# Perf benchmark for SSR Next.js/React

## Summary

React 18 + Next.js performs worse than React 17 + Next.js. This is across Next.js 12 and 13. This is not the case with raw React renderToString(), React 18 has better performance in comparison to React 17 when Next.js is omitted - Separate React specific benchmarks here: https://github.com/SuperOleg39/react-ssr-perf-test

Stats summary:

| Stat                                           | Next.js 12 / React 17 | Next.js 12 / React 18 | Next.js 13 / React 18 |
| ---------------------------------------------- | --------------------- | --------------------- | --------------------- |
| Average Requests Per Second (higher is better) | 22.8                  | 18.3 (-19.7%)         | 17 (-25.4%)           |
| Average Latency (lower is better)              | 2436.85 ms            | 3303.44 ms (-35.5%)   | 3171.23 ms (-27.3%)   |

## Reproduction

### Environment

The following test results are obtained from a 2.3GHz Quad-Core Intel MacBook Pro running Node.js 16. Similar results have also been reproduced in other environments (eg Azure Linux).

### Install

Navigate to the relevant project you want to performance test eg `cd nextjs-12-react-17` and run `npm install`

### Run performance test

1. Run the Next.js application `npm run build && npm start`
2. Run perf test `npx autocannon -c 50 -d 10 http://localhost:3000/ --renderStatusCodes --excludeErrorStats` - you can also run it multiple times if you are concerned about Node not being warm (JIT optimizations).

### Results:

#### nextjs-12-react-17

```
Running 10s test @ http://localhost:3000/
50 connections


┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 228 ms │ 2744 ms │ 3241 ms │ 3305 ms │ 2436.85 ms │ 924.25 ms │ 3355 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 1      │ 1      │ 18      │ 64      │ 17.8    │ 17.19   │ 1      │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 263 kB │ 263 kB │ 4.73 MB │ 16.8 MB │ 4.68 MB │ 4.51 MB │ 263 kB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴─────────┴────────┘
┌──────┬───────┐
│ Code │ Count │
├──────┼───────┤
│ 200  │ 178   │
└──────┴───────┘

Req/Bytes counts sampled once per second.
# of samples: 10

228 requests in 10.02s, 46.8 MB read
```

#### nextjs-12-react-18

```
Running 10s test @ http://localhost:3000/
50 connections


┌─────────┬─────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼─────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 1437 ms │ 3050 ms │ 5219 ms │ 5219 ms │ 3303.44 ms │ 1113.5 ms │ 7284 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬────────┬─────────┬────────┬─────────┬────────┐
│ Stat      │ 1%  │ 2.5% │ 50%    │ 97.5%   │ Avg    │ Stdev   │ Min    │
├───────────┼─────┼──────┼────────┼─────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 0   │ 0    │ 3      │ 39      │ 13.3   │ 13.39   │ 1      │
├───────────┼─────┼──────┼────────┼─────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 788 kB │ 10.3 MB │ 3.5 MB │ 3.52 MB │ 263 kB │
└───────────┴─────┴──────┴────────┴─────────┴────────┴─────────┴────────┘
┌──────┬───────┐
│ Code │ Count │
├──────┼───────┤
│ 200  │ 133   │
└──────┴───────┘

Req/Bytes counts sampled once per second.
# of samples: 10

183 requests in 10.04s, 35 MB read
```

#### nextjs-13-react-18

```
Running 10s test @ http://localhost:3000/
50 connections


┌─────────┬─────────┬─────────┬─────────┬─────────┬────────────┬─────────┬─────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev   │ Max     │
├─────────┼─────────┼─────────┼─────────┼─────────┼────────────┼─────────┼─────────┤
│ Latency │ 1042 ms │ 3348 ms │ 4865 ms │ 5200 ms │ 3171.23 ms │ 1089 ms │ 6489 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴────────────┴─────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼─────┼──────┼─────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 0   │ 0    │ 9       │ 27     │ 12      │ 10.18   │ 2      │
├───────────┼─────┼──────┼─────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 2.37 MB │ 7.1 MB │ 3.15 MB │ 2.68 MB │ 526 kB │
└───────────┴─────┴──────┴─────────┴────────┴─────────┴─────────┴────────┘
┌──────┬───────┐
│ Code │ Count │
├──────┼───────┤
│ 200  │ 120   │
└──────┴───────┘

Req/Bytes counts sampled once per second.
# of samples: 10

170 requests in 10.03s, 31.5 MB read
```
