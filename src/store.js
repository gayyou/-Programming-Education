import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCode: true,
    elCount: 0,
    comCount: 0,
    moveTarget: null,
    fakeTarget: null,
    model: {
      x: null,
      y: null,
      type: null,
      value: null
    },
    bashX: 0,
    bashY: 0,
    mouse: {
      x: null,
      y: null,
    },
    canvasList: [

    ],
    elInfo: {
      circle: [
        
      ],
      condition: [

      ],
      judge: [

      ],
      order: [

      ],
      assist: [

      ],
      noRefFunc: [

      ],
      refFunc: [
        
      ],
    },
    leftStatus: 1
  },
  mutations: {

  },
  actions: {

  }
})
