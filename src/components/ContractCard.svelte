<script lang="ts">
  import { ethers } from "ethers"
  import { Interface, Fragment, FunctionFragment } from "@ethersproject/abi"
  import { Contract } from "ethers"
  // internal
  import { IStore } from ".."
  import ContractFragment from "./ContractFragment.svelte"
  import { isReadFunction, isWriteFunction } from "./utils"

  export let contract: Contract
  export let store: IStore
  let iface: Interface = contract.interface
  let readFunctons = iface.fragments.filter(isReadFunction)
  let writeFunctions = iface.fragments.filter(isWriteFunction)
</script>

<div>
  <h3>Contract {contract.address}</h3>
  <h4>Read Functions</h4>
  {#each readFunctons as fragment}
    <ContractFragment {fragment} {contract} {store} />
  {/each}
  <h4>Write Functions</h4>
  {#each writeFunctions as fragment}
    <ContractFragment {fragment} {contract} {store} />
  {/each}
</div>
