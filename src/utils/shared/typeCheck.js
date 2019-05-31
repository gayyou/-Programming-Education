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
    return str === 'circle' || str === 'judge' || str === 'inOrder';
  }

  if (typeof checkTarget === 'string') {
    return checkType(checkTarget)
  } else {
    return checkDom(checkTarget);
  }
}

export function checkData(data) {
  let isTrue = true;

  if (data.type == 'if' || data.type == 'while' || data.type == 'circle' || data.type == 'judge') {
    if (data.condition == null) {
      return false;
    }
  }

  for (let i = 0; i < data.children.length; i++) {
    isTrue = checkData(data.children[i]);
  }

  return isTrue;
}