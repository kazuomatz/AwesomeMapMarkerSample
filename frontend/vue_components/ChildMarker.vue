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
        computed:  {
            iconPath: function () {
                return '/markers/' + this.iconType + '/' + this.icon.id + '/' + this.color.replace('#', '') + '.png';
            }
        },
        mounted(){
            const { Marker, Size, LatLng } = this.google.maps;
            this.marker = new Marker({
                position: new LatLng(this.position.lat, this.position.lng),
                map: this.map,
                icon: {
                    url: this.iconPath,
                    scaledSize : new Size(48, 48)
                },
                title: 'Awesome Marker' + this.icon.id
            })
        }
    }
</script>