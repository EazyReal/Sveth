import { Fragment, FunctionFragment } from "ethers/lib/utils"

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

export interface RFragment extends FunctionFragment {}
export interface WFragment extends FunctionFragment {}

export type Dict<T> = {
  [key: string]: T
}
export interface AsyncF<T> {
  (...args: any[]): Promise<T>
}

export const isReadFunction = (fragment: Fragment): fragment is RFragment =>
  fragment instanceof FunctionFragment &&
  ["pure", "view"].includes(fragment.stateMutability)
export const isWriteFunction = (fragment: Fragment): fragment is WFragment =>
  fragment instanceof FunctionFragment &&
  ["payable", "nonpayable"].includes(fragment.stateMutability)
