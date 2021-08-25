<template>
    <div>
        
        <div class="margin5">
            緯度(lat/x): <input type="text" v-model="coordinate.latX" />，&nbsp;
            經度(lng/y): <input type="text" v-model="coordinate.lngY" />
        </div>
        <!-- <button class="btn btn-primary" @click="init">測試資料</button> -->

        原始座標: 
        <select class="form-select" style="width:auto;display:inline-block;" v-model="sourceSelect">
            <option value="EPSG:4326">EPSG:4326(WGS84 經緯度)</option>
            <option value="EPSG:3825">EPSG:3825(TWD97 二度分帶-澎湖)</option>
            <option value="EPSG:3826">EPSG:3826(TWD97 二度分帶-台灣)</option>
        </select>
        轉換座標: 
        <select class="form-select" style="width:auto;display:inline-block;" v-model="targetSelect">
            <option value="EPSG:4326">EPSG:4326(WGS84 經緯度)</option>
            <option value="EPSG:3825">EPSG:3825(TWD97 二度分帶-澎湖)</option>
            <option value="EPSG:3826">EPSG:3826(TWD97 二度分帶-台灣)</option>
        </select>
        &nbsp;&nbsp;
        <button class="btn btn-primary" @click="transform(sourceSelect,targetSelect,coordinate.latX,coordinate.lngY)">轉換</button><br><br>
        <hr>
        轉換結果:<br>  
        緯度(X): {{result.latX}}<br>
        經度(Y): {{result.lngY}}
    </div>
</template>
<script lang="ts">
//https://proj.org/usage/quickstart.html
import { defineComponent } from 'vue'
import useCoordTrans from '../hooks/useCoordTrans'

export default defineComponent({
    name: 'Proj4js',
    setup() {
        
        let { coordinate, sourceSelect, targetSelect, transform, result } = useCoordTrans()
        
        return {
            coordinate, sourceSelect, targetSelect, transform, result
        }
    }
})
</script>
<style scoped>
    
</style>