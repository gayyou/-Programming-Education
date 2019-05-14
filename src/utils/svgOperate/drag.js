import { nestWhileOperate, nestJudgeOperate, splitWhileOperate, splitJudgeOperate, splitConditionOperae } from './changeSvgContainer.js'
import { getTransform, getTypeAndID, setTransform, getPathAttr, setPathAttr, cloneSvgInfo } from '../shared/utils'
import { whileOption, judgeOption } from './options'
import { adjustSvgPosi, toContainer } from './domOperate.js'
import { cloneList, findList, deleteFromList, renewList, renewAllList } from '../shared/listUtils'
import { svgComponentOption } from '../shared/model.js'

/**
 * @description 合并操作，需要传入this对象
 * @version 1.1.0 减少参数List，直接从target和conTarget进行获取list表
 * @param {*} target 
 * @param {*} crashTarget 
 * @param {*} list 
 * @param {*} conPlaceList 目标容器的list。并不是其contain属性
 * @variation fromList 目标从哪里拖郭爱爱的容器列表
 */
export function nestOperate(target, crashResult) {
  let { type: conType, id: conID } = getTypeAndID(crashResult.container);
  let { type, id } = getTypeAndID(target);
  let fromList = findList(target, this.$store.state.canvasList);
  let toList = findList(crashResult.container, this.$store.state.canvasList);

  // 这里是用switch判断容器的类型，从而更改容器的形状
  switch(conType) {
    case 'circle': {
      let conTargetList;

      for (let i = 0; i < toList[conType].length; i++) {
        if (conID == toList[conType][i].id) {
          conTargetList = toList[conType][i];
        }
      }

      nestWhileOperate.call(this, target, crashResult.container, fromList);
      setTimeout(() => {
        let target = $('#' + id)[0];
        adjustOperate.call(this, target, crashResult.container, conTargetList.contain);
      })
      break;
    }
    case 'judge': {
      // 这里会有一个bug，就是先在else语句中添加语句的话，继续添加的if语句中的块，会出差错，原因是else的块没有进行处理
      let conTargetList;
      let { x, y } = getTransform(target);

      for (let i = 0; i < toList[conType].length; i++) {
        if (conID == toList[conType][i].id) {
          conTargetList = toList[conType][i];
        }
      }

      if (crashResult.dirY == 1) {
        nestJudgeOperate.call(this, target, crashResult.container, fromList, true);
      } else {
        nestJudgeOperate.call(this, target, crashResult.container, fromList, false);
      }
      
      setTimeout(() => {
        let target = $('#' + id)[0];
        let {x: conX, y: conY} = getTransform(crashResult.container);
        if (type != 'condition') {
          // condition不参与
          target.setAttribute('transform', 'translate(' + (x - conX) + ', ' + (y - conY) + ')');  // 确定放在if或者else
        }
        // this.$store.state.isRenew = !this.$store.state.isRenew;
        adjustOperate.call(this, target, crashResult.container, conTargetList.contain);
      }, 0)
      break;
    }
  }

  let containParam = null;  // 这个是复制原来容器的信息，然后在新创建的对象中进行改变
  // 这里是改变列表中的位置
  // if (type == 'judge' || type == 'circle' || type == 'condition') {
  //   // 如果是容器的话，先记住之前的状态
  //   containParam = getPathAttr(target);
  // }
  // // 上面那些只是很假的可视区域的改变，这里才是对列表进行改变
  toContainer.bind(this)(target, crashResult.container, fromList, toList[conType]);

  // setTimeout(() => {
  //   // 作用是记住容器之前的状态
  //   if (containParam) {
  //     // 更新视图层后，将之前的容器的状态进行赋值给新的容器这个状态
  //     let target = $('#' + containParam.id)[0];
  //     setPathAttr(target, containParam);
  //   }
  //   renewList(this.$store.state.canvasList, crashResult.container);  // 更新碰撞的容器在列表中的大小
  // }, 1)
}

/**
 * @description 进行分离操作，需要传入this对象
 * @version 1.1.0 减少参数List，直接从target和conTarget进行获取list表
 * @param {*} target 拖拽的目标，这个是在进行拖拽的时候
 * @param {*} conTarget 分离的目标的容器
 * @param {*} fromList target所在列表
 * @param {*} toList 容器所在列表
 * @param {*} mousePayLoad 点击事件鼠标的位置
 */
export function spiltOperate(target, conTarget, mousePayload) {
  let { id: id, type: type } = getTypeAndID(target),
      { id: conID, type: conType } = getTypeAndID(conTarget),
      { x: bashX, y: bashY } = getTransform(conTarget),
      fromList = findList(target, this.$store.state.canvasList),
      toList = this.$store.state.canvasList;  // 设置为根的原因就是只有移动到根容器中才会进行分裂

  switch(conType) {
    // 更新容器的状态
    case 'circle': {
      splitWhileOperate.call(this, target, conTarget, fromList);
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

      let containParam = null;  // 如果拉出去的是容器的话，会对新渲染出来的容器进行改变
      // 这里是改变列表中的位置
      // if (type == 'judge' || type == 'circle' || type == 'condition') {
      //   containParam = getPathAttr(target);
      // }

      toContainer.call(this, target, conTarget, fromList, toList);

      // setTimeout(() => {
      //   if (containParam) {
      //     let target = $('#' + containParam.id)[0];
      //     setPathAttr(target, containParam);
      //   }
      //   renewList(this.$store.state.canvasList, conTarget);  // 更新容器列表
      // }, 1)
    }
  }
}

/**
 * @description 调整操作，需要更改作用域对象为vue对象，方便访问store
 * @time 2019-05-02
 * @version 1.1.0 减少参数List，直接从target和conTarget进行获取list表
 * @param {*} target 正在移动的目标
 * @param {*} conTarget 移动目标的容器列表容器目标
 * @param {*} conList 容器所在的contain属性列表
 */
export function adjustOperate(target, conTarget, conList) {
  let conType = getTypeAndID(conTarget).type;
  console.log('进行调整')
  switch(conType) {
    case 'circle': {
      adjustSvgPosi.call(this, target, conList, whileOption, conTarget);
      break;
    }

    case 'judge': {
      adjustSvgPosi.call(this, target, conList, judgeOption, conTarget);
      break;
    }
  }

  // 从里至外进行调整容器的大小
  conTarget = $(conTarget).parent()[0];
  target = $(target).parent()[0];
  if (conTarget.getAttribute('id') !== 'main-svg-container') {
    conList = findList(target, this.$store.state.canvasList);
  } else {
    conList = this.$store.state.canvasList;
  }
  if (conList != this.$store.state.canvasList || 
    (conList == this.$store.state.canvasList && conTarget.getAttribute('id') !== 'main-svg-container')) {
    setTimeout(() => {
      renewAllList(this.$store.state.canvasList);
      setTimeout(() => {
        this.$store.state.isRenew = !this.$store.state.isRenew;  // 更新时机很重要
        adjustOperate.call(this, target, conTarget, conList);
      }, 0)
    }, 0);
  }
  
  
  // let conType = getTypeAndID(conTarget).type;
  // // console.log(conType)
  // switch(conType) {
  //   case 'circle': {
  //     adjustSvgPosi.call(this, target, conList, whileOption);
  //     break;
  //   }
    
  //   case 'judge': {
  //     adjustSvgPosi.call(this, target, conList, judgeOption, conTarget);
  //     break;
  //   }
  // }
}

// function ajustConWH(conTarget) {
//   let contain = findConCspList(conTarget, this.$store.state.canvasList),

// }

/**
 * @description 在最外层的容器中进行删除偏左的块
 * @param {List} list 列表
 */
export function deleteOperate(list) {
  svgComponentOption.forEach((value) => {
    deleteFromList(list[value]);
  })
}