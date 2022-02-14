<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import { ethers, Contract } from "ethers"
  import { Interface } from "@ethersproject/abi"
  import { onMount } from "svelte"
  // sveth
  import { IStore } from "sveth"
  import ContractCard from "sveth/src/components/ContractCard.svelte"
  // local
  import USDC from "../abis/USDC.json"
  import AcaPunksABI from "../abis/AcaPunks.json"
  import store from "../stores/eth"

  onMount(async () => {
    connect()
  })

  let { connect, connected, provider, signer, chainId, account, getBalance } =
    store as IStore

  let balance: ethers.BigNumber = undefined
  let balanceStore = getBalance("0x351821Ed49F23f884D6B168247Ec36D7732D8BD3")
  $: {
    if ($signer) $signer.getBalance().then((res) => (balance = res))
  }
  let contract = new Contract(
    "0x351821Ed49F23f884D6B168247Ec36D7732D8BD3",
    new Interface(AcaPunksABI)
  )
  let props = {
    contract,
    store,
  }
</script>

<svelte:head>
  <title>Defi</title>
</svelte:head>

<h1>Defi</h1>

<button on:click={() => connect()}> Connect Wallet </button>
<p>connected: {$connected}</p>
{#if $connected}
  <p>chainId: {$chainId}</p>
  <p>Account: {$account}</p>
  <p>Balance: {balance}</p>
  <p>Balance Hook: {$balanceStore}</p>
{/if}
<ContractCard {...props} />

<style>
</style>
