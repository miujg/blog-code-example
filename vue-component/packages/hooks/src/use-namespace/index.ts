import { unref } from 'vue'

const defaultNamespace = 'm'
const blockSuffix = '-'
const statePrefix = 'is-'
const modifierSeparator = '--'
const elementSeparator = '__'

const _bem = (
  namespace: string,
  block: string,
  modifier: string = '',
  element: string = '',
  state: string = '',
  bSuffix: string = ''
) => {
  let className = `${namespace}-${block}`
  if (state) className += ` ${statePrefix}${state}`
  if (modifier) className += `${modifierSeparator}${modifier}`
  if (element) className += `${elementSeparator}${element}`
  if (bSuffix) className += `${blockSuffix}${bSuffix}`
  return className
  
}

export const useNamespace = (block:string) => {
  const namespace = defaultNamespace
  const b = (bSuffix:string = '') => _bem(namespace, unref(block), '', '', '', bSuffix) 
  const when = (state:string) => _bem(namespace, unref(block), '', '', state)
  const m = (modifier:string) => _bem(namespace, unref(block), modifier)
  const e = (element:string) => _bem(namespace, unref(block), '', element)
  return {
    b,
    when,
    m,
    e
  }
}



