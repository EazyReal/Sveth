<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import { ethers, Contract } from "ethers"
  import { Interface } from "@ethersproject/abi"
  import { onMount } from "svelte"
  // sveth
  import { IStore, sProvider } from "sveth"
  import ContractCard from "sveth/src/components/ContractCard.svelte"
  // local
  import USDCABI from "../abis/USDC.json"
  import store from "../stores/eth"

  onMount(async () => {
    connect()
  })

  let {
    connect,
    connected,
    provider,
    signer,
    chainId,
    account,
    getBalanceStore,
  } = store as IStore

  const USDCaddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
  let contractChainId = 5

  let balance: ethers.BigNumber = undefined
  let chainName: string = undefined
  let balanceStore = getBalanceStore(USDCaddress)
  $: {
    // this show how to use with ethers
    if ($signer) $signer.getBalance().then((res) => (balance = res))
  }
  $: {
    if ($provider) $provider.getNetwork().then((res) => (chainName = res.name))
  }
  let contract = new Contract(USDCaddress, USDCABI)
  let props = {
    contract,
    store,
    contractChainId,
  }
</script>

<svelte:head>
  <title>Eth Hooks and Contract Components</title>
</svelte:head>

<h1>Eth Hooks and Contract Components</h1>

<button on:click={() => connect(contractChainId)}>
  Connect Wallet (chainId5)
</button>
<p>connected: {$connected}</p>
{#if $connected}
  <p>chainId: {$chainId}</p>
  <p>chainName: {chainName}</p>
  <p>Account: {$account}</p>
  <p>Balance: {balance}</p>
  <p>Balance Hook: {$balanceStore}</p>
{/if}
<ContractCard {...props} />

<style>
</style>
