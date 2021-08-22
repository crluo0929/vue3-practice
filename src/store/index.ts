import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    count : 1,
    randomList:[] as number[]
  },
  actions: { //dispatch('addRandomNumber',max_value)
    addRandomNumber(context, max_value){
      const api = axios.create({
        // baseURL : "https://csrng.net",
        timeout : 2000
      })
      api.get("/csrng/csrng.php",{
        params : { min: 0, max: max_value }
      })
        .then(resp=>{
          context.commit('ADD_NUMBER',resp.data[0].random)
        })
        .catch(err=>{console.log(err)})
    }
  },
  mutations: {
    ADD_NUMBER(state,value){
      state.count+=value
      state.randomList.push(value)
    }
  },
  getters:{
    time10(state){
      return state.count*10
    }
  },
  modules: {
  }
})
