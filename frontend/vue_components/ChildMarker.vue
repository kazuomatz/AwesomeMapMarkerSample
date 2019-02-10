<!-- ChildMarker.vue -->
<template></template>
<script>
    export default {
        inject: ['google', 'map'],
        props: {
            position: Object,
            icon: Object,
            color: '',
            iconType: ''
        },
        data(){
            return { marker: null}
        },
        mounted(){
            const { Marker } = this.google.maps

            this.marker = new Marker({
                position: new this.google.maps.LatLng(this.position.lat, this.position.lng),
                map: this.map,
                icon: {
                    url: '/markers/' + this.iconType + '/' + this.icon.id + '/' + this.color.replace('#','') + '.png',
                    scaledSize : new this.google.maps.Size(48, 48)
                },
                title: 'Awesome Marker' + this.icon.id
            })
        }
    }
</script>