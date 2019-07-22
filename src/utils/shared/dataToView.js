import { 
  renewWhileOption,
  renewJudgeOption
} from '../svgOperate/options'

/**
 * 
 * @param {String} type 创建
 */
function createOption(type) {
  return type == 'while' ? Object.assign(renewWhileOption) : Object.assign(renewJudgeOption);
}

const funcMountCom = {
  'condition': [
    'check_thing'
  ],
  'order': [
    'delay_ms'
  ],
  'assist': [
    'open_arm', 
    'close_arm'
  ],
  'noRefFunc': [],
  'refFunc': [],
  'circle': [],
  'judge': [],
  'doubleRef': [
    'move_ahead', 
    'move_behind', 
    'move_left', 
    'move_right'
  ],
  'longRefFunc': [
    'set_height', 
    'set_low'
  ],
  'longRightRef': [
    'move_arm_high_up', 
    'move_arm_high_down', 
    'move_arm_low_up', 
    'move_arm_low_down', 
    'move_arm_left', 
    'move_arm_right'
  ],
  'inOrder': []
}

const funcValue = {
  'move_arm_high_up': ['机械臂上臂向上摆动', '度'], 
  'move_arm_high_down': ['机械臂上臂向下摆动', '度'], 
  'move_arm_low_up': ['机械臂下臂向上摆动', '度'], 
  'move_arm_low_down': ['机械臂下臂向下摆动', '度'], 
  'move_arm_left': ['机械臂向左摆动', '度'], 
  'move_arm_right': ['机械臂向左摆动', '度'],
  'move_ahead': ['向前移动', '速度', '秒'], 
  'move_behind': ['向后移动', '速度', '秒'], 
  'move_left': ['向左移动', '速度', '秒'], 
  'move_right': ['向右移动', '速度', '秒'],
  'set_height': ['将', '引脚置为高电平'],
  'set_low': ['将', '引脚置为低电平'],
  'open_arm': ['合并机械臂'], 
  'close_arm': ['松开机械臂'],
  'delay_ms': ['延时', '秒'],
  'check_thing': ['前方存在障碍物']
}

let count = 0;

function getRecID() {
  return 'recEl' + count++;
}

/**
 *
 * @param {} advice 
 */
export function dataToView(advice) {
  return viewItem(advice, 1);
}


function viewItem(codeItem, posiY) {
  let keys = Object.keys(funcMountCom),
      type = codeItem.type,
      func = codeItem.ops !== null ? codeItem.ops.split('(')[0] : null,
      param = codeItem.ops !== null ? codeItem.ops.split('(')[1].split(')')[0].split(',') : null,
      viewName,
      isContain = false,
      blockText = func !== null ? funcValue.func : null;
      
  if (type) {
    switch(type) {
      case 'if': {
        viewName = 'judge';
        isContain = true;
        break;
      }

      case 'while': {
        viewName = 'circle';
        isContain = true;
        break;
      }

      case 'else': {
        viewName = 'else';
        isContain = true;
        break;
      }
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < funcMountCom[keys[i]].length; j++) {
        if (funcMountCom[keys[i]][j] == func) {
          viewName = keys[i];
          break;
        }
      }
    }
  }

  return isContain ? {
    id: getRecID(),
    type: viewName,
    // value: value,
    y: posiY,
    svgOptions: createOption(type),
    hasCdn: 'getCdnName(codeItem)',
    contain: codeItem.children.length ? getChildren(codeItem) : null
  } : {
    id: getRecID(),
    func: func,
    y: posiY,
    value: [blockText, param],
  }
}

function getChildren(codeItem) {
  let getWhile = (codeItem) => {
    let y = 0.1,
        resultArr = [];
    for (let i = 0; codeItem.children.length; i++) {
      console.log(codeItem)
      resultArr.push(viewItem(codeItem.children[i], 0.1));
      y += 0.1;
    }
  }

  let getJudge = (codeItem) => {
    let y = 0.1,
        resultArr = [];
    for (let i = 0; codeItem.children.length; i++) {
      if (codeItem.children[i].type == 'else') {
        resultArr = [...resultArr, ...viewItem(codeItem.children[i]).contain, y + renewJudgeOption.textBash];
      } else {
        resultArr.push(viewItem(codeItem.children[i]));
      }
      y += 0.1;
    }
    return resultArr;
  }

  switch(codeItem.type) {
    case 'if': {
      return getJudge(codeItem)
    }

    case 'while': {
      return getWhile(codeItem)
      break;
    }

    default: console.log('错误')
  }
}


console.log(dataToView({"type":"if","tab":"0","ops":null,"condition":"True","children":[{"type":null,"tab":"1","ops":null,"condition":null,"children":[]},{"type":null,"tab":"1","ops":"move_ahead(6,60)","condition":null,"children":[]},{"type":null,"tab":"1","ops":"move_left(4,40)","condition":null,"children":[]},{"type":null,"tab":"1","ops":"move_ahead(4,60)","condition":null,"children":[]},{"type":null,"tab":"1","ops":"move_arm_high_down(67)","condition":null,"children":[]}]}))