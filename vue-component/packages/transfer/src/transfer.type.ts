
export type Key = string | number
export type DataItem = {
  key: Key,
  label: string,
  disabled: boolean
}
export type Props = {
  key: string,
  label: string,
  disabled: string
}

export interface ITransferProps {
  data: DataItem[], // 所有数据
  modelValue: Key[], // 右边数据
  props: Props // 别名
}

export interface ITransferPanelProps {
  data: any[],
  props?: Props
}

export interface IPanelState {
  checked: Key[],
  allChecked: Boolean,
  indeterminate: Boolean
}