import { getTypeAndID } from './utils'
import { svgContainer } from './model'

export function isUndef(tar) {
  return typeof tar === 'undefined';
}

export function isSvgContainer(checkTarget) {
  const checkDom = (target) => {
    let { type } = getTypeAndID(target);

    return svgContainer.includes(type);
  }

  const checkType = (str) => {
    return str === 'circle' || str === 'judge';
  }

  if (typeof checkTarget === 'string') {
    return checkType(checkTarget)
  } else {
    return checkDom(checkTarget);
  }
}

