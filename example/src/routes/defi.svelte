<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import { store } from "../stores/eth"
  import { Contract } from "ethers"
  import { onMount } from "svelte"
  import { ethers } from "ethers"
  // sveth
  import { IStore } from "sveth"
  import ContractCard from "sveth/src/components/ContractCard.svelte"
  import { default as USDC } from "../abis/USDC.json"

  let { connect, connected, provider, signer, chainId, account, getBalance } =
    store as IStore

  let balance: ethers.BigNumber = undefined
  let balanceStore = getBalance()
  $: {
    if ($signer) $signer.getBalance().then((res) => (balance = res))
  }
  let contract = new Contract(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    USDC
  )
  let props = {
    abi: USDC,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    store: store as IStore,
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
