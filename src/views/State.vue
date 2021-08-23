<template>
    <div>
        <h1>Vuex</h1>
        <button class="btn btn-primary margin5" @click="addRandom(1)">隨機增加數字</button><br>
        <!-- <button class="btn btn-primary margin5" @click="addNumber()">增加數字</button>數字:<input type="number" style="width:50px;" v-model="inputNumber" /><br> -->
        <button class="btn btn-primary margin5" @click="addNumber(inputNumber)">增加數字</button>數字:<input type="number" style="width:50px;" v-model="inputNumber" /><br>
        <button class="btn btn-primary margin5" @click="resetCount(inputNumber)">重設值為</button>數字:<input type="number" style="width:50px;" v-model="inputNumber" /><br>
        目前總和: {{ count }}<br>
        歷史紀錄: <span v-for="item,index in randomList" :key="index">{{ index==0 ? '' : '+' }}{{ item }}</span><br>
        <!-- 10倍總和: {{ store.getters.time10 }}<br> -->
        <!-- 10倍總和: {{ time10 }}<br> -->
        10倍總和: {{ time10() }}<br>
        <hr>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs} from 'vue'
import { useStore, mapMutations, mapGetters, mapActions } from 'vuex'

export default defineComponent({
    name: 'State',
    setup() {
        let store = useStore() 
        let inputNumber = ref(0)

        //actions
        //自己寫store.dispatch
        // function addRandom(){
        //     store.dispatch('addRandomNumber',10)
        // }
        // function resetCount(){
        //     store.dispatch('resetCount', inputNumber.value)
        // }

        //mutations
        //自己寫store.commit
        // function addNumber(){
        //     store.commit('ADD_NUMBER', inputNumber.value)
        // }

        //state
        //自己寫computed從sotre.state取資料
        // let count = computed(()=>{
        //     return store.state.count
        // })
        // let randomList = computed(()=>{
        //     return store.state.randomList
        // })

        //getters
        //自己寫computed從getters取值
        // let time10 = computed(()=>{ 
        //     return store.getters.time10
        //  })
        
        // console.log(isReactive(store.state))  //true
        // console.log(isRef(store.state))  //false
        // console.log(isReactive(store.getters))  //false
        // console.log(isRef(store.getters))  //false

        return {
            inputNumber,
            // store, 
            
            //===state===
            //count, randomList
            //有toRefs，就不太需要 mapState 了
            ...toRefs(store.state), //store.state is reactive

            //===actions===
            // addRandom, resetCount, //手動寫function呼叫store.dispatch  @click="addNumber"
            ...mapActions({
                addRandom : 'addRandomNumber', //@click="addNumber(inputNumber)"
                resetCount : 'resetCount' 
            }),

            //===mutations===
            // addNumber, //手動寫function呼叫store.commit  //@click="addRandom"
            ...mapMutations({addNumber : 'ADD_NUMBER'}), //@click="addRandom(1)"

            //===getters===
            // time10  使用computed屬性，並搭配 {{ time10 }}
            // ...toRefs(reactive(store.getters)) 搭配 {{ time10 }}
            ...mapGetters(['time10']) //搭配 {{ time10() }}

        }
    },
})
</script>
<style scoped>
    
</style>