import { getTypeAndID, getTransform, insertSort, cloneSvgInfo } from '../shared/utils'
import { cloneList } from '../listUtils.js'
import { isSvgContainer } from '../shared/typeCheck.js'

/**
 * @author Weybn
 * @version 1.0.0
 * @description 将目标节点的信息数据进行转移，用处在嵌套或者分离的时候进行使用。
 * @param {Dom} target 目标节点
 * @param {Dom} crashTarget 容器节点
 * @param {List} fromList 目标节点所在列表
 * @param {List} toList 容器节点所在列表，也可以是最外层的容器
 */
export function toContainer(target, crashTarget, fromList, toList) {
  let { type, id } = getTypeAndID(target),
      { id: conID } = getTypeAndID(crashTarget),
      move = null;
      
  for (let i = 0; i < fromList[type].length; i++) {
    if (fromList[type][i].id == id) {
      if (isSvgContainer(target)) {
        // 移动的目标为容器，则要进行深复制挪过去
        move = {};
        cloneSvgInfo(move, fromList[type][i])  // 复制信息
        cloneList(fromList[type][i].contain, move.contain);  // 复制内容
        fromList[type].splice(i, 1);
      } else {
        // 如果移动目标并不是容器
        move = fromList[type][i];
        fromList[type].splice(i, 1);
      }

      if (toList == this.$store.state.canvasList) {
        // 移动到最外层
        this.$store.state.canvasList[type].push(move);
      } else {
        for (let j = 0; j < toList.length; j++) {
          if (conID == toList[j].id) {
            toList[j].contain[type].push(move);
          }
        }
      }
    }
  }

  // 更新视图层，防止数组增加后并没有渲染
  this.$store.state.isRenew = !this.$store.state.isRenew;
}



/**
 * @description 调整conTarget里面块的顺序和位置
 * @param {*} target 正在拖拽的目标
 * @param {*} conList 拖拽目标所在容器列表
 * @param {Dom} conTarget 
 */
export function adjustSvgPosi(target, conList, options, conTarget) {
  let childList = [],
      { id } = getTypeAndID(target),
      { y } = getTransform(target),
      keys = Object.keys(conList);
  
  // 获得所有子节点
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < conList[keys[i]].length; j++) {
      if (conList[keys[i]][j].id == id) {
        // 正在移动的目标还没有进行更新视图层，所以要获得当前相对于容器的位置
        conList[keys[i]][j].y = y;
      }
      childList.push(conList[keys[i]][j]);
    }
  }

  insertSort(childList); // 排序

  if (conTarget) {
    // payload有东西，说明是judge的调整
    adjustJudge(childList, conTarget, options)
  } else {
    // 对circle的调整
    adjustWhile(childList, options);
  }
}

function adjustWhile(childList, options) {
  let bashX = options.bashX,
      bashY = options.bashY;

  for (let i = 0; i < childList.length; i++) {
    // 重新更新
    childList[i].x = bashX;
    childList[i].y = bashY;

    bashY +=childList[i].height;
  }

  for (let i = 0; i < childList.length; i++) {
    $('#' + childList[i].id).attr('transform', 'translate(' + childList[i].x + ','+ childList[i].y +')');
  }
}

function adjustJudge(childList, conTarget, options) {
  let bashX = options.bashX,
      bash1Y = options.bashY,
      bash2Y = options.bashSecondY - 24,
      bashTextY = options.elseText.bash,
      firstBash = options.firstBash,
      secondBash = options.secondBash,
      secFlag = false,
      firstFlag = false,
      ifElseLine = conTarget.getElementsByClassName('else')[0].getAttribute('transform');

  ifElseLine = parseInt(ifElseLine.split(' ')[5]);

  // let textBash = parseInt(conTarget.getAttribute('data-textBash'));
  
  for (let i = 0; i < childList.length; i++) {
    childList[i].x = bashX;

    if (childList[i].y < ifElseLine) {
      firstFlag = true;
      childList[i].y = bash1Y;
      bash2Y += childList[i].height;
      bash1Y += childList[i].height;
      bashTextY += childList[i].height;
      firstBash += childList[i].height;
    } else {
      secFlag = true;
      childList[i].y = bash2Y;
      bash2Y += childList[i].height;
      secondBash -= childList[i].height;
      firstBash += childList[i].height;
    }
  }

  firstBash -= 24;
  bashTextY -= 23.5;

  if (!firstFlag) {
    firstBash += options.firstBash;
    bashTextY = options.elseText.bash;

    for (let i = 0; i < childList.length; i++) {
      childList[i].y += options.firstBash + 0.5;
    }
  }

  if (secFlag) {
    // secondBash += 23.5;
    secondBash += 23.5;
    firstBash -= 23.5;
  } else {
    
  }
  

  let nextText = options.elseText.firstHalf
               + bashTextY
               + options.elseText.lastHalf;

  let nextD = options.firstHalf 
            + firstBash 
            + options.secondHalf
            + secondBash    // 这里需要加之前的第二个基础，因为在if中插入的时候并不会影响第二个
            + options.lastHalf;
  
  conTarget.getElementsByClassName('out-line')[0].setAttribute('d', nextD);
  conTarget.getElementsByClassName('else')[0].setAttribute('transform', nextText); // 文本位置
  for (let i = 0; i < childList.length; i++) {
    $('#' + childList[i].id).attr('transform', 'translate(' + childList[i].x + ','+ childList[i].y +')');
  }
}