export function getSvgCenterPosi(container) {
  let $parent = $(container).parent();
  let conW = $parent.width(),
      conH = $parent.height();
  // console.log(parent)
  let containG = container.getElementsByTagName('g')[0],
      targetConfig = containG.getBBox(),
      tarW = targetConfig.width,
      tarH = targetConfig.height;
    let scales;

  if (tarH > conH) {
    scales = conH / (tarH) * 0.9;
  } else {
    scales = tarH / (conH) * 0.9;
  }
   
  tarW = tarW * scales;
  tarH = tarH * scales;

  let x = (conW - tarW) / 2;
  let y = (conH - tarH) / 2;

  return {
    x,
    y,
    scales,
  }
}