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

  var parameterfy = (function () {
    var pattern = /function[^(]*\(([^)]*)\)/

    return function (func) {
      // fails horribly for parameterless functions ;)
      var args = func.toString().match(pattern)[1].split(/,\s*/)

      return function () {
        var named_params = arguments[arguments.length - 1]
        if (typeof named_params === "object") {
          var params = [].slice.call(arguments, 0, -1)
          if (params.length < args.length) {
            for (var i = params.length, l = args.length; i < l; i++) {
              params.push(named_params[args[i]])
            }
            return func.apply(this, params)
          }
        }
        return func.apply(null, arguments)
      }
    }
  })()

  const { connect, connected, provider, signer } = store

  // maybe should handle "on connected" and "on disconnected"
  let params: Dict<any> = {}

  const handleSubmit = async () => {
    if (!$connected || !$signer) {
      await connect()
    }
    contract = contract.connect($signer)
    console.log(await $signer.getAddress())
    console.log({ ...params })
    let f: any = contract[fragment.name]
    let f2: any = parameterfy(f)
    f2(params)
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h4>{fragment.format()}</h4>
  {#each fragment.inputs as input}
    <ContractInput {input} bind:val={params[input.name]} />
    {input.name}
    {params[input.name]}
  {/each}
  <button> Submit </button>
</form>
