<template>
    <div id="mapid">
        <h1>Leaflet + TGOS</h1>
    </div>
    <button class="btn btn-dark menuBtn" @click="openMenu">選單</button>
    <div class="offcanvas offcanvas-start" :class="offcanvasClass" :style="offcanvasStyle" tabindex="-1" id="offcanvas">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">選單內容</h5>
            <button type="button" class="btn-close text-reset" @click="closeMenu"></button>
        </div>
        <div class="offcanvas-body">
            <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </div>
            <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton">
                Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
            </div>
        </div>
    </div>
    
</template>
<script lang="ts">
import { defineComponent,reactive,onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import * as locationImage from '@/assets/marker.png'

export default defineComponent({
    name: 'Leaflet',
    setup(){
        let map:any = reactive({})
        let showMenu = ref(false)
        let offcanvasClass = reactive({'show': false })
        let offcanvasStyle = reactive({'visibility' : 'hidden' })
        function openMenu(){
            showMenu.value = true
            offcanvasStyle.visibility = 'visible'
            offcanvasClass.show = true
        }
        function closeMenu(){
            showMenu.value = false
            offcanvasClass.show = false
            setTimeout(()=>{ //show會連動transform，所以先播完動畫後再hidden
                offcanvasStyle.visibility = 'hidden'
            },300)
            
        }

        onMounted(()=>{
            map = L.map('mapid').setView([25.05229843496652, 121.54982723069188], 13)
            const mapLayers = { 
                TGOS : L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/{z}/{y}/{x}', {
                    attribution: '&copy; <a href="https://www.tgos.tw/tgos/web/tgos_home.aspx">TGOS</a>'
                })
            }
            mapLayers.TGOS.addTo(map)
            L.marker(
                map.getCenter(),{
                    icon : L.icon({
                        // iconUrl: require('@/assets/marker.png'),
                        iconUrl: require('../assets/marker.png'),
                        iconSize: [48, 48],
                        iconAnchor: [24, 48]
                    }),
                    zIndexOffset: 1000
                }
                
                
            ).addTo(map);
        })

        return {
            offcanvasClass, offcanvasStyle, map,openMenu,closeMenu
        }
    }
    
})
</script>
<style scoped>
/* @import './../../node_modules/leaflet/dist/leaflet.css'; */
#mapid { 
    height: 800px;
}
.menuBtn{
    position:absolute;
    top: 150px;
    z-index: 500;
}
</style>
