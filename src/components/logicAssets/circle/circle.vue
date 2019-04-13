<template>
<g
  class="circle"
  data-type="circle"
  transform="translate(20,40)"
  data-currentY="24"
>
	<g>
		<path class="st0 out-line" d="M184.2,0H12C5.4,0,0,5.4,0,12v36v24v12c0,6.6,5.4,12,12,12h62c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28
			c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h156.2c13.3,0,24-10.7,24-24v0C208.2,10.7,197.4,0,184.2,0z"/>
    <polygon class="st1" points="172.2,11.4 148.2,11.4 136.2,24.4 148.2,37.4 172.2,37.4 184.2,24.4 	"/>
	  <text transform="matrix(1 0 0 1 23.3337 30.7092)" class="st2 st3 st4">重复执行直到</text>
	</g>
</g>
</template>

<script>
import { eventMixin, initMixin, createModelMixin } from '../../../utils/mixin.js'
import noRefFunc from '../noRefFunc/noRefFunc.vue'
export default {
  components: {
    noRefFunc
  },
  props: ['model', 'y', 'value'],
  mounted() {
    if (this.model) {
      createModelMixin(this)
    } else {
      eventMixin(this);
      initMixin(this);
    }
  }
}
</script>

<style lang="scss" scoped>
.st0{fill:#57BFC3;}
.st1{fill:#1B8F8F;}
.st2{fill:#FFFFFF;}
.st3{font-family:'MicrosoftYaHei';}
.st4{font-size:18px;}
</style>
