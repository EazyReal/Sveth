<script lang="ts">
  import { Interface } from "@ethersproject/abi"
  import { Contract } from "ethers"
  // internal
  import { IStore } from ".."
  import ContractFragment from "./ContractFragment.svelte"
  import { isReadFunction, isWriteFunction } from "./utils"

  export let contract: Contract
  export let store: IStore
  export let contractChainId: number
  let iface: Interface = contract.interface
  let readFunctons = iface.fragments.filter(isReadFunction)
  let writeFunctions = iface.fragments.filter(isWriteFunction)
  let props = {
    contract,
    store,
    contractChainId,
  }
</script>

<div>
  <h3>Contract {contract.address}</h3>
  <p>Contract Chain Id : {contractChainId}</p>
  <h4>Read Functions</h4>
  {#each readFunctons as fragment}
    <ContractFragment {fragment} {...props} />
  {/each}
  <h4>Write Functions</h4>
  {#each writeFunctions as fragment}
    <ContractFragment {fragment} {...props} />
  {/each}
</div>
