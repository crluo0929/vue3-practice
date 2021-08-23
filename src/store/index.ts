import { createStore } from 'vuex'
import axios from 'axios'
import personStore from './personStore'

export default createStore({
  // strict: true,  //don't use it in production mode
  state: {
    count : 1,
    randomList:[1] as number[]
  },
  actions: { //dispatch('addRandomNumber',data_counts)
    addRandomNumber(context, data_counts){
      const api = axios.create({
        baseURL : "https://random-data-api.com/api",
        timeout : 2000
      })
      api.get("/number/random_number",{
        params : { size : data_counts }
      })
        .then(resp=>{
          context.commit('ADD_NUMBER',resp.data[0].non_zero_number)
        })
        .catch(err=>{console.log(err)})
    },
    resetCount(context, init_value){
        context.commit('RESET_COUNT', init_value)
    }
  },
  mutations: {
    ADD_NUMBER(state,value){
      state.count+=value
      state.randomList.push(value)
    },
    RESET_COUNT(state,value){
      state.count = value
      state.randomList.length = 0
      state.randomList.push(value)
    }
  },
  getters: {
    time10(state){
      return state.count*10
    }
  },
  modules: {
    personStore
  }
})
