import {
  Web3Provider,
  type Provider,
  type JsonRpcProvider,
} from "@ethersproject/providers"
import type { Signer } from "ethers"
import { derived, writable, get, type Writable } from "svelte/store"

// providers supported
type sProvider = JsonRpcProvider | Web3Provider

export const useEth = () => {
  let injected
  const provider = writable<sProvider>()
  const connected = writable<Boolean>(false)

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log("all accounts disconnected")
      handleDisconnect()
      return
    }
    console.log("accountsChanged detected")
    // alternative approach is to change related values only, but account is derived from provider
    provider.set(new Web3Provider(injected))
  }
  function handleChainChanged(accounts) {
    // some testnet or polkadot chains cannot be detected....
    console.log("chainChanged detected")
    provider.set(new Web3Provider(injected))
  }

  function handleDisconnect() {
    if (injected) {
      injected.removeListener("accountsChanged", handleAccountsChanged)
      injected.removeListener("chainChanged", handleChainChanged)
    }
    connected.set(false)
    provider.set(undefined)
  }
  // add option to connect with JsonRpcProvider
  const connect = async (chainId?: number) => {
    console.log("connection execution start")
    try {
      injected = (window as any).ethereum
    } catch (err) {
      alert("[sveth] no window.ethereum")
    }
    // init web3Provider and set to provider
    const web3Provider = new Web3Provider(injected)
    await web3Provider.send("eth_requestAccounts", [])
    if (chainId) {
      await web3Provider.send("wallet_switchEthereumChain", [
        { chainId: "0x" + chainId.toString(16) },
      ])
    }
    connected.set(true)
    provider.set(web3Provider)
    if (injected.on) {
      injected.on("accountsChanged", handleAccountsChanged)
      injected.on("chainChanged", handleChainChanged)
      injected.on("disconnect", handleDisconnect)
    }
  }

  const chainId = derived<Writable<sProvider>, number>(
    provider,
    ($provider, set) => {
      if ($provider)
        (async () => {
          set((await $provider.getNetwork()).chainId)
        })()
    }
  )
  const signer = derived<Writable<sProvider>, Signer>(
    provider,
    ($provider, set) => {
      if ($provider)
        (async () => {
          set($provider.getSigner())
        })()
    }
  )
  const account = derived<Writable<sProvider>, string>(
    provider,
    ($provider, set) => {
      if ($provider)
        (async () => {
          let $signer = $provider.getSigner()
          set(await $signer.getAddress())
        })()
    }
  )
  return { connect, connected, provider, signer, chainId, account }
}
