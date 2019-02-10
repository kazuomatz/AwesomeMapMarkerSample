# Sample Application of AwesomeMapMarker 

<img width="75%" alt="icon" src="https://user-images.githubusercontent.com/2704723/52534335-b0b30a00-2d83-11e9-824b-6167064dc033.png">

This is a sample application that uses [AwesomeMapMarker](https://github.com/kazuomatz/AwesomeMapMarker). 
AwesomeMapMarker is a library that generates markers from Fontawesome 5 for plotting on maps such as Google Map, Open Street Map and iOS App etc.

## Ruby version

- 2.51

## System dependencies

- Rails 5.2.2
- Vue.js 2.5.2
- webpack 4.29.0 (not use webpacker)
- [Buefy](https://buefy.github.io/)

## How to run

```bash
$ bundle install
$ npm install
$ vim frontend/vue_components/MapVue.vue 
```

```vue::frontend/vue_components/MapVue.vue 
<template>
    <div>
        <map-loader
                :map-config="mapConfig"
                apiKey="--YOUR MAP KEY--">
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
                    center: {lat: 34.972187, lng: 138.388901}  //Default Position
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

```

Replace "--YOUR MAP KEY--" to your google map api key, and "Default Position" is the latitude and longitude when displaying the google map. Please change it to your liking value.

```bash
$ foreman start
```
Access http://localhost:5000 in the browser.

If you have not installed foreman, install it as follows.

```bash
$ gem install foreman
```




## License

- This applocation is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
- All font files licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL)
