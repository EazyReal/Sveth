<script lang="ts">
  import { Fragment, Interface } from "@ethersproject/abi"
  import { Contract } from "ethers"
  import { IStore } from ".."
  import ContractInput from "./ContractInput.svelte"

  export let contract: Contract
  export let fragment: Fragment
  export let store: IStore
  type Dict<T> = {
    [key: string]: T
  }

  const { connect, connected, provider, signer } = store

  // maybe should handle "on connected" and "on disconnected"
  let params: Dict<any> = {}

  const handleSubmit = () => {
    if ($connected && $signer) {
      contract.connect($signer)
    } else {
      connect()
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#each fragment.inputs as input}
    <ContractInput {input} val={params[input.name]} />
  {/each}
  <button> Submit </button>
</form>
