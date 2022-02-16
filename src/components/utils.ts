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

export const isFunction = (fragment: Fragment): fragment is FunctionFragment =>
  fragment.type == "function"

export const isReadFunction = (fragment: Fragment): fragment is RFragment =>
  isFunction(fragment) && ["pure", "view"].includes(fragment.stateMutability)
export const isWriteFunction = (fragment: Fragment): fragment is WFragment =>
  isFunction(fragment) &&
  ["payable", "nonpayable"].includes(fragment.stateMutability)
