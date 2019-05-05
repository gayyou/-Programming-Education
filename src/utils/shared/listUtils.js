import { svgComponentOption } from './model.js'
import { isUndef } from './typeCheck.js'
import { getTransform, getSvgWH, getTypeAndID } from './utils'

/**
 * @description 拖拽完毕后，将列表中的目标元素进行更新，这里的操作只是对target进行更新，不涉及节点的移动。
 * 节点的移动是在domOperate的工具文件的toContainer中进行的。
 * @param {Array} list 列表
 * @param {Dom} target dom节点
 */
export function renewList(list, target) {
  let { id: ID } = getTypeAndID(target),
      { x: targetX, y: targetY } = getTransform(target),
      { width, height } = getSvgWH(target);
  
    svgComponentOption.forEach((value) => {
      for (let i = 0; i < list[value].length; i++) {
        if (list[value][i].id === ID) {
          list[value][i].x = targetX;
          list[value][i].y = targetY;
          list[value][i].width = width;
          list[value][i].height = height;
          break;
        }
        if (list[value][i].contain) {
          // 递归遍历整个列表
          renewList(list[value][i].contain, target);
        }
      }
    });
}

/**
 * 
 * @param {*} list 
 */
export function renewAllList(list) {
  svgComponentOption.forEach((value) => {
    for (let i = 0; i < list[value].length; i++) {
      let target = $('#' + list[value][i].id)[0],
          { width, height } = getSvgWH(target),
          { x, y } = getTransform(target);
      
      list[value][i].width = width;
      list[value][i].height = height;
      list[value][i].x = x;
      list[value][i].y = y;

      if (list[value][i].contain) {
        // 递归遍历整个列表
        renewAllList(list[value][i].contain);
      }
    }
  })
}

/**
 * @description 进行列表的克隆,仅仅是克隆circle或者judge里面的块，并不会对circle这个目标进行克隆，所以需要创建这个目标，并且用这个目标的contain属性来进行克隆
 * @param {*} tarList 被克隆的目标,传入的是容器的contain属性
 * @param {*} list 新的目标，传入的是容器的contain属性
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
 * @param {List} listObj 整个根目录的list
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
  result = isInList(target, listObj);
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

/**
 * @description 找到容器节点对应的list表,返回对应的列表,即列表中该对象的contain属性
 * @param {Dom} conTarget 
 * @param {List} list 根列表
 */
export function findConCspList(conTarget, list) {
  let placeList = findList(conTarget, list),
      { id, type } = getTypeAndID(conTarget);
  for (let i = 0; i < placeList[type].length; i++) {
    if (id == placeList[type][i].id) {
      return placeList[type][i];
    }
  }
  return null;
}



/**
 * @description 寻找目标是否在列表中
 * @param {*} target 
 * @param {*} TarListObj 
 */
export function isInList (target, TarListObj) {
  // 寻找目标的列表
  if (isUndef(TarListObj)) {
    return false;
  }

  let { id, type } = getTypeAndID(target);

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

/**
 * @description 队列表进行插入属性
 * @param {*} conObj 容器对象
 */
export function componentListMixin(conObj) {
  svgComponentOption.forEach((value) => {
    conObj[value] = [];
  });
}

/**
 * @description 进行创建节点的时候进行初始化积木块
 * @param {List} list 想要进行推进的容器
 * @param {*} type 
 * @param {*} item 
 */
export function listPush(list, type, item) {
  if (type == 'circle' || type == 'judge') {
    // 如果是判断语句或者选择语句，需要特殊照顾
    item.contain = [];
    item.hasCdn = false;
    list[type].push(item);
  } else {
    list[type].push(item)
  }
  this.$store.state.isRenew = !this.$store.state.isRenew;
}

/**
 * @description 删除节点
 * @param {*} list 
 */
export function deleteFromList(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].x < 290) {
      list.splice(i, 1);
    }
  }
}