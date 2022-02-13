# Sveth

## Doc
- `useEth` hook returns relevant `store`s and `derived store`s
  - `connect: async (chainId?: number) => void` connect to metamask, with desired side effects (connected = true, provider = injected....)
  - `connected: Writable<Bool>` whether Metamask is connected 
  - `provider: Writable<sProvider = ethers.providers.JrpcProvider | ethers.providers.Web3Provider>` and the `derived store`s
    - `account: Readable<string>`
    - `signer: Readable<ethers.Signer>`
    - ...

## Usage
```ts
import { useEth } from '../sveth/useEth'
export const { connect, connected, provider, signer, chainId, account } = useEth()
```
- `$store` to get value from `store`s

## Todo
- wrap the `Writable`s
- support `contract` and `balance`
- support `ethers.providers.JrpcProvider` by `connectProvider(provider)`
- create canonical components for contracts (`<Contract {address, abi}>`)
- build typescript to javascipt as npm package