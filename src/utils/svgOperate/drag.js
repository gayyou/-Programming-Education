import { nestWhileOperate, nestJudgeOperate, splitWhileOperate, splitJudgeOperate } from './changeSvgContainer.js'
import { getTransform, getTypeAndID, setTransform, getPathAttr, setPathAttr, cloneSvgInfo } from '../shared/utils'
import { whileOption, judgeOption } from './options'
import { adjustSvgPosi, toContainer } from './domOperate'
import { cloneList, findList } from '../listUtils'

/**
 * 
 * @param {*} target 
 * @param {*} crashTarget 
 * @param {*} list 
 * @param {*} args 
 */
export function nestOperate(target, crashResult, fromList, conPlaceList) {
  let { type: conType, id: conID } = getTypeAndID(crashResult.container);
  let { type } = getTypeAndID(target);

  // 这里是用switch判断容器的类型，从而更改容器的形状
  switch(conType) {
    case 'circle': {
      nestWhileOperate.call(this, target, crashResult.container, fromList);
      break;
    }
    case 'judge': {
      // 这里会有一个bug，就是先在else语句中添加语句的话，继续添加的if语句中的块，会出差错，原因是else的块没有进行处理
      let conTargetList;

      for (let i = 0; i < conPlaceList[conType].length; i++) {
        if (conID == conPlaceList[conType][i].id) {
          conTargetList = conPlaceList[conType][i];
        }
      }

      if (crashResult.dirY == 1) {
        nestJudgeOperate.call(this, target, crashResult.container, fromList, true);
      } else {
        nestJudgeOperate.call(this, target, crashResult.container, fromList, false);
      }
      
      setTimeout(() => {
        let {x, y} = getTransform(target);
        let {x: conX, y: conY} = getTransform(crashResult.container);
        target.setAttribute('transform', 'translate(' + (x - conX) + ', ' + (y - conY) + ')');  // 确定放在if或者else
        adjustOperate.call(this, target, crashResult.container, conTargetList.contain);
      }, 0)
      break;
    }
  }

  let containParam = null;
  // 这里是改变列表中的位置
  if (type == 'judge' || type == 'circle' || type == 'condition') {
    containParam = getPathAttr(target);
  }
  toContainer.bind(this)(target, crashResult.container, fromList, conPlaceList[conType]);
  setTimeout(() => {
    if (containParam) {
      let target = $('#' + containParam.id)[0];
      setPathAttr(target, containParam);
    }
  }, 1)
}

/**
 * @param 
 * @param {*} target 
 * @param {*} fromList 
 * @param {*} toList 
 */
export function spiltOperate(target, conTarget, fromList, toList, mousePayload) {
  let { id: id, type: type } = getTypeAndID(target),
      { id: conID, type: conType } = getTypeAndID(conTarget),
      { x: bashX, y: bashY } = getTransform(conTarget);

  switch(conType) {
    // 更新容器的状态
    case 'circle': {
      splitWhileOperate.call(this, target, conTarget);
      break;
    }

    case 'judge': {
      splitJudgeOperate.call(this, target, conTarget, fromList);
      break;
    }
  }
  setTimeout(() => {
    adjustOperate.call(this, target, conTarget, fromList);  // 拖拽出去后进行调整容器
  }, 0)
  // 更新拉出来的块
  let mouseDisX = mousePayload.x - this.$store.state.mouse.x,
      mouseDisY = mousePayload.y - this.$store.state.mouse.y;
  for (let i = 0; i < fromList[type].length; i++) {
    if (fromList[type][i].id === id) {
      let temp = fromList[type][i];
      temp.x = bashX + temp.x + mouseDisX;
      temp.y = bashY + temp.y + mouseDisY;
      setTransform(target, {
        x: temp.x,
        y: temp.y
      });

      let containParam = null;
      // 这里是改变列表中的位置
      if (type == 'judge' || type == 'circle' || type == 'condition') {
        containParam = getPathAttr(target);
      }

      toContainer.call(this, target, conTarget, fromList, toList);

      setTimeout(() => {
        if (containParam) {
          let target = $('#' + containParam.id)[0];
          setPathAttr(target, containParam);
        }
      }, 0)
      // let temp = fromList[type].splice(i, 1)[0];
      // let newObj = {
      //   contain: {}
      // }
      // temp.x = bashX + temp.x + mouseDisX;
      // temp.y = bashY + temp.y + mouseDisY;
      // cloneSvgInfo(newObj, temp);
      // cloneList(temp.contain, newObj.contain)
      // // 对列表进行更新
      // setTransform(target, {
      //   x: newObj.x,
      //   y: newObj.y
      // })

      // setTimeout(() => {
      //   adjustOperate.call(this, target, conTarget, fromList);  // 拖拽出去后进行调整容器
      // }, 0)

      // toList[type].push(newObj);
      // this.$store.state.isRenew = !this.$store.state.isRenew;
    }
  }
}

/**
 * @description 调整操作
 * @param {*} target 
 * @param {*} conTarget 
 * @param {*} conList 
 */
export function adjustOperate(target, conTarget, conList) {
  let { type: conType } = getTypeAndID(conTarget);

  switch(conType) {
    case 'circle': {
      adjustSvgPosi.call(this, target, conList, whileOption);
      break;
    }
    
    case 'judge': {
      adjustSvgPosi.call(this, target, conList, judgeOption, conTarget);
      break;
    }
  }
}

/**
 * @description 删除节点
 * @param {*} target 
 * @param {*} list 
 */
export function deleteOperate(target, list) {
  let { x } = getTransform(target),
      { id, type } = getTypeAndID(target);
  let conList = findList(target, list);
  if (x < 290) {
    for (let i = 0; i < conList[type].length; i++) {
      if (id == conList[type][i].id) {
        conList[type].splice(i, 1);
        return true;
      }
    }
  }
  return false;
}