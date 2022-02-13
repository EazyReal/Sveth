<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import  { connect, connected, provider, signer, chainId, account  } from '../stores/eth';
    import { onMount } from 'svelte'
    import { ethers } from 'ethers'
    let balance: ethers.BigNumber
    $: {
        if($signer) $signer.getBalance().then((res)=>balance = res)
    }
</script>

<svelte:head>
	<title>Defi</title>
</svelte:head>

<style>
</style>

<h1> Defi </h1>
<button on:click={() => connect()}> Connect Wallet </button>
<p> connected: {$connected }</p>
{#if $connected}
    <p> chainId: {$chainId} </p>
    <p> Account: {$account} </p>
    <p> Balance: {balance} </p>
{/if}

