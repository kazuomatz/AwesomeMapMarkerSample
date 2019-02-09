'use strict';
import "babel-polyfill"
require.context('./images', true, /\.(png|jpg|jpeg|svg)$/);
import Vue from 'vue'
import Buefy from 'buefy'
Vue.use(Buefy)

import './css/style'
import MapVue from "../vue_components/MapVue"
import '@fortawesome/fontawesome-free/css/all.css'
import IconSelectorModal from '../vue_components/IconSelectorModal'
document.addEventListener('DOMContentLoaded', () => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status == 200) {
                const app = new Vue({
                    el: document.getElementById("map"),
                    components: {MapVue},
                    data() {
                        return {
                            icon: {},
                            color: "#194d33",
                            markers: [],
                            plotPosition: Object
                        }
                    },
                    methods: {
                        plotMarker: function(position) {
                          this.plotPosition = position;
                          this.showDialog();
                        },
                        showDialog: function () {
                            this.$modal.open({
                                parent: this,
                                component: IconSelectorModal,
                                props : {icons: request.response.icons, defaultColor: this.color},
                                hasModalCard: true,
                                events: {
                                    plotIcon: function(icon, color) {
                                        app.color = color;
                                        app.markers.push({position: app.plotPosition,color: color, icon: icon  })
                                    },
                                }
                            })
                        }
                    }
                })
            }
        }
    };
    request.open('get', '/markers', true);
    request.responseType = "json";
    request.send();
});
