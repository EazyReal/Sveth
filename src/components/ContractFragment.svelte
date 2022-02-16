<script lang="ts">
  import { FunctionFragment, ParamType } from "@ethersproject/abi"
  import { Contract } from "ethers"
  import { TransactionResponse } from "@ethersproject/providers"
  // internal
  import { IStore } from ".."
  import { typeMap } from "./constants"
  import { isReadFunction, Dict, AsyncF } from "./utils"

  export let contract: Contract
  export let fragment: FunctionFragment
  export let store: IStore
  export let contractChainId: number

  const { connect, connected, signer, chainId } = store

  //handling function args
  const DOT = "__" // seperator
  let form: Dict<any> = {} // store params from form inputs
  let called: Boolean = false // if the fragment if ever called
  let displayedPromise: any // the promise to display as returned value

  const getFunctionInputKey = (
    fragment: FunctionFragment,
    input: ParamType,
    i: number
  ) => {
    const name = input.name ? input.name : "input_" + i + DOT
    return fragment.name + DOT + name + DOT + input.type
  }

  const getArgs = () =>
    fragment.inputs.map((input, i) => {
      const k = getFunctionInputKey(fragment, input, i)
      let v = form[k]
      if (input.baseType === "array") {
        v = JSON.parse(v)
      } else if (input.type === "bool") {
        v = v === "true" || v === "1" || v === "0x1"
      }
      return v
    })

  // get <input/> props by input: ParamType
  const getInputProps = (input: ParamType) => ({
    type: typeMap[input.type],
    placeholder: input.name + "(" + input.type + ")",
  })

  const handleSubmit = async (callback?: any) => {
    // treat Read and Write Fragment differently
    let isRead = isReadFunction(fragment)
    // connect if not connected to the chainid
    if (
      !$connected ||
      !$signer ||
      (contractChainId && $chainId != contractChainId)
    ) {
      await connect(contractChainId)
    }
    // construct tx/read
    contract = contract.connect($signer) // TODO: should handle no signer
    let contractFunction: AsyncF<TransactionResponse> | AsyncF<any[]> =
      contract[fragment.name]
    let overrides = {}
    if (fragment.payable) overrides["value"] = form["payableValue"]
    // send reqeust for tx/read
    let req = contractFunction(...getArgs(), overrides)
    console.log(
      `request submitted: ${JSON.stringify([
        req,
        contractFunction,
        [...getArgs()],
      ])}`
    )
    // deal with tx/read
    if (isRead) {
      try {
        called = true
        displayedPromise = req
        await req
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        let tx = await req // wait for provider confirmation
        called = true
        displayedPromise = (<TransactionResponse>tx).wait(1) // wait for n blocks confirmation
        let res = await displayedPromise
        alert(JSON.stringify(res))
      } catch (err) {
        console.error(err)
        if (err.code === 4001) alert("tx rejected by metamask")
      }
    }
    // after transaction confirmed can do call back
    if (callback) callback()
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h4>{fragment.format()}</h4>
  {#each fragment.inputs as input, i}
    <input
      {...getInputProps(input)}
      bind:value={form[getFunctionInputKey(fragment, input, i)]}
    />
  {/each}
  {#if fragment.payable}
    <input
      type="number"
      placeholder="payableValue"
      bind:value={form["payableValue"]}
    />
  {/if}
  <button> Submit </button>
  {#if called}
    {#await displayedPromise}
      <div>loading...</div>
    {:then res}
      <div>{JSON.stringify(res)}</div>
    {/await}
  {/if}
</form>
