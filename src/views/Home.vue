<template>
  <div class="home">
    <div>
      測試對畫框 <button class="btn btn-primary" @click="click">彈出對話框</button>
      <Dialog title="title" content="content" :isActive="show" @close="show=false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Dialog from '../components/Dialog.vue'

export default defineComponent({
  name: 'Home',
  components:{Dialog},
  setup(){
    let show = ref(false)

    function click(){
      show.value = !show.value
    }

    return {
      show, click
    }
  }
});
</script>
<style scoped>

</style>