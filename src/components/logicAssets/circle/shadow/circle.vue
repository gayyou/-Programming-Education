<template>
  <g
    data-type="circle"
    id="circleSha"
    :transform="'translate(24,'+ y +')'"
  >
    <g>
      <path class="st0 out-line" d="M184.2,0H12C5.4,0,0,5.4,0,12v36v24v12c0,6.6,5.4,12,12,12h62c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h156.2c13.3,0,24-10.7,24-24v0C208.2,10.7,197.4,0,184.2,0z"/>
    </g>
  </g>
</template>

<script>
export default {
  props: ['y']
}
</script>


<style lang="scss" scoped>
.st0{fill:#e2e2e2;}
</style>
