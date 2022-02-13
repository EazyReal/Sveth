<script lang="ts">
  import { Fragment, Interface } from "@ethersproject/abi"
  import { Contract } from "ethers"
  import { IStore } from ".."
  import ContractFragment from "./ContractFragment.svelte"

  export let abi
  export let address: string
  export let store: IStore
  let iface: Interface = new Interface(abi)
  let { connect, provider } = store
  let contract: Contract = new Contract(address, abi, $provider)
</script>

<div>
  <h3>Contract {address}</h3>
  {#each iface.fragments.filter((fragment) => fragment.type === "function") as fragment}
    <ContractFragment {fragment} {contract} {store} />
  {/each}
</div>
