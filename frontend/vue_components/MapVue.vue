<template>
    <div>
        <map-loader
                :map-config="mapConfig"
                apiKey="AIzaSyBY4df3glSo2RgHCmNc6GQRRh20RdbmGuk">
            <template v-for="marker in markers">
                <child-marker :position="marker.position" :color="marker.color"  :icon="marker.icon" />
            </template>
        </map-loader>
    </div>
</template>

<script>
    import MapLoader from "./MapLoader.vue"
    import ChildMarker from './ChildMarker'
    export default {
        props: {
            markers: Array
        },
        data(){
            return {
                mapConfig: {
                    zoom: 12,
                    center: {lat: 34.972187, lng: 138.388901}
                }
            }
        },
        components: {
            MapLoader,
            ChildMarker
        },
        methods: {
        }
    }
</script>