# Sveth
Eth Hook for Svelte

## Doc

### Types
- `useEth` hook returns relevant `store`s and `derived store`s
  - `connect: async (chainId?: number) => void` connect to metamask, with desired side effects (connected = true, provider = injected....)
  - `connected: Writable<Bool>` whether Metamask is connected 
  - `provider: Writable<sProvider = ethers.providers.JrpcProvider | ethers.providers.Web3Provider>` and the `derived store`s
    - `account: Readable<string>`
    - `signer: Readable<ethers.Signer>`
    - ...

### Example Usage

#### `useEth` Hook
```ts
import { useEth, IStore } from 'sveth'
export default const stores: IStore = useEth()
export const {provider, signer, address, chainId, getBalanceStore...} = stores
const balanceStore = getBalanceStore("0xabc123")
```
```svelte
<button on:click={() => connect()}> Connect Wallet </button>
<p>connected: {$connected}</p>
{#if $connected}
  <p>chainId: {$chainId}</p>
  <p>Account: {$account}</p>
  <p>Balance: {balance}</p>
  <p>Balance Hook: {$balanceStore}</p>
{/if}
```
- `$store` to get value from `store`s


#### `<ContractCard/>` Component
```ts
import ContractCard from "sveth/src/components/ContractCard.svelte"
import { Contract } from "ethers"
import { Interface } from "@ethersproject/abi"
import ERC20ABI from "../abis/ERC20.json"
import store from "../stores/eth"
let contract = new Contract("0xabc123...", new Interface(ERC20ABI))
```
```svelte
 <ContractCard {contract} {store} />
```
- see `example/` for more 
- passing `ERC20ABI` can lead to error (see https://github.com/ethers-io/ethers.js/issues/2688)

Note: 
You can only use this package with typescript for now

## Patch Notes (0.0.3)

### New Feature
- support `balanceStore: Readable<ethers.BigNumber> = getBalance(address?: string)`
- (0.0.2) canonical components for contracts (`<Contract {contract} {store}>`)
- refactor `IStore` by not using `ReturnType<typeof useEth>` 

### Todo
- improve `balance` hooks by listening to blocks/events/txs
- improve `<Contract {contract} {store}>`
  - parse input/output (BigNumber...)
  - CSS styling support 
  - prompt users to change `chainId` if not matched!
- `const {reactive_contract} = useContract(address, abi, $signer)`

### Note
- the package is a side project of mine, which I will put less effort from now on, feel free to contribute
