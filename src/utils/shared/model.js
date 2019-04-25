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

export function componentListMixin(conObj) {
  svgComponentOption.forEach((value) => {
    conObj[value] = [];
  })
}

export function listPush(list, type, item) {
  if (type == 'circle' || type == 'judge') {
    // 如果是判断语句或者选择语句，需要特殊照顾
    item.contain = [];
    item.hasCdn = false;
    
    list[type].push(item);
  } else {
    list[type].push(item)
  }
  this.$store.state.isRenew = !this.$store.state.isRenew;
}

