<template>
    <div class="container-fluid">
        <div class="row">
            <div class="routesParent col-2">
                <div class="menu-top">
                    <i class="fab fa-vuejs fa-3x" style="position:relative;top:10px;"></i>
                    <span style="color: white;font-size:20px;">測試選單</span>
                </div>
                <div class="menu-list">
                    <div class="item">
                        <i class="fas fa-user fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span style="color: white;font-size:20px;">使用者資訊</span>
                    </div>
                    <div class="item">
                        <i class="fas fa-map fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span style="color: white;font-size:20px;">地圖資訊</span>
                    </div>
                    <div class="item">
                        <i class="fab fa-cc-visa fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span style="color: white;font-size:20px;">刷卡付費</span>
                    </div>
                    <div class="item">
                        <i class="fas fa-bell fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span style="color: white;font-size:20px;">通知</span>
                    </div>
                    
                    
                </div>
            </div>
            <div class="contentChild col-10">

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import { faUser,faBell,faMap } from '@fortawesome/fontawesome-free-solid'
import { faVuejs,faCcVisa } from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(faUser,faBell,faMap,faVuejs,faCcVisa)

export default defineComponent({
    name : 'Routes',
    setup() {
        console.log('')
    },
})
</script>
<style scoped>
.routesParent{
    height : 90vh;
    padding-left:0px;
    padding-right:0px;
    /* width: 75px; */
    background-color: #3c4b64;
}
.contentChild{
    border: 1px solid #232730;
}
.menu-top{
    height: 65px;
    width:100%;
    text-align: center;
    color: white;
    background-color: #303c54;
    
}
.menu-list{
    height: 40px;
    color: white;
}
.menu-list .item{
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 60px;
}
.menu-list .item:hover{
    background-color: #321fdb;
}
</style>