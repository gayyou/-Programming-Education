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



// export class CodeData {
//   constructor(targetItem) {
//     this.data = new CodeItem(targetItem, 1);
//   }
// }

export function formatData(targetItem) {
  return codeItem(targetItem, 1);
}

// class CodeList {
//   constructor(list, nestLevel) {
//     this.data = []
//     svgComponentOption.forEach((value) => {
//       for (let i = 0; i < list[value].length; i++) {
//         this.data.push(new CodeItem(list[value][i], nestLevel));
//       }
//     })
//   }
// }

function codeList(list, nestLevel) {
  let data = [];
  
  svgComponentOption.forEach((value) => {
    for (let i = 0; i < list[value].length; i++) {
      data.push(codeItem(list[value][i], nestLevel));
    }
  });

  return data;
}

// class CodeItem {
//   constructor(item, nestLevel) {
//     this.data = {
//       type: item.type,
//       tab: nestLevel,
//       ops: item.func,
//       condition: null,
//       children: item.contain ? new CodeList(item.contain, nestLevel + 1) : null
//     }
//   }
// }

function codeItem(item, nestLevel) {
  return {
    type: item.type,
    tab: nestLevel,
    ops: item.func,
    condition: null,
    children: item.contain ? codeList(item.contain, nestLevel + 1) : null
  }
}