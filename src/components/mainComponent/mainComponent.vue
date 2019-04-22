<template>
  <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="100%"
      height="100%"
      version="1.1"
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      sodipodi:docname="绘图.svg">
      <defs
        id="defs2">
        <inkscape:path-effect
          effect="bspline"
          id="path-effect18"
          is_visible="true"
          weight="33.333333"
          steps="2"
          helper_size="0"
          apply_no_weight="true"
          apply_with_weight="true"
          only_selected="false" />
      </defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="0.35"
        inkscape:cx="-98.571429"
        inkscape:cy="560"
        inkscape:document-units="mm"
        inkscape:current-layer="layer1"
        showgrid="false"
        inkscape:window-width="1920"
        inkscape:window-height="1001"
        inkscape:window-x="-9"
        inkscape:window-y="-9"
        inkscape:window-maximized="1" />
      <metadata
        id="metadata5">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <!-- <circles
        v-for="(item) in $store.state.elInfo.circle"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></circles>
      <assist
        v-for="(item) in $store.state.elInfo.assist"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></assist>
      <condition
        v-for="(item) in $store.state.elInfo.condition"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></condition>
      <judge
        v-for="(item) in $store.state.elInfo.judge"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></judge>
      <noRefFunc
        v-for="(item) in $store.state.elInfo.noRefFunc"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></noRefFunc>
      <order
        v-for="(item) in $store.state.elInfo.order"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></order>
      <refFunc
        v-for="(item) in $store.state.elInfo.refFunc"
        :value="item.value"
        :y="item.y"
        :key="item.id"
        :model="false"
      ></refFunc> -->
      <noRefFunc
        v-for="item in svgList.noRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></noRefFunc>
      <refFunc
        v-for="item in svgList.refFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></refFunc>
      <circles
        v-for="item in svgList.circle"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
      ></circles>
      <judge
        v-for="item in svgList.judge"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
      ></judge>
      <assist
        v-for="item in svgList.assist"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></assist>
      <condition
        v-for="item in svgList.condition"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></condition>
      <order
        v-for="item in svgList.order"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></order>
    </svg>
</template>

<script>
import circles from '../logicAssets/circle/circle.vue'
import judge from '../logicAssets/judge/judge.vue'
import order from '../logicAssets/order/order.vue'
import condition from '../logicAssets/condition/condition.vue'
import noRefFunc from '../logicAssets/noRefFunc/noRefFunc.vue'
import assist from '../logicAssets/assist/assist.vue'
import { getSvgCenterPosi } from '../../utils/recommendUtils.js'
import { svgComponentOption } from '../../utils/shared/model.js'
export default {
  props: ['svgList'],
  components: {
    circles,
    judge,
    order,
    condition,
    noRefFunc,
    assist
  },
  mounted() {
    let container = this.$el;
    setTimeout(() => {
      let result = getSvgCenterPosi(container);

      let { x, y, scales } = result;

      container.getElementsByTagName('g')[0].setAttribute('transform', 'translate(' + x + ',' + y + ') scale(' + scales + ')');
    }, 10);
  }
}
</script>

<style lang="scss" scoped>

</style>
