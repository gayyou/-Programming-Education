import { listPush } from './shared/model.js'
/**
 * @description 混入模式，将这个可移动的组件添加一个点击事件,点击将全局的拖拽对象moveTarget赋值为这个组件
 * @param {vueComponent} that 组件的对象，即这个组件内部的上下文对象
 */
export function eventMixin(that) {
  that.$el.onmousedown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    that.$store.state.moveTarget = that.$el;
    setMouseDownInit(event, that);
  }
}

/**
 * @description 初始化的时候，将这个对象进行存入到列表中.
 * @param {DOM} el 组件的
 */
export function initMixin(that) {
  // let target = that.$el;

  // 为这个组件设置id，先自增
  // target.setAttribute('id', 'el' + that.$store.state.elCount);
  // that.$store.state.elCount++;
}

export function createModelMixin(that) {
  // console.log(that)
  let target = that.$el;
  
  target.onmousedown = (event) => {
    // 获取信息
    let target = that.$el,
        list = that.$store.state.canvasList,
        type = target.getAttribute('data-type'),
        targetTrans = target.getAttribute('transform'),
        targetInfo = target.getBBox(),
        width = targetInfo.width,
        height = targetInfo.height,
        targetX = parseInt(targetTrans.split('(')[1].split(',')[0]),
        targetY = parseInt(targetTrans.split(',')[1].split(')')[0]);

    event.preventDefault();
    // 根据点击的对象，将点击的对象的所有属性都放在$store的model属性中，然后在fake层新添一个svg进行拖拽
    that.$store.state.model.value = that.value;
    that.$store.state.model.y = targetY;
    that.$store.state.model.x = targetX;
    that.$store.state.model.type = type;
    console.log('创建一个对象')
    // that.$store.state.elCount++;

    let ID = 'el' + that.$store.state.elCount++;   // 这里只是进行引用id，实际上还没有进行生成组件，只是提前用了，真正生成组件的是调用listPush方法，并且在上面的initMixin方法里面生成并赋值

    // 新节点
    let newItem = {
      x: targetX,
      y: targetY,
      width: width,
      height: height,
      id: ID,
      value: that.value
    };
    
    // 列表的插入 操作
    listPush.bind(that)(list, type, newItem);

    setTimeout(() => {
      // console.log(that)
      let fakeTarget = $('#fake-' + type)[0];
      let targetList = $('#main-svg-container>.' + type);

      // 设置鼠标初始化
      setMouseDownInit(event, that);
      that.$store.state.fakeTarget = fakeTarget;
      that.$store.state.moveTarget = targetList[targetList.length - 1];
    }, 0);
  }
}

const setMouseDownInit = (event, that) => {
  that.$store.state.mouse.x = event.clientX;
  that.$store.state.mouse.y = event.clientY;
  setTimeout(() => {
    // 点击时候赋值，这是本次循环中进行赋值，但是这个store真正有赋值到的是下个事件循环的时候才能拿到。
    // 在每个元素都会混入让movetarget指向一个块，但是这个变量是在本次事件循环赋值，并不知道快慢，所以只有等到下个事件循环的时候才进行判断
    // 所以需要用setTimeout等到下个事件循环的时候进行查询
    if (!that.$store.state.moveTarget) {
      return ;
    }
    let transform = that.$store.state.moveTarget.getAttribute('transform');
    that.$store.state.bashX = parseInt(transform.split('(')[1].split(',')[0]);
    that.$store.state.bashY = parseInt(transform.split(',')[1].split(')')[0]);
  }, 0);
}