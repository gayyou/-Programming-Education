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
  'longRightRef'
]

export const svgContainer = [
  'judge',
  'circle'
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
    'compare_tow_num'
  ],
  assit: [
    'delay_ms',
    'set_x'
  ]
}

function getJudgeStn(item) {
  let cutLineY = item.svgOptions.textBash,
      { contain } = item,
      keys = Object.keys(contain),
      ifResult = null, elseResult = null;

  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < contain[keys[i]].length; j++) {
      if (contain[keys[i]][j].y <= cutLineY) {

      } else {

      }
    }
  }

  
}

function getWhileStn(item) {

}

function getSentence(item) {
  let { type } = item,
      resultData = {};

  switch(type) {
    case 'judge': {
      resultData = getJudgeStn(item);
      break;
    }
    
    case 'while': {
      resultData = getWhileStn(item);
      break;
    }

    default: {
      
    }
  }
}

export function formatData(targetItem) {
  return codeItem(targetItem, 1);
}


function codeList(list, nestLevel) {
  let data = [];
  
  svgComponentOption.forEach((value) => {
    for (let i = 0; i < list[value].length; i++) {
      data.push(codeItem(list[value][i], nestLevel));
    }
  });

  return data;
}

function codeItem(item, nestLevel) {
  let argsStr = '';

  if (item.value[1]) {
    for (let i = 0; i < item.value[1].length; i++) {
      argsStr += item.value[1][i];
      if (i < item.value[1].length - 1) {
        argsStr += ','
      }
    }
  }

  return {
    type: item.type,
    tab: nestLevel,
    ops: item.func ? item.func + '(' + argsStr + ')' : null,
    condition: null,
    children: item.contain ? codeList(item.contain, nestLevel + 1) : null
  }
}