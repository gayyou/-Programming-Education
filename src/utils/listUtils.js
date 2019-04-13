/**
 * @description 拖拽完毕后，将列表进行更新
 * @param {Array} list 列表
 * @param {Dom} target dom节点
 */
export function renewList(list ,target) {
  let ID = target.getAttribute('id'),
      targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);
  
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === ID) {
      list[i].x = targetX;
      list[i].y = targetY;
    }
  }
}

export function removeFromList(list, target) {
  let ID = target.getAttribute('id');

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === ID) {
      list = list.splice(i, 1);
      console.log(list)
    }
  }
}