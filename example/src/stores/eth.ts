import { useEth } from "sveth"

export const { connect, connected, provider, signer, chainId, account } =
  useEth()
