import { toContainer } from './domOperate.js';
import { whileOption } from './options.js';

export function nestWhileOperate(target, crashTarget) {
  // 先将节点插入到碰撞的块中
  toContainer(target, crashTarget);
  let transform = 'translate('+ whileOption.bashX +','+ whileOption.bashY +')'
  target.setAttribute('transform', transform);
  let currentY = parseInt(crashTarget.getAttribute('currentY')),
      nextY;
  if (currentY == whileOption.firstBash) {
    nextY = whileOption.increationY;
  } else {
    nextY = whileOption.increationY + currentY;
  }
  crashTarget.setAttribute('currentY', nextY);
  let nextD = whileOption.firstHalf + nextY;
  crashTarget.getElementsByClassName('out-line')[0].setAttribute('d', )
}