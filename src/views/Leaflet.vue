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
                <b>目前座標(經度x, 緯度y)</b><br> 
                {{aimCoord.lngX}}, {{aimCoord.latY}}
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
            <div>
                <b>地圖定位</b><br>
                <div class="margin5" style="display:flex;">
                    <label>移動到</label> <input type='text' placeholder="(經度,緯度)" style="width:75%" v-model="toPoint" /> 
                    <button class="btn btn-primary btn-sm" @click="moveTo">移動</button>
                </div>
                <div class="margin5">
                    <label>地址定位</label> <input type='text' placeholder="臺北市中山區松江路469巷4號" style="width:70%" v-model="address" /> 
                    <button class="btn btn-primary btn-sm" @click="addrLocate">定位</button>
                </div>
                <div class="margin5">
                    <label>地標定位</label> <input type='text' placeholder="內政部" style="width:70%" v-model="poi" /> 
                    <button class="btn btn-primary btn-sm" @click="poiLocate">定位</button>
                </div>
                <div class="margin5">
                    <label>行政區定位</label> <input type='text' placeholder="臺北市大安區住安里" style="width:66%" v-model="district"/> 
                    <button class="btn btn-primary btn-sm" @click="districtLocate">定位</button>
                </div>
                <div class="margin5">
                    <label>道路定位</label> <input type='text' placeholder="臺北市中正區徐州路18巷" style="width:70%" v-model="road"/> 
                    <button class="btn btn-primary btn-sm" @click="roadLocate">定位</button>
                </div>
            </div>
            <hr>
            <div>
                <b>KML</b><br>
                <label>上傳KML</label> <input type="file" name="kml" id="kml" @change="changeKmlFile">
                <button class="btn btn-primary btn-sm" @click="loadKML">載入KML</button><br>
                <label>下載KML</label><button class="btn btn-primary btn-sm" @click="exportKML">匯出KML</button>
            </div>
        </div>
    </div>
    

</template>
<script lang="ts">
import { defineComponent,reactive,onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'
import Panel from '../components/Panel.vue'
import initMap from '../hooks/initMap'
import useLeftMenu from '../hooks/useLeftMenu'
import useCoordTrans from '../hooks/useCoordTrans'
import omnivore from 'leaflet-omnivore'

declare var TGOS:any;

export default defineComponent({
    name: 'Leaflet',
    components:{Panel},
    setup(){
        let map:any = null
        //lngX 為經度, latY為緯度
        let aimCoord:any = reactive({lngX:121.54982723069188,latY:25.05229843496652}) //marker point

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

        //畫圓(緯經度)
        function drawCircle(){
            console.log(radius.value)
            let circle = L.circle(
                [aimCoord.latY,aimCoord.lngX,],   // 圓心座標
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

        //定位相關
        let toPoint:any = ref('')
        let address:any = ref('') //地址定位
        let poi:any = ref('') //地標定位
        let district:any = ref('') //行政區定位
        let road:any = ref('') //道路定位
        let {transform} = useCoordTrans()

        function moveTo(){
            //經度,緯度
            const p = toPoint.value.trim().split(',')
            if(p.length!=2) return
            to(parseFloat(p[0]),parseFloat(p[1]))
        }

        //移動(經度,緯度)
        function to(lngX:any, latY:any){ 
            
            //傳進去要改成緯度,經度
            const latlng = L.latLng(latY,lngX)
            const marker = L.marker(
                latlng,
                {
                    icon : L.icon({
                        iconUrl : require('../assets/marker2.png'),
                        iconSize: [48, 48],
                        iconAnchor: [24, 48]
                    }),
                }
            )
            marker.addTo(map)
            drawnItems.addLayer(marker)
            map.setView(latlng,17)
        }

        //地址定位
        function addrLocate(){
            let LService = new TGOS.TGLocateService();
            let request = {	 //設定定位所需的參數, 使用address進行地址定位
            address: address.value
            }
            LService.locateTWD97(request, (result:any, status:any)=>{	//進行定位查詢, 並指定回傳資訊為TWD97坐標系統
                if(status != 'OK'){
                    alert(status)
                    return
                }
                let loc = result[0].geometry.location
                let ret:any = transform('EPSG:3826','EPSG:4326',loc.x,loc.y)
                //經度,緯度
                to(ret.lngX,ret.latY)

            })
        }

        //地標定位
        function poiLocate(){
            let LService = new TGOS.TGLocateService();
            let request = {				//設定定位所需的參數, 使用address進行地址定位
                poi: poi.value
            }
            LService.locateTWD97(request, (result:any, status:any)=>{	//進行定位查詢, 並指定回傳資訊為TWD97坐標系統
                if(status != 'OK'){
                alert(status)
                return
                }
                let loc = result[0].geometry.location;
                let ret:any = transform('EPSG:3826','EPSG:4326',loc.x,loc.y)
                //經度,緯度
                to(ret.lngX,ret.latY)

            })
        }

        //行政區定位
        function districtLocate(){
            let LService = new TGOS.TGLocateService();
            let request = {				//設定定位所需的參數, 使用address進行地址定位
                district: district.value
            }
            LService.locateTWD97(request, (result:any, status:any)=>{	//進行定位查詢, 並指定回傳資訊為TWD97坐標系統
                if(status != TGOS.TGLocatorStatus.OK){
                    alert(status)
                    return
                }
                let loc = result[0].geometry.location;
                //要把TGOS API查回來的座標轉換成WGS84
                let ret:any = transform('EPSG:3826','EPSG:4326',loc.x,loc.y)
                //經度,緯度
                to(ret.lngX,ret.latY)
                //不可以使用TGOS的繪圖
                // map.fitBounds(result[0].geometry.viewport)
                // map.setZoom(map.getZoom()-1)
                // let polygon = new TGOS.TGFill(map,result[0].geometry.geometry,{
                // fillColor: '#00AAAA',
                //             fillOpacity: 0.2,
                //             strokeColor: '#009090',
                //             strokeWeight: 5,
                //             strokeOpacity: 1
                // })
                //使用leaflet繪圖
                const ployPoints:any = (result[0].geometry.geometry.ext_.linestring.path as any[])
                    .map(p => transform('EPSG:3826','EPSG:4326',p.x,p.y))
                    .map(p => [p?.latY, p?.lngX])
                const polygon = L.polygon([...ployPoints], {color: 'green'})
                polygon.addTo(map)
                drawnItems.addLayer(polygon)
                
            })
        }

        //道路定位
        function roadLocate(){
            let LService = new TGOS.TGLocateService();
            let request = {				//設定定位所需的參數, 使用address進行地址定位
                roadLocation: road.value
            }
            LService.locateTWD97(request, (result:any, status:any)=>{	//進行定位查詢, 並指定回傳資訊為TWD97坐標系統
                if(status != TGOS.TGLocatorStatus.OK){
                    alert(status)
                    return
                }

                let loc = result[0].geometry.location;
                //要把TGOS API查回來的座標轉換成WGS84
                let ret:any = transform('EPSG:3826','EPSG:4326',loc.x,loc.y)			//利用geometry.location取得點位(TGPoint)				//將地圖畫面縮放至第一個查詢結果的視域範圍
                // let marker = new TGOS.TGMarker(map, loc, road.value);	//繪出定位點
                //經度,緯度
                to(ret.lngX,ret.latY)
                //緯度,經度
                const latlng = L.latLng(ret.latY,ret.lngX)
                const marker = L.marker(
                    latlng,
                    {
                        icon : L.icon({
                            iconUrl : require('../assets/marker2.png'),
                            iconSize: [48, 48],
                            iconAnchor: [24, 48]
                        }),
                    }
                )
                marker.addTo(map)
                drawnItems.addLayer(marker)
                
            })
        }

        //載入KML
        let kmlFile = ref(null)
        function changeKmlFile(e:any){
            kmlFile.value = e.target.files[0]
            //理論上要push到後端server
        }
        function loadKML(){
            if(kmlFile.value){
                //理論上要從後端server網址下載，這裡用個假的url
                let path = URL.createObjectURL(kmlFile.value)
                var omnivoreLayer = omnivore.kml(path)
                //omnivore好像不支援讀取kml裡的iconStyle，所以自己設定icon...
                .on('ready', function() {
                    omnivoreLayer.eachLayer(function(layer:any) {
                        if (layer instanceof L.Marker) {
                            layer.setIcon(L.icon({
                                iconUrl : require('../assets/marker2.png'),
                                iconSize: [48, 48],
                                iconAnchor: [24, 48]
                            }));
                        }
                    });
                })
                .addTo(map);
            }
        }
        function exportKML(){
            // let data = drawnItems.toGeoJSON();
            //geojson好像不支援圓形，從geoJson轉kml也沒用
            alert('不支援')
        }

        onMounted(()=>{
            let { _map } = initMap(drawnItems,aimCoord)
            map = _map
        })

        return {
            map, 
            offcanvasClass, offcanvasStyle, openMenu, closeMenu, aimCoord,
            drawCircle,radius,
            createDrawTool,dropDrawTool,
            showDrawItems,drawInfo,showDrawInfo,
            toPoint,address,poi,district,road,moveTo,addrLocate,poiLocate,districtLocate,roadLocate,
            kmlFile, loadKML, changeKmlFile,exportKML
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
