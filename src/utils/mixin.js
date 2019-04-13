/**
 * @description 混入模式，将这个可移动的组件添加一个点击事件,点击将全局的拖拽对象moveTarget赋值为这个组件
 * @param {vueComponent} context 组件的对象，即这个组件内部的上下文对象
 */
export function eventMixin(context) {
  context.$el.onmousedown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    context.$store.state.moveTarget = context.$el;
  }
}

/**
 * @description 初始化的时候，将这个对象进行存入到列表中.
 * @param {DOM} el 组件的
 */
export function initMixin(component) {
  let that = component;
  let target = that.$el,
      list = that.$store.state.canvasList,
      targetInfo = target.getBBox(),
      ID = 'el' + that.$store.state.elCount,
      width = targetInfo.width,
      height = targetInfo.height,
      targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);

  // 为这个组件设置id，先自增
  component.$el.setAttribute('id', 'el' + that.$store.state.elCount);
  that.$store.state.elCount++;

  list.push({
    x: targetX,
    y: targetY,
    width: width,
    height: height,
    id: ID
  })
}

export function createModelMixin(that) {
  // console.log(that)
  let target = that.$el,
      type = target.getAttribute('data-type'),
      targetTrans = target.getAttribute('transform'),
      targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
      targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);
  
  
  target.onmousedown = (event) => {
    let target = that.$el,
        type = target.getAttribute('data-type'),
        targetTrans = target.getAttribute('transform'),
        targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
        targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);
    event.preventDefault();
    // 根据点击的对象，将点击的对象的所有属性都放在$store的model属性中，然后在fake层新添一个svg进行拖拽
    that.$store.state.model.value = that.value;
    that.$store.state.model.y = targetY;
    that.$store.state.model.x = targetX;
    that.$store.state.model.type = type;
    console.log(type)
    that.$store.state.elInfo[type].push({
      value: that.value,
      y: targetY
    })

    setTimeout(() => {
      let fakeTarget = $('#fake-' + type)[0];
      that.$store.state.fakeTarget = fakeTarget;
      that.$store.state.moveTarget = $('#main-svg-container .' + type)[$('#main-svg-container .' + type).length - 1];
    }, 0);
  }
}