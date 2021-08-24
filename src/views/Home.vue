<template>
  <div class="home">
    <div class="margin5">
      測試對畫框 <button class="btn btn-primary" @click="click">彈出對話框</button>
      <Dialog title="title" content="content" :isActive="show" @close="show=false" />
    </div>
    <div class="margin5">
      測試Loading <button class="btn btn-primary" @click="loading">顯示讀取</button>
    </div>
    <div class="margin5">
      測試Slot <button class="btn btn-primary" @click="showPanel=!showPanel">顯示Panel</button>
      <div v-if="showPanel" class="panel-wrap d-flex justify-content-center">
        <Panel>
          <div style="text-align: center">
            Panel in Panel<br><br>
            <Panel panelHeaderClass="bg-success">
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Expedita quaerat dolores numquam harum adipisci iste, accusantium velit doloribus! Ad, blanditiis!</span>
            </Panel>
          </div>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import Dialog from '../components/Dialog.vue'
import Panel from '../components/Panel.vue'

export default defineComponent({
  name: 'Home',
  components:{Dialog, Panel},
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
      }, 800)
    }

    //顯示Panel
    let showPanel = ref(false)
      
    return {
      show, click, loading, showPanel, alert 
    }
  }
});
</script>
<style scoped>
.panel-wrap > div{
  width : 400px;
}
</style>