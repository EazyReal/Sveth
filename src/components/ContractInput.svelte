<script lang="ts">
  import { Fragment, Interface, ParamType } from "@ethersproject/abi"
  import { Contract } from "ethers"
  import { IStore } from ".."
  import { typeMap } from "./constants"

  export let input: ParamType
  export let val: any

  let props = {
    type: typeMap[input.type],
    placeholder: input.type,
  }
</script>

<input {...props} bind:value={val} />
