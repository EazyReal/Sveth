import { useEth } from "../sveth/useEth"

export const { connect, connected, provider, signer, chainId, account } =
  useEth()
