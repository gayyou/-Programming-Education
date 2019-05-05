import { isUndef } from './typeCheck'
import { findList } from './listUtils'

/**
 * @version 1.0.0
 * @description 获得target的位置
 * @param {Dom} target 获得target的位置 
 * @returns { x, y }
 */
export function getTransform(target) {
  if (isUndef(target)) {
    return null;
  }

  let transInfo = target.getAttribute('transform'),
      x = parseInt(transInfo.split('(')[1].split(',')[0]),
      y = parseInt(transInfo.split(',')[1].split(')')[0]);
  
  return {
    x,
    y
  }
}

/**
 * @description 获得svg图块的宽高
 * @param {Dom} target 目标dom节点
 */
export function getSvgWH(target) {
  if (isUndef(target)) {
    return null;
  }

  let boxInfo = target.getBBox(),
      width = boxInfo.width,
      height = boxInfo.height;
  
  return {
    width,
    height
  }
}

/**
 * @description 获得目标的类型和ID
 * @param {Dom} target 目标dom节点
 */
export function getTypeAndID(target) {
  if (isUndef(target)) {
    return null;
  }

  return {
    id: target.getAttribute('id'),
    type: target.getAttribute('data-type')
  }
}

/**
 * 
 * @param {Dom} target 
 * @param {x, y} payLoad 传入一个函数，有x值和y值，为这个target设置位置
 */
export function setTransform(target, payLoad) {
  target.setAttribute('transform', 'translate(' + payLoad.x + ',' + payLoad.y + ')');
}

/**
 * @description 插入升序排序
 * @param {List} list 排序列表，这个列表是某个容器的所有子节点，需要进行获取
 */
export function insertSort(list) {
  let i, j, k;

    for (i = 1; i < list.length; i++)
    {
        //为a[i]在前面的a[0...i-1]有序区间中找一个合适的位置
        for (j = i - 1; j >= 0; j--) {
          if (list[j].y < list[i].y) {
            break;
          }
        }

        //如找到了一个合适的位置
        if (j != i - 1) {
          //将比a[i]大的数据向后移
          let temp = list[i];
          for (k = i - 1; k > j; k--) {
            list[k + 1] = list[k];
          }
              
          //将a[i]放到正确位置上
          list[k + 1] = temp;
        }
    }
}

/**
 * @description 克隆目标信息，target是结果，model是模板
 * @param {Dom} target 
 * @param {Dom} model 
 */
export function cloneSvgInfo(target, model) {
  let keys = Object.keys(model);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == 'contain') {
      target[keys[i]] = {};
      continue;
    }
    target[keys[i]] = model[keys[i]];
  }
}

/**
 * @description 将容器进行嵌套的时候，将原来的容器的属性进行保存并放到新的容器中去的方法
 * @param {Dom} target 获得路径的所有属性
 */
export function getPathAttr(target) {
  let { type } = getTypeAndID(target);

  switch(type) {
    case 'circle': {
      return pathAttr.getCircleAttr(target);
    }
    case 'judge': {
      return pathAttr.getJudgeAttr(target);
    }
    case 'condition': {
      break;
    }
  }

  return null;
}

/**
 * @description 进行设置path的属性
 * @param {*} target 
 * @param {*} param 
 */
export function setPathAttr(target, param) {
  let { type } = getTypeAndID(target);

  switch(type) {
    case 'circle': {
      pathAttr.setCircleAttr(target, param);
      break;
    }
    case 'judge': {
      pathAttr.setJudgeAttr(target, param);
      break;
    }
    case 'condition': {
      break;
    }
  }
}

const pathAttr = {
  getJudgeAttr(model) {
    let outLine, currentY, firstBash, secondBash, textBash, currentSecondY, firstTime,
        { id, type } = getTypeAndID(model);
  
    outLine = model.getElementsByClassName('out-line')[0].getAttribute('d');
    currentY = currentY = model.getAttribute('data-currentY');
    firstBash = model.getAttribute('data-firstBash');
    textBash = model.getElementsByClassName('else')[0].getAttribute('transform')
    currentSecondY = model.getAttribute('data-currentSecondY');
    secondBash = model.getAttribute('data-secondBash');
    firstTime = model.getAttribute('data-firstTime');
  
    return {
      outLine,
      currentY,
      firstBash,
      currentSecondY,
      secondBash,
      textBash,
      firstTime,
      id,
      type
    }
  },

  getCircleAttr(model) {
    let currentY, currentBash, outLine,
        { id, type } = getTypeAndID(model);
  
    currentY = model.getAttribute('data-currentY');
    currentBash = model.getAttribute('data-currentBash');
    outLine = model.getElementsByClassName('out-line')[0].getAttribute('d');
  
    return {
      currentY,
      outLine,
      currentBash,
      id,
      type
    }
  },

  setCircleAttr(target, param) {
    target.setAttribute('data-currentY', param.currentY);
    target.setAttribute('data-currentBash', param.currentBash);
    target.getElementsByClassName('out-line')[0].setAttribute('d', param.outLine);
  },

  setJudgeAttr(target, param) {
    target.getElementsByClassName('out-line')[0].setAttribute('d', param.outLine);
    target.getElementsByClassName('else')[0].setAttribute('transform', param.textBash);
    target.setAttribute('data-currentY', param.currentY);
    target.setAttribute('data-firstBash', param.firstBash);
    target.setAttribute('data-secondBash', param.secondBash);
    target.setAttribute('data-firstTime', param.firstTime);
    target.setAttribute('data-currentSecondY', param.currentSecondY);
  }
}

/**
 * @description 得到一个svg图的实际位置
 * @param {Dom} target 想要知道的目标
 * @param {List} rootList 根列表
 */
export function getTotalPosi(target, rootList) {
  let clickList = findList(target, rootList),
      bashX = 0,
      bashY = 0;

  while(clickList !== rootList) {
    let { x, y } = getTransform(target);

    bashX += x;
    bashY += y;
    target = $(target).parent()[0];
    clickList = findList(target, rootList);
  }

  let { x, y } = getTransform(target);
  bashX += x;
  bashY += y;

  return {
    x: bashX,
    y: bashY
  }
}

/**
 * @description 判断含有某个类型的积木块
 * @param {String} type 类型
 * @param {*} list 一个展示列表，即一个circle或者judge的contain属性或者根目录
 */
export function listHasTC(type, list) {
  return list[type].length !== 0;
}

/**
 * @description 找到对应的项
 * @param {Dom} target 
 * @param {List} rootList 
 */
export function findItem(target, rootList) {
  let list = findList(target, rootList),
      { type, id } = getTypeAndID(target);

  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id == id) {
      return list[type][i];
    }
  }

  return null;
}