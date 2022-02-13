<script lang="ts">
  export let abi
  export let address
  import { Interface } from "@ethersproject/abi"
  let iface: Interface = new Interface(abi)

  const handleSubmit = () => {}
</script>

<div>
  <h5>Contract {address}</h5>
  {#each iface.fragments as fragment, i}
    <form onSubmit={handleSubmit}>
      {#each fragment.inputs as input, j}
        <input name={input.name + i + j} placeholder={input.type} />
      {/each}
      <button on:click={handleSubmit}> Submit </button>
    </form>
  {/each}
</div>
