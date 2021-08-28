import L from 'leaflet'
import { reactive } from 'vue'
export default function(drawnItems:any, aimCoord:any){

    let map:any = null 

    const tgos= L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/{z}/{y}/{x}', {
            attribution: '&copy; <a href="https://www.tgos.tw/tgos/web/tgos_home.aspx">TGOS</a>'
    })

    const openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    })

    map = L.map('mapid',{
        doubleClickZoom : false,
        layers: [openstreet,tgos]
    }).setView([25.05229843496652, 121.54982723069188], 13)
    
    // tgos.addTo(map)
    const baseMaps = {
        OpenStreetMap : openstreet,
        TGOS : tgos
    }
    L.control.layers(baseMaps).addTo(map);

    //加入瞄點
    const marker = L.marker(
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
        aimCoord.lngX = e.target._latlng.lng
        aimCoord.latY = e.target._latlng.lat
        marker.setPopupContent(`現在座標位置(經度,緯度):[ ${aimCoord.lngX} , ${aimCoord.latY} ]`)
        map.setView(L.latLng(e.target._latlng.lat,e.target._latlng.lng))
    })
    marker.addTo(map)
    drawnItems.addLayer(marker)
    
    //圓形(緯經度)
    const circle = L.circle(
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

    //多邊形(緯經度)
    const latlngs:any = [[25.0527904410819, 121.51187896728517],
        [25.036927279240775, 121.50449752807619],
        [25.02619515335593, 121.52698516845705],
        [25.040971025173597, 121.53213500976564],
        [25.051935126860787, 121.52612686157228]]
    const polygon = L.polygon(latlngs, {color: 'green'})
    polygon.addTo(map)
    drawnItems.addLayer(polygon)

    //線段(緯經度)
    const polyline = L.polyline([
        [25.036616216339418, 121.54312133789064],
        [25.034438753943654, 121.55530929565431],
        [25.03957128205317, 121.57041549682619],
        [25.028994928869558, 121.58586502075197]
    ], {color: 'blue'})
    polyline.addTo(map)
    drawnItems.addLayer(polyline)

    //矩形(緯經度)
    const bounds:any = [[25.062120753958837, 121.56543731689455], [25.050457751876504, 121.5835475921631]];
    const rectangle = L.rectangle(bounds, {color: "gray", weight: 1})
    rectangle.addTo(map);
    drawnItems.addLayer(rectangle)


    return {
        _map : map
    }

}