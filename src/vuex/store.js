import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state ={
    
    count:1,
    impData:{
            "xData": ["06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17"],
            "yData": [34, 38, 30, 28, 45, 49, 37]
    },
    echartData:{
        "day": {
          "xData": ["06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17"],
          "yData": [34, 38, 30, 28, 45, 49, 37]
        },
        "week": {
          "xData": ["31周","32周","33周","34周","35周","36周","37周"],
          "yData": [210, 247, 279, 258, 186, 171, 230]
        },
        "month": {
          "xData": ["1月","2月","3月","4月","5月","6月","7月"],
          "yData": [876,802,878,861,759,871,832]
        }
      }
}
const mutations={
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    },
    select(state,type) {
        state.impData = state.echartData[type];
         console.log(state.impData);
      }
}
export default new Vuex.Store({
    state,mutations
})