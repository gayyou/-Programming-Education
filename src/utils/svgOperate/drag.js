import { nestWhileOperate, nestJudgeOperate } from './changeSvgContainer.js'
/**
 * 
 * @param {*} target 
 * @param {*} crashTarget 
 * @param {*} list 
 * @param {*} args 
 */
export function nestOperate(target, crashResult, list, args) {
  let type = crashResult.container.getAttribute('data-type');
  switch(type) {
    case 'circle': {
      nestWhileOperate.call(this, target, crashResult.container, list);
      break;
    }
    case 'judge': {
      // 这里会有一个bug，就是先在else语句中添加语句的话，继续添加的if语句中的块，会出差错，原因是else的块没有进行处理
      if (crashResult.dirY == 1) {
        nestJudgeOperate.call(this, target, crashResult.container, list, true);
      } else {
        nestJudgeOperate.call(this, target, crashResult.container, list, false);
      }
      break;
    }
  }
}

/**
 * @param 
 * @param {*} target 
 * @param {*} fromList 
 * @param {*} toList 
 */
export function spiltOperate(target, conTarget, fromList, toList) {
  let type = target.getAttribute('data-type'),
      id = target.getAttribute('id'),
      conTranInfo = conTarget.getAttribute('transform'),
      bashX = parseInt(conTranInfo.split('(')[1].split(',')[0]),
      bashY = parseInt(conTranInfo.split(',')[1].split(')')[0]);

  
  for (let i = 0; i < fromList[type].length; i++) {
    if (fromList[type][i].id === id) {
      fromList[type][i].x = bashX + fromList[type][i].x;
      fromList[type][i].y = bashY + fromList[type][i].y;
      
      toList[type].push(fromList[type].splice(i, 1));
      this.$store.state.isRenew = !this.$store.state.isRenew;
    }
  }
}