# Sveth
Eth Hook for Svelte

## Documentaion

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
let contractChainId = 5
```
```svelte
 <ContractCard {contract} {store} {contractChainId} />
```
#### The `example/` folder 
- For more, see `example/`

## Patch Notes (0.0.7)

### New Feature
- some previous minor versions are used for testing CICD
- improve `<Contract {contract} {store} {chainId}>` by prompting users to switch chain when chain is not matched
- refactor `src/components/utils.ts` `isFunction` by not using `instance of` which is not ideal according to [the discussion in ethers](https://github.com/ethers-io/ethers.js/discussions/2702)

### Todo
- improve `balance` hooks and others by listening to blocks/events/txs
  - add dependency to `newblock` store may be a good ideas
  - add `contractChainId`s to other related stores like `balance`
- improve `<Contract {contract} {store}>`
  - parse input/output (BigNumber...)
  - CSS styling support 
- `const {reactive_contract} = useContract(address, abi, $signer)`
- build ts to js before publishing

### Note
- the package is a side project of mine, which I will put less effort from now on, feel free to contribute
- You can only use this package with typescript for now
