<template>
    <div>
        <h1>Vuex Module</h1>
        <h2>Person Info</h2>
        Name: {{name}} <br>
        Age: {{age}} <br>
        Phone: {{phone}} <br>
        Live: {{fullCity()}}<br>
        <button class="btn btn-primary margin5" @click="CHANGE_NAME('Roy')">改名字</button>
        <button class="btn btn-primary margin5" @click="setRandomPhone()">隨機變更電話</button>
        <button class="btn btn-primary margin5" @click="CHANGE_LIVE('New Taipei')">改城市</button>
        <button class="btn btn-primary margin5" @click="CHANGE_AGE(30)">改年齡</button>
        <button class="btn btn-primary margin5" @click="modifyStore">直接存取store改名</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useStore, mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default defineComponent({
    name: 'MultiStore',
    setup() {
        const store = useStore()
        // console.log(store.state.personStore.person.name) //John
        // let a = computed(()=>{ return 1 })
        // let {x} = { ...toRefs(reactive({ x : 1 })) }
        // console.log(isReactive(a)) //false
        // console.log(isRef(a)) //true
        // console.log(isReadonly(a)) //true
        // console.log(isRef(x)) //true
        // console.log(isReadonly(x)) //false
        function modifyStore(){
            store.state.personStore.person.name = 'Mary( never do this! store的strict:true下是會噴錯的)'
        }

        return {
            ...toRefs(store.state.personStore.person),
            // ...mapState('personStore',['person']),  //can't work
            ...mapActions('personStore',['setRandomPhone']),
            ...mapMutations('personStore',['CHANGE_NAME','CHANGE_PHONE','CHANGE_AGE','CHANGE_LIVE']),
            ...mapGetters('personStore',['fullCity']),
            modifyStore
        }
    },
})
</script>
<style scoped>

</style>>
