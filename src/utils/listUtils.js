import { svgComponentOption, componentListMixin } from './shared/model.js'
import { isUndef } from './shared/typeCheck.js'

/**
 * @description 拖拽完毕后，将列表中的目标元素进行更新，这里的操作只是对target进行更新，不涉及节点的移动。
 * 节点的移动是在domOperate的工具文件的toContainer中进行的。
 * @param {Array} list 列表
 * @param {Dom} target dom节点
 */
export function renewList(list, target) {
  let ID = target.getAttribute('id'),
      targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]),
      targetInfo = target.getBBox(),
      width = targetInfo.width,
      height = targetInfo.height,
      isFind = false;  // 标识符，标志说否找到目标节点
  
    svgComponentOption.forEach((value) => {
      if (isFind) {
        // 如果找到了，并不会进行继续操作。这是因为svgComponentOption一共有6项（以后可以进行拓展）。相当于调用6个遍历函数，isFind可以减少没必要的遍历
        return ;
      }
      for (let i = 0; i < list[value].length; i++) {
        if (list[value][i].id === ID) {
          list[value][i].x = targetX;
          list[value][i].y = targetY;
          list[value][i].width = width;
          list[value][i].height = height;
          isFind = true;
          break;
        }
      }
    });
}

/**
 * @description 进行列表的克隆
 * @param {*} tarList 
 * @param {*} list 
 */
export function cloneList(tarList, list) {
  // 先清空或者初始化
  componentListMixin(list);

  setTimeout(() => {
    // 这里利用到setTimeout放到下一个事件循环的原因是调用componentListMixin的时候并非同步，
    // 即在遍历的时候会是一个相当于异步操作，所以要等到所有遍历结束，即放到下一个事件循环机制当中去
    svgComponentOption.forEach((value) => {
      if (value == 'circle' || value == 'judge') {
        for (let i = 0; i < tarList[value].length; i++) {
          // 用JSON对对象进行深复制
          list[value].push(
            JSON.parse(
              JSON.stringify(tarList[value][i])
            )
          );
          if (tarList[value][i].contain) {
            cloneList(tarList[value][i].contain, list[value][i].contain);
          }
        }
      } else {
        for (let i = 0; i < tarList[value].length; i++) {
          // 用JSON对对象进行深复制
          list[value].push(
            JSON.parse(
              JSON.stringify(tarList[value][i])
            )
          );
        }
      }
    })
    
  }, 0);
}

/**
 * @author Weybn
 * @version 1.0.0
 * @description 寻找目标积木块所在的list
 * @returns {List} 返回目标积木块所在的list
 * @param {Dom} target 目标的积木块
 * @param {List} list 整个根目录的list
 */
export function findList(target, listObj) {
  if (isUndef(target)) {
    throw new Error('the target is Undefinded');
    return ;
  }

  if (isUndef(listObj)) {
    return null;
  }
  
  let result = null;

  // 查找target是否在这个list对象中
  result = findTypeList(target, listObj);
  if (result == true) {
    return listObj;
  }

  // 使用递归遍历
  for (let i = 0; i < listObj.circle.length; i++) {
    result = findList(target, listObj.circle[i].contain);
    if (result) {
      return result;
    }
  }

  for (let i = 0; i < listObj.judge.length; i++) {
    result = findList(target, listObj.judge[i].contain);
    if (result) {
      return result;
    }
  }

  return result;
}

export function findTypeList (target, TarListObj) {
  // 寻找目标的列表
  if (isUndef(TarListObj)) {
    return false;
  }

  let id = target.getAttribute('id'),
      type = target.getAttribute('data-type');

  if (TarListObj[type].length === 0) {
    return ;
  }

  for (let i = 0; i < TarListObj[type].length; i++) {
    if (TarListObj[type][i].id === id) {
      return true;
    }
  }

  return false;
}