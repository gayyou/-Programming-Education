import { svgComponentOption } from './shared/model.js'
/**
 * @description 判断是否碰撞了，返回碰撞的一个对象，对象的内容有 碰撞对象、碰撞部分
 * @param {*} target 
 * @param {*} list 
 * @returns { container, dirX, dirY } container为容器，dirX有两个值 1 为左边，2为右边,dirY有两个值，1为上方，2为下方
 */
export function isCrash(target, list) {
  let resData = null;

  svgComponentOption.forEach((value) => {
    if (list[value].length == 0) {
      return ;
    }
    let tempData = checkCrash(target, list[value]);
    if (tempData) {
      resData = tempData;
    }
  })

  return resData;
}

function checkCrash(target, list) {
  let targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]),
      targetID = target.getAttribute('id'),
      targetInfo = target.getBBox(),
      targetWidth = targetInfo.width,
      targetHeight = targetInfo.height;
  let tempX, tempY, tempW, tempH, tempID;
  let xFlag, yFlag, instanX, instanY, resDirX = 0, resDirY = 0, resData = null;

  // console.log('目标的id为' + targetID);
  // console.log(list);

  for (let i = 0; i < list.length; i++) {
    xFlag = 0;
    yFlag = 0;
    tempX = list[i].x;
    tempY = list[i].y;
    tempW = list[i].width;
    tempH = list[i].height;
    tempID = list[i].id;

    // console.log(tempID)

    // 如果是本身，跳过
    if (tempID == targetID) {
      // console.log('跳过了')
      continue;
    }

    if (targetX - tempX <= 0) {
      instanX = tempX - targetX;
      // 当目标在列表当前项的左方的时候，判断x的绝对值是否小于目标的宽度，小于的话xFlag为1
      if (instanX < targetWidth) {
        // 判断是否在右半部
        xFlag = 1;
      }
    } else {
      // 右方则要判断是否小于列表中的大小
      instanX = targetX - tempX;
      if (instanX < tempW) {
        // 当目标已经移动到目标的左边
        xFlag = 1;
      }
    }

    if (targetY - tempY <= 0) {
      instanY = tempY - targetY;
      if (instanY < targetHeight) {
        yFlag = 1;
      }
    } else {
      instanY = targetY - tempY;
      if (instanY < tempH) {
        yFlag = 1;
      }
    }



    if (xFlag === 1 && yFlag === 1) {
      // 发生碰撞了
      // return $('#' + tempID)[0];
      let xAxle1 = targetX + (targetWidth / 2),
          yAxle1 = targetY + (targetHeight / 2),
          xAxle2 = tempX + (tempW / 2),
          yAxle2 = tempY + (tempY / 2),
          con = $('#' + tempID)[0];
      
      // 根据中轴线判断这个块在容器的哪个地方，第一个为X第二个为Y
      if (xAxle1 < xAxle2) {
        resDirX = 1;
      } else {
        resDirX = 2;
      }

      if (yAxle1 < yAxle2) {
        resDirY = 1;
      } else {
        resDirY = 2;
      }
      resData = {
        container: con,
        dirX: resDirX,
        dirY: resDirY
      }
      break;
    }
  }
  return resData;
}