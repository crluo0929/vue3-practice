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
                目前座標: X: {{aimCoord.lat}}, Y: {{aimCoord.lng}}
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

        let aimCoord:any = reactive({x:25.05229843496652,y:121.54982723069188})

        onMounted(()=>{

            map = L.map('mapid').setView([25.05229843496652, 121.54982723069188], 13)
            const mapLayers = { 
                TGOS : L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/{z}/{y}/{x}', {
                    attribution: '&copy; <a href="https://www.tgos.tw/tgos/web/tgos_home.aspx">TGOS</a>'
                })
            }
            mapLayers.TGOS.addTo(map)

            let aim = L.marker(
                map.getCenter(),{
                    icon : L.icon({
                        iconUrl: require('../assets/aim.png'),
                        iconSize: [48, 48],
                        iconAnchor: [24, 48]
                    }),
                    zIndexOffset: 1000,
                    draggable: true,
                    opacity: 0.5
                }
            )
            aim.addEventListener('moveend', (e)=>{ 
                aimCoord.lat = e.target._latlng.lat
                aimCoord.lng = e.target._latlng.lng
            })
            aim.addTo(map);

        })

        return {
            offcanvasClass, offcanvasStyle, map,openMenu,closeMenu, aimCoord
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
.offcanvas-start{
    width : 450px;
}
</style>
