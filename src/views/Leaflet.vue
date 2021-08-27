<template>
    <h1>Leaflet + TGOS</h1>
    <div id="mapid">
        
    </div>
    <div v-if="showDrawInfo" id="panel" class="panel-wrap">
        <Panel panelHeaderClass="bg-success">
            <div>
                <div v-for="(item,index) in drawInfo" :key="index">
                    <b style="color:green">{{item.type}}</b><br>{{item.data}} <span v-if="item.radius">半徑: {{item.radius}}</span> <br>
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
                <b>目前座標:</b> X: {{aimCoord.latX}}, Y: {{aimCoord.lngY}}
            </div>
            <hr>
            <div>
                <b>畫圓</b>&nbsp;
                半徑 <input type="number" class="circleInput" placeholder="500" v-model="radius"> 公尺 
                <button class="btn btn-primary btn-sm" @click="drawCircle">draw</button>
            </div>
            <hr>
            <div>
                <b>畫圖工具</b>&nbsp;
                <button class="btn btn-primary btn-sm" @click="createDrawTool">建立</button>&nbsp;
                <button class="btn btn-primary btn-sm" @click="dropDrawTool">移除</button>
            </div>
            <hr>
            <div>
                <b>圖形資訊</b>&nbsp;
                <button class="btn btn-primary btn-sm" @click="showDrawItems">顯示/隱藏</button>
            </div>
            <hr>
            
        </div>
    </div>
    

</template>
<script lang="ts">
import { defineComponent,reactive,onMounted, ref } from 'vue'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'
import 'leaflet-draw'
import Panel from '../components/Panel.vue'
import initMap from '../hooks/initMap'
import useLeftMenu from '../hooks/useLeftMenu'

export default defineComponent({
    name: 'Leaflet',
    components:{Panel},
    setup(){
        let map:any = null
        let aimCoord:any = reactive({latX:25.05229843496652,lngY:121.54982723069188}) //marker point

        //定位相關
        let address:any = ref('') //地址定位
        let poi:any = ref('') //地標定位
        let district:any = ref('') //行政區定位
        let road:any = ref('') //道路定位

        //左邊選單
        let {offcanvasClass,offcanvasStyle,openMenu,closeMenu} = useLeftMenu()

        //畫圓用
        let radius:any = ref(500) //畫圓半徑
        //畫圖用
        let colorList = ['#e68a00','#cc00cc','#009933','#2929a3','#77773c','#cc0000','#000080']
        let drawControl:any = null //繪圖控制項
        let drawnItems = new L.FeatureGroup(); //存放所有圖形
        let drawInfo:any = reactive([]) //圖形資訊
        let showDrawInfo:any = ref(false)

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
                    drawInfo.push( {type: '圓形', data: layer._latlng , radius: layer._mRadius } )
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
            let { _map, _aimCoord } = initMap(drawnItems)
            map = _map
            aimCoord = _aimCoord
        })

        return {
            map, 
            offcanvasClass, offcanvasStyle, openMenu, closeMenu, aimCoord,
            drawCircle,radius,
            createDrawTool,dropDrawTool,
            showDrawItems,drawInfo,showDrawInfo,
            address,poi,district,road
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
  width:30%;
  background-color: #fcfcfc;
  border: 0;
  border-bottom: 1px solid lightgrey;
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
