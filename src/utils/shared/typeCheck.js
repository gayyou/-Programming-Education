import { getTypeAndID } from './utils'
import { svgContainer } from './model'

export function isUndef(tar) {
  return typeof tar === 'undefined';
}

export function isSvgContainer(target) {
  let { type } = getTypeAndID(target);

  return svgContainer.includes(type);
}

