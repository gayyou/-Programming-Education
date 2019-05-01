export function getTransform(target) {
  let transInfo = target.getAttribute('transform'),
      x = parseInt(transInfo.split('(')[1].split(',')[0]),
      y = parseInt(transInfo.split(',')[1].split(')')[0]);
  
  return {
    x,
    y
  }
}

export function getSvgWH(target) {
  let boxInfo = target.getBBox(),
      width = boxInfo.width,
      height = boxInfo.height;
  
  return {
    width,
    height
  }
}

export function getTypeAndID(target) {
  return {
    id: target.getAttribute('id'),
    type: target.getAttribute('data-type')
  }
}

export function setTransform(target, payLoad) {
  target.setAttribute('transform', 'translate(' + payLoad.x + ',' + payLoad.y + ')');
}

export function insertSort(list) {
  let i, j, k;

    for (i = 1; i < list.length; i++)
    {
        //为a[i]在前面的a[0...i-1]有序区间中找一个合适的位置
        for (j = i - 1; j >= 0; j--) {
          if (list[j].y < list[i].y) {
            break;
          }
        }

        //如找到了一个合适的位置
        if (j != i - 1) {
          //将比a[i]大的数据向后移
          let temp = list[i];
          for (k = i - 1; k > j; k--) {
            list[k + 1] = list[k];
          }
              
          //将a[i]放到正确位置上
          list[k + 1] = temp;
        }
    }
}

export function cloneSvgInfo(target, model) {
  let keys = Object.keys(model);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == 'contain') {
      target[keys[i]] = {};
      continue;
    }
    target[keys[i]] = model[keys[i]];
  }
}

export function getPathAttr(target) {
  let { type } = getTypeAndID(target);

  switch(type) {
    case 'circle': {
      return pathAttr.getCircleAttr(target);
    }
    case 'judge': {
      return pathAttr.getJudgeAttr(target);
    }
    case 'condition': {
      break;
    }
  }

  return null;
}


export function setPathAttr(target, param) {
  let { type } = getTypeAndID(target);

  switch(type) {
    case 'circle': {
      pathAttr.setCircleAttr(target, param);
      break;
    }
    case 'judge': {
      pathAttr.setJudgeAttr(target, param);
      break;
    }
    case 'condition': {
      break;
    }
  }
}

const pathAttr = {
  getJudgeAttr(model) {
    let outLine, currentY, firstBash, secondBash, textBash, currentSecondY, firstTime,
        { id, type } = getTypeAndID(model);
  
    outLine = model.getElementsByClassName('out-line')[0].getAttribute('d');
    currentY = currentY = model.getAttribute('data-currentY');
    firstBash = model.getAttribute('data-firstBash');
    textBash = model.getElementsByClassName('else')[0].getAttribute('transform')
    currentSecondY = model.getAttribute('data-currentSecondY');
    secondBash = model.getAttribute('data-secondBash');
    firstTime = model.getAttribute('data-firstTime');
  
    return {
      outLine,
      currentY,
      firstBash,
      currentSecondY,
      secondBash,
      textBash,
      firstTime,
      id,
      type
    }
  },

  getCircleAttr(model) {
    let currentY, currentBash, outLine,
        { id, type } = getTypeAndID(model);
  
    currentY = model.getAttribute('data-currentY');
    currentBash = model.getAttribute('data-currentBash');
    outLine = model.getElementsByClassName('out-line')[0].getAttribute('d');
  
    return {
      currentY,
      outLine,
      currentBash,
      id,
      type
    }
  },

  setCircleAttr(target, param) {
    target.setAttribute('data-currentY', param.currentY);
    target.setAttribute('data-currentBash', param.currentBash);
    target.getElementsByClassName('out-line')[0].setAttribute('d', param.outLine);
  },

  setJudgeAttr(target, param) {
    console.log(param.outLine)
    console.log(param.textBash)
    target.getElementsByClassName('out-line')[0].setAttribute('d', param.outLine);
    target.getElementsByClassName('else')[0].setAttribute('transform', param.textBash);
    target.setAttribute('data-currentY', param.currentY);
    target.setAttribute('data-firstBash', param.firstBash);
    target.setAttribute('data-secondBash', param.secondBash);
    target.setAttribute('data-firstTime', param.firstTime);
    target.setAttribute('data-currentSecondY', param.currentSecondY);
  }
}

