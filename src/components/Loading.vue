<template>
    <div v-show="show" id="loading">
        <div class="loading">
            <div class="spinner-border text-info" style="width: 3rem; height: 3rem;">
            </div>&nbsp;&nbsp;
            <span><b>{{text}}</b></span>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent, ref,watch, toRefs } from 'vue';

export default defineComponent({
    name: 'Loading',
    props:{
        'control' : {required : false, default: false},
        'text' : {required : false, default : '讀取中....'}
    },
    setup(props){
      let show = ref(false) as any
      let { control } = toRefs(props)
      watch(control,()=>{
          show.value = control.value
      })

      return{
          show
      }
    }
});
</script>
<style scoped>
.loadingText{
    display: none;
}
.loading{
    display: flex;
    max-width: 10%;
    height: 70vh;
    margin: auto;
    align-items: center;
    justify-content: center;
}
.loading div{
    z-index : 2000;
}
.loading span{
    font-size: 25px;
    color: #00a;
}
</style>