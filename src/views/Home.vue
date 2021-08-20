<template>
  <div class="home">
    <div class="test">
      測試對畫框 <button class="btn btn-primary" @click="click">彈出對話框</button>
      <Dialog title="title" content="content" :isActive="show" @close="show=false" />
    </div>
    <div class="test">
      測試Loading <button class="btn btn-primary" @click="loading">顯示讀取</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import Dialog from '../components/Dialog.vue'

export default defineComponent({
  name: 'Home',
  components:{Dialog},
  setup(){

    //彈出對話框
    let show = ref(false)
    function click(){
      show.value = !show.value
    }

    //顯示讀取
    const Loading = inject('Loading') as any
    function loading(){
      Loading.loading('Loading...')
      setTimeout(()=>{
        Loading.clear()
      }, 1000)
    }
      
    return {
      show, click, loading
    }
  }
});
</script>
<style scoped>
.test{
  margin: 5px;
}
</style>