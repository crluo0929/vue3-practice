import { defineComponent, reactive,ref } from 'vue'
import Proj4js from 'proj4'

export default function(){

    Proj4js.defs('EPSG:4326','+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees')
    Proj4js.defs('EPSG:3825', '+title=二度分帶：TWD97 TM2 澎湖 +proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs')
    Proj4js.defs('EPSG:3826','+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs')
    
    const TWD97 = Proj4js.Proj('EPSG:3826')
    const TWD97_Penghu = Proj4js.Proj('EPSG:3825')
    const WGS84 = Proj4js.Proj('EPSG:4326')

    const coordinate = reactive({lngX:'', latY:''})  //原始座標
    const sourceSelect = ref('EPSG:3826')  //預設來源座標系統
    const targetSelect = ref('EPSG:4326')  //轉換目標座標系統
    const result = reactive({lngX:'',latY:''})  //轉換結果座標

    function transform(source:string, target:string, sourceX:any, sourceY:any){
        let s = null, t=null;
        if(source==='EPSG:3826') s = TWD97
        else if(source==='EPSG:3825') s = TWD97_Penghu
        else s = WGS84
        if(target==='EPSG:3826') t = TWD97
        else if(target==='EPSG:3825') t = TWD97_Penghu
        else t = WGS84
        if(sourceX==='' || sourceY ==='') return 

        const p = [parseFloat(sourceX) , parseFloat(sourceY)]
        const ret = Proj4js.transform(s, t, p);
        result.lngX = ret.x
        result.latY = ret.y
        
        return {lngX : ret.x, latY : ret.y}
    }

    return {
        coordinate, sourceSelect, targetSelect, transform, result
    }

}