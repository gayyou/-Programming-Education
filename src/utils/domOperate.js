/**
 * @description 将目标节点移动到目标容器中
 * @param {Dom || jQueryDom} target 目标Dom节点或者jq节点
 * @param {Dom || jQueryDom} container 容器的Dom节点或者jq节点
 */
export function toContainer(target, container) {
  let $target = $(target);
  let $container = $(container);
  $container.append($target);
}

export function toAfterDom(target, markDom) {
  let $target = $(target),
      $markDom = $(markDom);
  $markDom.after($target);
}

export function toBeforeDom(target, markDom) {
  let $target = $(target),
      $markDom = $(markDom);
  $markDom.before($target);
}

export function deleteDom(target) {
  $(target).remove();
}

export function copyDom(target) {

}