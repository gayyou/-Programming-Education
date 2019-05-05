import { svgComponentOption } from '../shared/model.js'
import { getTypeAndID, getSvgWH, getTotalPosi } from '../shared/utils.js'
import { isSvgContainer } from '../shared/typeCheck'

/**
 * @description 判断是否碰撞了，返回碰撞的一个对象，对象的内容有 碰撞对象、碰撞部分
 * @param {*} target 
 * @param {*} list 
 * @returns { container, dirX, dirY } container为容器，dirX有两个值 1 为左边，2为右边,dirY有两个值，1为上方，2为下方
 */
export function isCrash(target, rootList, payload) {
  let resData = null;
  resData = checkCrash(target, rootList, rootList, payload);

  console.log('resData', resData);

  return resData;
}

function checkCrash(target, list, rootList, beforeChangeSizeCon) {
  let { id: targetID } = getTypeAndID(target),
      { x: targetX, y: targetY } = getTotalPosi(target, rootList);

  let tempX, tempY, tempW, tempH, tempID;
  let xFlag, yFlag,
      keys = Object.keys(list);

  for (let i = 0; i < keys.length; i++) {
    if (!isSvgContainer(keys[i])) {
      console.log('不是容器', keys[i])
      // 不是容器的话，跳过
      continue;
    }

    for (let j = 0; j < list[keys[i]].length; j++) {
      let item = list[keys[i]][j];

      if (item.id == targetID) {
        continue;
      }

      xFlag = 0;
      yFlag = 0;

      tempW = item.width;
      tempH = item.height;
      tempID = item.id;

      if (list == rootList) {
        // 区分碰撞的容器是否在根目录下，不在的话需要进行获取绝对坐标
        tempX = item.x;
        tempY = item.y;
      } else {
        let con = $('#' + tempID)[0];
        let { x: conX, y: conY } = getTotalPosi(con, rootList);
        tempX = conX;
        tempY = conY;
      }

      if (beforeChangeSizeCon && tempID == beforeChangeSizeCon.id && beforeChangeSizeCon.isUsed == false) {
        tempW = beforeChangeSizeCon.width;
        tempH = beforeChangeSizeCon.height;
        beforeChangeSizeCon.isUsed = true;
      }

      if (targetX - tempX > 0 && targetX - tempX < 24) {
        xFlag = 1;
      }

      if (targetY - tempY > 0 && targetY - tempY < tempH) {
        if (targetY - tempY < tempH / 2) {
          yFlag = 0;
        } else {
          yFlag = 1;
        }
      }

      if (xFlag == 1) {
        return {
          container: $('#' + tempID)[0],
          dirX: xFlag,
          dirY: yFlag
        }
      }

      if (item.contain) {
        // 递归遍历
        let result = checkCrash(target, list[keys[i]][j].contain, rootList, beforeChangeSizeCon);

        if (result) {
          return result;
        }
      }
    }
  }

  // 找不到，返回空指针
  return null;
}



// /**
//  * @description 检测是否发生碰撞
//  * @param {*} target 检测的目标
//  * @param {*} list 检测的列表
//  */
// function checkCrash(target, list, payload) {
//   let { x: targetX, y: targetY } = getTransform(target),
//       { id: targetID } = getTypeAndID(target),
//       { width: targetWidth, height: targetHeight } = getSvgWH(target);
      
//   let tempX, tempY, tempW, tempH, tempID;
//   let xFlag, yFlag, instanX, instanY, resDirX = 0, resDirY = 0, resData = null;

//   if (payload && payload.isUsed == false) {
//     targetX += payload.x;
//     targetY += payload.y;
//   }

//   for (let i = 0; i < list.length; i++) {
//     xFlag = 0;
//     yFlag = 0;
//     tempX = list[i].x;
//     tempY = list[i].y;
//     tempW = list[i].width;
//     tempH = list[i].height;
//     tempID = list[i].id;

//     if (payload && tempID == payload.id && payload.isUsed == false) {
//       tempW = payload.width;
//       tempH = payload.height;
//       payload.isUsed = true;
//     }

//     if (tempID == targetID) {
//       continue;
//     }

//     if (targetX - tempX <= 0) {
//       instanX = tempX - targetX;
//       // 当目标在列表当前项的左方的时候，判断x的绝对值是否小于目标的宽度，小于的话xFlag为1
//       if (instanX < targetWidth) {
//         // 判断是否在右半部
//         xFlag = 1;
//       }
//     } else {
//       // 右方则要判断是否小于列表中的大小
//       instanX = targetX - tempX;
//       if (instanX < tempW) {
//         // 当目标已经移动到目标的左边
//         xFlag = 1;
//       }
//     }

//     if (targetY - tempY <= 0) {
//       instanY = tempY - targetY;
//       if (instanY < targetHeight) {
//         yFlag = 1;
//       }
//     } else {
//       instanY = targetY - tempY;
//       if (instanY < tempH) {
//         yFlag = 1;
//       }
//     }



//     if (xFlag === 1 && yFlag === 1) {
//       // 发生碰撞了
//       let xAxle1 = targetX + (targetWidth / 2),
//           yAxle1 = targetY + (targetHeight / 2),
//           xAxle2 = tempX + (tempW / 2),
//           yAxle2 = tempY + (tempY / 2),
//           con = $('#' + tempID)[0];
      
//       // 根据中轴线判断这个块在容器的哪个地方，第一个为X第二个为Y
//       if (xAxle1 < xAxle2) {
//         resDirX = 1;
//       } else {
//         resDirX = 2;
//       }

//       if (yAxle1 < yAxle2) {
//         resDirY = 1;
//       } else {
//         resDirY = 2;
//       }
//       resData = {
//         container: con,
//         dirX: resDirX,
//         dirY: resDirY
//       }
//       break;
//     }
//   }
//   return resData;
// }