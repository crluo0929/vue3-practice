<template>
    <h1>Leaflet + TGOS</h1>
    <div id="mapid">
        
    </div>
    <div v-if="showDrawInfo" id="panel" class="panel-wrap">
        <Panel panelHeaderClass="bg-success">
            <div>
                <div v-for="(item,index) in drawInfo" :key="index">
                    <b style="color:green">{{item.type}}</b><br>{{item.data}}<br>
                </div>
            </div>
        </Panel>
    </div>
    <button class="btn btn-dark menuBtn" @click="openMenu">控制</button>
    <div class="offcanvas offcanvas-start" :class="offcanvasClass" :style="offcanvasStyle" tabindex="-1" id="offcanvas">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">控制選單</h5>
            <button type="button" class="btn-close text-reset" @click="closeMenu"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                目前座標: X: {{aimCoord.latX}}, Y: {{aimCoord.lngY}}
            </div>
            <hr>
            <div>
                <button class="btn btn-primary" @click="drawCircle">畫圓</button>
                半徑 <input type="number" class="circleInput" placeholder="500" v-model="radius"> 公尺
            </div>
            <hr>
            <div>
                <button class="btn btn-primary" @click="createDrawTool">建立畫圖工具</button>&nbsp;
                <button class="btn btn-primary" @click="dropDrawTool">移除畫圖工具</button>
            </div>
            <hr>
            <div>
                <button class="btn btn-primary" @click="showDrawItems">顯示所有圖形資訊</button>
            </div>
        </div>
    </div>
    

</template>
<script lang="ts">
import { defineComponent,reactive,onMounted, ref, toRaw} from 'vue'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
// import * as locationImage from '@/assets/marker.png'
import Panel from '../components/Panel.vue'
export default defineComponent({
    name: 'Leaflet',
    components:{Panel},
    setup(){
        let map:any = null
        let colorList = ['#e68a00','#cc00cc','#009933','#2929a3','#77773c','#cc0000','#000080']
        let drawControl:any = null //繪圖控制項
        let drawnItems = new L.FeatureGroup(); //存放所有圖形
        let drawInfo:any = reactive([]) //圖形資訊
        let showDrawInfo:any = ref(false)
        
        let aimCoord:any = reactive({latX:25.05229843496652,lngY:121.54982723069188})
        let radius:any = ref(500) //畫圓半徑

        //左邊選單
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
        //畫圓
        function drawCircle(){
            console.log(radius.value)
            let circle = L.circle(
                [aimCoord.latX, aimCoord.lngY],   // 圓心座標
                radius.value, // 半徑（公尺）
                {
                    color: 'yellow',      // 線條顏色
                    fillColor: 'yellow', // 填充顏色
                    fillOpacity: 0.5   // 透明度
                }
            )
            circle.addTo(map);
            drawnItems.addLayer(circle)
        }
        //建立畫圖工具
        function createDrawTool(){
            if(drawControl) return
            
            map.addLayer(drawnItems); //圖層
            drawControl = new L.Control.Draw({
                position: 'topright',
                draw:{
                    marker : {
                        icon : L.icon({
                            iconUrl : require('../assets/marker.png'),
                            iconSize: [48, 48],
                            iconAnchor: [24, 48]
                        })
                    },
                    circle : {
                        shapeOptions : {
                            color : 'gray'
                        }
                    }
                },
                edit: {
                    featureGroup: drawnItems
                }
            })
            map.addControl(drawControl);

            map.on(L.Draw.Event.CREATED, (e:any)=>{
                let type = e.layerType
                let layer = e.layer
                if(type!=='marker'){
                    let c = Math.floor(Math.random() * 7)
                    layer.options.color = colorList[c]
                }
                drawnItems.addLayer(layer);
            })
        }
        //移除畫圖工具
        function dropDrawTool(){
            if(drawControl){
                map.removeControl(drawControl)
                map.removeEventListener(L.Draw.Event.CREATED)
                drawControl = null

            } 
        }
        //顯示所有圖形資訊
        function showDrawItems(){
            showDrawInfo.value= !showDrawInfo.value
            drawInfo.length=0
            drawnItems.eachLayer((layer:any)=>{
                if(layer._mRadius){
                    drawInfo.push( {type: '圓形', data: layer._latlng } )
                    console.log('圓形', layer)
                } 
                else if( !Array.isArray(layer._latlngs) ){
                    drawInfo.push( {type: '點', data: layer._latlng } )
                    console.log('點',layer)
                } 
                else if(layer._latlngs.length===1){ //多邊形
                    if( layer._latlngs[0].length===4 &&
                        layer._latlngs[0][0].lng===layer._latlngs[0][1].lng && 
                        layer._latlngs[0][1].lat===layer._latlngs[0][2].lat &&
                        layer._latlngs[0][2].lng===layer._latlngs[0][3].lng && 
                        layer._latlngs[0][3].lat===layer._latlngs[0][0].lat ){
                            drawInfo.push( {type: '矩形', data: layer._latlngs[0] } )
                            console.log('矩形',layer)
                        }
                    else{
                        drawInfo.push( {type: '多邊形', data: layer._latlngs[0] } )
                        console.log('多邊形',layer)
                    }
                }else{
                    drawInfo.push( {type: '線段', data: layer._latlngs} )
                    console.log('線段',layer)
                }
            })
        }

        onMounted(()=>{
            let openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
                    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            })
            let tgos= L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/{z}/{y}/{x}', {
                    attribution: '&copy; <a href="https://www.tgos.tw/tgos/web/tgos_home.aspx">TGOS</a>'
            })

            map = L.map('mapid',{
                doubleClickZoom : false,
                layers: [openstreet,tgos]
            }).setView([25.05229843496652, 121.54982723069188], 13)
            
            // tgos.addTo(map)
            let baseMaps = {
                OpenStreetMap : openstreet,
                TGOS : tgos
            }
            L.control.layers(baseMaps).addTo(map);

            //加入瞄點
            let marker = L.marker(
                map.getCenter(),
                {
                    icon : L.icon({
                        iconUrl : require('../assets/aim.png'),
                        iconSize: [48, 48],
                        iconAnchor: [24, 48]
                    }),
                    draggable: true,
                }
            )
            marker.bindPopup('hello').openPopup();
            marker.on('dragend',(e)=>{
                aimCoord.latX = e.target._latlng.lat
                aimCoord.lngY = e.target._latlng.lng
                marker.setPopupContent(`現在座標位置:[ ${aimCoord.latX} , ${aimCoord.lngY} ]`)
                map.setView(L.latLng(e.target._latlng.lat,e.target._latlng.lng))
            })
            marker.addTo(map)
            drawnItems.addLayer(marker)
            
            //圓形
            let circle = L.circle(
                [25.069895471987962, 121.53895854949951],   // 圓心座標
                500,                // 半徑（公尺）
                {
                    color: 'red',      // 線條顏色
                    fillColor: '#f03', // 填充顏色
                    fillOpacity: 0.5   // 透明度
                }
            )
            circle.addTo(map);
            drawnItems.addLayer(circle)

            //多邊形
            let latlngs:any = [[25.0527904410819, 121.51187896728517],
                [25.036927279240775, 121.50449752807619],
                [25.02619515335593, 121.52698516845705],
                [25.040971025173597, 121.53213500976564],
                [25.051935126860787, 121.52612686157228]]
            var polygon = L.polygon(latlngs, {color: 'green'})
            polygon.addTo(map)
            drawnItems.addLayer(polygon)

            //線段
            var polyline = L.polyline([
                [25.036616216339418, 121.54312133789064],
                [25.034438753943654, 121.55530929565431],
                [25.03957128205317, 121.57041549682619],
                [25.028994928869558, 121.58586502075197]
            ], {color: 'blue'})
            polyline.addTo(map)
            drawnItems.addLayer(polyline)

            //矩形
            let bounds:any = [[25.062120753958837, 121.56543731689455], [25.050457751876504, 121.5835475921631]];
            let rectangle = L.rectangle(bounds, {color: "gray", weight: 1})
            rectangle.addTo(map);
            drawnItems.addLayer(rectangle)

        })

        return {
            map, 
            offcanvasClass, offcanvasStyle, openMenu, closeMenu, aimCoord,
            drawCircle,radius,
            createDrawTool,dropDrawTool,
            showDrawItems,drawInfo,showDrawInfo
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
    top: 220px;
    z-index: 500;
}
.offcanvas-start{
    width : 450px;
}
.circleInput {
  width:50%;
  background-color: #fcfcfc;
  border: 0;
  border-bottom: 2px solid lightgrey;
  padding: 10px;
}
#panel{
    position: absolute; 
    top: 20vh;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 50%; 
    z-index: 6000;
}
</style>
