# Metaxy Token Contract

Try running some of the following tasks:

```shell
npx hardhat clean
npx hardhat compile
npx hardhat deploy_testnet --network bsc_testnet
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
