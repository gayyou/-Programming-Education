export function isCrash(target, list) {
  let targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]),
      targetID = target.getAttribute('id'),
      targetInfo = target.getBBox(),
      targetWidth = targetInfo.width,
      targetHeight = targetInfo.height;
  let tempX, tempY, tempW, tempH, tempID;
  let xFlag, yFlag;

  for (let i = 0; i < list.length; i++) {
    xFlag = 0;
    yFlag = 0;
    tempX = list[i].x;
    tempY = list[i].y;
    tempW = list[i].width;
    tempH = list[i].height;
    tempID = list[i].id;
    // 如果是本身，跳过
    if (tempID === targetID) {
      continue;
    }

    if (targetX - tempX <= 0) {
      // 当目标在列表当前项的左方的时候，判断x的绝对值是否小于目标的宽度，小于的话xFlag为1
      if (tempX - targetX < targetWidth) {
        xFlag = 1;
      }
    } else {
      // 右方则要判断是否小于列表中的大小
      if (targetX - tempX < tempW) {
        xFlag = 1;
      }
    }

    if (targetY - tempY <= 0) {
      if (tempY - targetY < targetHeight) {
        yFlag = 1;
      }
    } else {
      if (targetY - tempY < tempH) {
        yFlag = 1;
      }
    }

    if (xFlag === 1 && yFlag === 1) {
      // 发生碰撞了
      return $('#' + tempID)[0];
    }
  }

  return false
}