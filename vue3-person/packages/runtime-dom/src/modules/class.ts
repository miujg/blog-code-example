export const patchClass = (el:HTMLElement, value) => {
  if (value == null) {
    value = ''
  }
  el.className = value
}