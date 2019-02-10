<template>
    <div>
        <map-loader
                :map-config="mapConfig"
                :apiKey="apiKey">
            <template v-for="marker in markers">
                <child-marker
                        :position="marker.position"
                        :color="marker.color"
                        :icon="marker.icon"
                        :iconType="marker.iconType"/>
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
                    center: defultPostion
                },
                apiKey: apiKey
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