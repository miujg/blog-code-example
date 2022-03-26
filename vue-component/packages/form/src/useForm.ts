import mitt, {Emitter} from 'mitt'
import { Events, ValidataFunc } from './form.types'

export const emitter: Emitter<Events> = mitt<Events>()

export const useMitt = (validataFuncs: ValidataFunc) => {
  emitter.on('validataFunc', (validataObj) => {
    const key = Object.keys(validataObj)[0]
    validataFuncs[key] = validataObj[key]
  })
}
