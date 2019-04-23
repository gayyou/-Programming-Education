import { toContainer } from './domOperate.js';
import { whileOption, judgeOption } from './options.js';

/**
 * @description 将执行代码块嵌入到循环中。思路是将块先放进目标容器中，然后偏移量transform重新进行设置，
 * 这个设置是通过一次次试验得到的数据，所以光看逻辑并不会看出来，需要引入options文件。
 * @param {g tag} target 想要内嵌的目标
 * @param {*} crashTarget 容器
 */
export function nestWhileOperate(target, crashTarget, list, isFake) {
  // 先将节点插入到碰撞的块中
  let conType = crashTarget.getAttribute('data-type'),
      type = target.getAttribute('data-type'),
      id = target.getAttribute('id');

      

  if (type == 'condition') {
    return nestConditionOperate.bind(this)(target, crashTarget, list, isFake);
  }
  
  // 先得到之前的循环框的内嵌块的起点currentY和path中的延伸长度起点
  let currentY = parseInt(crashTarget.getAttribute('data-currentY')),
      currentBash = parseInt(crashTarget.getAttribute('data-currentBash')),
      nextY, nextBash,
      targetInfo = target.getBBox(),
      height = targetInfo.height;
  
  // 先寻找目标块在哪，设置其在内嵌块中的位置
  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id == id) {
      list[type][i].x = whileOption.bashX;
      list[type][i].y = currentY;
    }
  }

  if (!isFake) {
    toContainer.bind(this)(target, crashTarget, list, list[conType]);
  }
  

  if (currentBash == whileOption.firstBash) {
    // 第一次的时候，因为会有空隙，所以while循环块的扩大会比目标的height还要大出12
    nextBash = height + whileOption.pathBash;  // 这个12是通过试验得出的。
  } else {
    // 第二次及以后，则直接加上increationY这么大
    nextBash = height + currentBash;
  }

  nextY = currentY + height;  // 下个内嵌进来的元素的transform的基础值

  crashTarget.setAttribute('data-currentY', nextY);  // 将其设置到碰撞容器中，方便下次进行获取
  crashTarget.setAttribute('data-currentBash', nextBash);
  let nextD = whileOption.firstHalf + ' ' + nextBash + ' ' + whileOption.lastHalf; // 设置为path的值
  crashTarget.getElementsByClassName('out-line')[0].setAttribute('d', nextD); // 赋值path值

  return {
    target: crashTarget.getAttribute('id'),
    nextD
  };
}

/**
 * @description 嵌套判断语句时候的函数
 * @param {*} target 
 * @param {*} crashTarget 
 * @param {*} list 
 * @param {*} isIf 
 */
export function nestJudgeOperate(target, crashTarget, list,isIf) {
  let conID = crashTarget.getAttribute('id'),
      conType = crashTarget.getAttribute('data-type'),
      type = target.getAttribute('data-type'),
      id = target.getAttribute('id');
  
  // 首先将元素内嵌
  // toContainer(target, crashTarget);

  if (type == 'condition') {
    return nestConditionOperate.bind(this)(target, crashTarget, list, isFake);
  }

  // 获得之前的所有数据
  let currentY = parseInt(crashTarget.getAttribute('data-currentY')),
      currentSecondY = parseInt(crashTarget.getAttribute('data-currentSecondY')),
      firstBash = parseInt(crashTarget.getAttribute('data-firstBash')),
      secondBash = parseInt(crashTarget.getAttribute('data-secondBash')),
      textBash = parseInt(crashTarget.getAttribute('data-textBash')),
      firstTime = parseInt(crashTarget.getAttribute('data-firstTime')),
      targetInfo = target.getBBox(),
      height = targetInfo.height,
      nextY, nextFirstBash, nextSecondBash, nextTextBash,
      transform;

  if (isIf) {
    let nextSecondY;
    if (firstTime == '1') {
      // 在if中第一次插入的时候
      nextFirstBash = height + firstBash - 24;
      nextTextBash = textBash + height - 24; // 这个减24也是通过试验得出的 
      nextSecondY = height + currentSecondY - 24;  
    } else {
      // 在if语句中不是第一次插入的时候
      nextFirstBash = height + firstBash;
      nextTextBash = height + textBash;
      nextSecondY = height + currentSecondY;  // 要更改第二个的初始位置
    }
    let nextD = judgeOption.firstHalf 
              + nextFirstBash 
              + judgeOption.secondHalf
              + secondBash    // 这里需要加之前的第二个基础，因为在if中插入的时候并不会影响第二个
              + judgeOption.lastHalf;
    
    let nextText = judgeOption.elseText.firstHalf
                 + nextTextBash
                 + judgeOption.elseText.lastHalf;
    
    transform = 'translate('+ judgeOption.bashX +','+ currentY +')';


    for (let i = 0; i < list[type].length; i++) {
      if (list[type][i].id == id) {
        list[type][i].x = judgeOption.bashX;
        list[type][i].y = currentY;
      }
    }

    crashTarget.getElementsByClassName('out-line')[0].setAttribute('d', nextD); // 赋值path值
    crashTarget.getElementsByClassName('else')[0].setAttribute('transform', nextText); // 赋值文本transform
    crashTarget.setAttribute('data-firstTime', '2');

    nextY = currentY + height;

    crashTarget.setAttribute('data-currentY', nextY);  // 将其设置到碰撞容器中，方便下次进行获取
    crashTarget.setAttribute('data-firstBash', nextFirstBash);  // 将其设置到碰撞容器中，方便下次进行获取
    crashTarget.setAttribute('data-textBash', nextTextBash);  // 将其设置到碰撞容器中，方便下次进行获取
    crashTarget.setAttribute('data-currentSecondY', nextSecondY);
  } else {
    if (secondBash == judgeOption.secondBash) {
      nextSecondBash = secondBash - height + 23.5;
      nextFirstBash = height + firstBash - 23.5;
    } else {
      nextSecondBash = secondBash - height;
      nextFirstBash = height + firstBash;
    }

    let nextD = judgeOption.firstHalf 
              + nextFirstBash 
              + judgeOption.secondHalf
              + nextSecondBash    // 这里需要加之前的第二个基础，因为在if中插入的时候并不会影响第二个
              + judgeOption.lastHalf;

    transform = 'translate('+ judgeOption.bashX +','+ currentSecondY +')';

    for (let i = 0; i < list[type].length; i++) {
      if (list[type][i].id == id) {
        list[type][i].x = judgeOption.bashX;
        list[type][i].y = currentSecondY;
      }
    }

    crashTarget.getElementsByClassName('out-line')[0].setAttribute('d', nextD); // 赋值path值

    // 下面是设置
    nextY = currentSecondY + height;
    crashTarget.setAttribute('data-currentSecondY', nextY);  // 将其设置到碰撞容器中，方便下次进行获取
    crashTarget.setAttribute('data-secondBash', nextSecondBash);  // 将其设置到碰撞容器中，方便下次进行获取
    crashTarget.setAttribute('data-firstBash', nextFirstBash);  // 将其设置到碰撞容器中，方便下次进行获取
  }
  // 内嵌块重新设置偏移量
  // target.setAttribute('transform', transform);
  toContainer.bind(this)(target, crashTarget, list, list[conType]);

}


function nestConditionOperate(target, crashTarget, list, isFake) {
  // let extendLine = crashTarget.getElementsByClassName('extend-line')[0],
  //     poly = crashTarget.getElementsByClassName('poly')[0];
  let conType = crashTarget.getAttribute('data-type'),
      type = target.getAttribute('data-type'),
      id = target.getAttribute('id'),
      conID = crashTarget.getAttribute('id');
  // extendLine.style.display = 'block';
  // poly.style.display = 'none';
  // let type = target.getAttribute('data-type');
  // target.setAttribute('transform', 'translate(140,7.5)');
  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id == id) {
        list[type][i].x = 140;
        list[type][i].y = 7.5;
    }
  }

  for (let i = 0; i < list[conType].length; i++) {
    if (list[conType][i].id == conID) {
      list[conType][i].hasCdn = true;
      break;
    }
  }

  if (!isFake) {
    toContainer.bind(this)(target, crashTarget, list, list[conType]);
  }
}