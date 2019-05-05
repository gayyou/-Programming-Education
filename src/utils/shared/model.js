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
]

export const svgContainer = [
  'judge',
  'circle'
]

export class CodeData {
  constructor(targetItem) {
    this.data = new CodeItem(targetItem, 1);
    console.log(this.data);
  }
}

class CodeList {
  constructor(list, nestLevel) {
    this.data = []
    svgComponentOption.forEach((value) => {
      for (let i = 0; i < list[value].length; i++) {
        this.data.push(new CodeItem(list[value][i], nestLevel));
      }
    })
  }
}

class CodeItem {
  constructor(item, nestLevel) {
    this.data = {
      type: item.type,
      tab: nestLevel,
      ops: null,
      condition: null,
      children: item.contain ? new CodeList(item.contain, nestLevel + 1) : null
    }
  }
}