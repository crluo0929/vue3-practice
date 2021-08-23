<template>
    <div id="mapid">
        <h1>Leaflet + TGOS</h1>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import * as locationImage from '@/assets/marker.png'

export default defineComponent({
    name: 'Leaflet',
    setup(){
        let map:any = reactive({})

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
            map
        }
    }
    
})
</script>
<style scoped>
/* @import './../../node_modules/leaflet/dist/leaflet.css'; */
#mapid { 
    height: 800px;
}
</style>
