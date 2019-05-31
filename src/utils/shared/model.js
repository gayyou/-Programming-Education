import { getAllChildren, insertSort } from './utils'

/**
 * 当前组件的名称配置,
 * @see 特别注意到circle和judge是在最后两位进行的
 */
export const svgComponentOption = [
  'condition',
  'order',
  'assist',
  'noRefFunc',
  'refFunc',
  'circle',
  'judge',
  'doubleRef',
  'longRefFunc',
  'longRightRef',
  'inOrder'
]

export const svgContainer = [
  'judge',
  'circle',
  'inOrder'
]

// 存储函数名，可用来校验
export const funcName = {
  move: [
    'move_ahead',
    'move_behind',
    'move_left',
    'move_right'
  ],
  eleLev: [
    'set_hight',
    'set_low'
  ],
  photo: [
    'take_photo',
    'show_photo'
  ],
  armOperate: [
    'open_arm',
    'close_arm',
    'move_arm_high_up',
    'move_arm_high_down',
    'move_arm_low_up',
    'move_arm_low_down',
    'move_arm_left',
    'move_arm_right',
  ],
  condition: [
    'check_thing',
    'compare_tow_num',
    'check_thing'
  ],
  assit: [
    'delay_ms',
    'set_x'
  ]
}


/**
 * 
 * @param {*} item Judge的item
 * @param {*} tabLevel 
 * @param {Array} ifResult 这个是最终要返回的数组，因为调用这个是调用找到
 */
function getJudgeStn(item, tabLevel) {
  let cutLineY = item.svgOptions.textBash,
      { contain } = item,
      childList = getAllChildren(contain),
      elseObj = null, ifChildArr = [];

  insertSort(childList);  // 排序

  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    // 这里的思路是先根据它的textbash判断哪些执行语句是在if还是else，然后在这里先用for循环将一层拿出来，如果有二层的，就要调用codeList
    if (childList[i].y <= cutLineY) {
      // 将if语句拿出来
      ifChildArr.push(codeItem(childList[i], tabLevel + 1));   // 层级 + 1
    } else {
      // 将else执行语句拿出来
      if (elseObj == null) {
        elseObj = {
          type: 'else',
          tab: tabLevel,
          ops: null,
          condition: null,
          children: []
        }
      }
      elseObj.children.push(codeItem(childList[i], tabLevel + 1));
    }
  }

  if (ifChildArr.length && elseObj) {
    ifChildArr.push(elseObj);
  }
  
  return ifChildArr;
}

function getWhileStn(item, tabLevel) {
  let { contain } = item,
      childList = getAllChildren(contain),
      data = [];

  insertSort(childList);
  console.log('childList', childList);
  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    data.push(codeItem(childList[i], tabLevel + 1));
  }

  return data;
}

function getSentence(item, tabLevel) {
  let { type } = item,
      resultData = [];
      switch(type) {
        case 'judge': {
          resultData = getJudgeStn(item, tabLevel);
          break;
        }
        
        case 'circle': {
          resultData = getWhileStn(item, tabLevel);
          break;
        }
    
        default: {
          // let 
          // resultData.push(codeItem(item.contain[value][i], nestLevel))
          
        }
      }

  return resultData;
}

export function formatData(targetItem) {
  return codeItem(targetItem, 0);
}


// function codeList(list, nestLevel) {
//   let data = [];
  
//   svgComponentOption.forEach((value) => {
//     for (let i = 0; i < list[value].length; i++) {
//       data.push(codeItem(list[value][i], nestLevel));
//     }
//   });

//   return data;
// }

function codeItem(item, nestLevel) {
  let argsStr = '',
      type = item.type,
      condition = null;

  if (item.value[1]) {
    for (let i = 0; i < item.value[1].length; i++) {
      argsStr += item.value[1][i];
      if (i < item.value[1].length - 1) {
        argsStr += ','
      }
    }
  }

  switch(type) {
    case 'judge': {
      type = 'if'
      if (item.contain.condition.length == 1) {
        condition = item.contain.condition[0].value[1][0]
      }
      break;
    }

    case 'circle': {
      type = 'while'
      if (item.contain.condition.length == 1) {
        condition = item.contain.condition[0].value[1][0]
      }
      break;
    }

    default: {
      type = null
    }
  }

  return {
    type: type,
    tab: nestLevel,
    ops: item.func ? item.func + '(' + argsStr + ')' : null,
    condition: condition,
    children: item.contain ? getSentence(item, nestLevel) : []
  }
}

/**
 * 
 * @param {} advice 
 */
export function dataToView(advice) {
  return viewItem(advice);
}

function viewItem(codeItem) {
  
}

