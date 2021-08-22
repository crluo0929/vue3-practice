<template>
    <div>
        <h1>Vuex</h1>
        <button class="btn btn-primary margin5" @click="addRandom">隨機增加數字</button><br>
        <button class="btn btn-primary margin5" @click="addNumber">增加數字</button>數字:<input type="number" style="width:50px;" v-model="inputNumber" /><br>
        目前總和: {{ store.state.count }}<br>
        歷史紀錄: 1<span v-for="item,index in store.state.randomList" :key="index">+{{ item }}</span><br>
        10倍總和: {{ store.getters.time10 }}<br>
        <hr>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'State',
    setup() {
        let store = useStore()
        function addRandom(){
            store.dispatch('addRandomNumber',10)
        }
        let inputNumber = ref(0)
        //自己寫store.commit
        function addNumber(){
            store.commit('ADD_NUMBER', inputNumber.value)
        }

        //自己在getter裡寫從sotre取資料
        // let count = computed(()=>{
        //     return store.state.count
        // })

        return {
            inputNumber,
            store,
            addRandom, 
            addNumber,
            // count,

        }
    },
})
</script>
<style scoped>
    
</style>