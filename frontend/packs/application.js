/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

//console.log('Hello World from Webpacker';

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
                            color: null,
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
                                props : {icons: request.response.icons},
                                hasModalCard: true,
                                events: {
                                    plotIcon: function(icon, color) {
                                        app.markers.push({position: app.plotPosition,color: color, icon: icon  })
                                    },
                                }
                            })
                        }
                    }
                })

            } else {
            }
        }
    };
    request.open('get', '/markers', true);
    request.responseType = "json";
    request.send();


})
