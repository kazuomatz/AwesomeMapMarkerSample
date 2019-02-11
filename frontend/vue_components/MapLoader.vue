<template>
    <div>
        <div id="map"></div>
        <template v-if="!!this.google && !!this.map">
            <map-provider
                    :google="google"
                    :map="map">
                <slot/>
            </map-provider>
        </template>
    </div>
</template>

<script>
    import GoogleMapsApiLoader from 'google-maps-api-loader'
    import MapProvider from './MapProvider'

    export default {
        props:{
            mapConfig: Object,
            apiKey: String
        },
        components: {
            MapProvider
        },
        data(){
            return {
                google: null,
                map: null
            }
        },
        mounted () {
            GoogleMapsApiLoader({
                apiKey: this.apiKey
            }).then((google) => {
                this.google = google
                this.initializeMap()
            })
        },
        methods: {
            initializeMap (){
                const self = this;
                const mapContainer = this.$el.querySelector('#map')
                const { Map } = this.google.maps
                this.map = new Map(mapContainer, this.mapConfig)
                this.map.addListener('click', function(event) {
                    self.$root.plotMarker({lat: event.latLng.lat(), lng: event.latLng.lng()})
                })
            }
        }
    }
</script>

<style scoped>
    #map {
        height: 600px;
        width: 100%;
    }
</style>