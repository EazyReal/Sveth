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
import { useEth } from 'sveth'
export const { connect, connected, provider, signer, chainId, account } = useEth()
```

Note: \
You can only use this package with typescript for now

## Todo
- support `balance: Readable<ethers.BigNumber> = getBalance(address?: string)`
  - this need internal ERC20 abi
- improve `ethers.providers.JrpcProvider` connection
  -  by `connectProvider(provider)` to `connect(provider)` (but this will make `connect(chainId)` weird)
- create canonical components for contracts (`<Contract {address, abi}>`)
  - working on it, parsing...