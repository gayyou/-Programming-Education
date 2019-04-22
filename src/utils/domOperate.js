/**
 * @author Weybn
 * @version 1.0.0
 * @description 将目标节点的信息数据进行转移，用处在嵌套或者分离的时候进行使用
 * @param {Dom} target 目标节点
 * @param {Dom} crashTarget 容器节点
 * @param {List} fromList 目标节点所在列表
 * @param {List} toList 容器节点所在列表
 */
export function toContainer(target, crashTarget,fromList, toList) {
  let id = target.getAttribute('id'),
      type = target.getAttribute('data-type'),
      conID = crashTarget.getAttribute('id'),
      // conType = crashTarget.getAttribute('data-type'),
      move = null;
      
  for (let i = 0; i < fromList[type].length; i++) {
    if (fromList[type][i].id == id) {
      move = fromList[type][i];
      fromList[type].splice(i, 1);
    }
  }

  for (let i = 0; i < toList.length; i++) {
    if (conID == toList[i].id) {
      toList[i].contain[type].push(move);
    }
  }

  // 更新视图层，防止数组增加后并没有渲染
  this.$store.state.isRenew = !this.$store.state.isRenew;
}