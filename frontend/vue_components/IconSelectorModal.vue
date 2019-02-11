<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Select Icon</p>
        </header>
        <section class="modal-card-body">
            <div class="columns icons">
                <div class="column is-8">
                    <b-tabs size="is-medium" class="block">
                        <b-tab-item label="Brand">
                            <span v-for="icon in icons.brand" class="icon" @click="setIcon('fab',icon,$event)"><i :class="'fab fa-' + icon.id"></i></span>
                        </b-tab-item>
                        <b-tab-item label="Solid">
                            <span v-for="icon in icons.solid" class="icon" @click="setIcon('fas',icon,$event)"><i :class="'fas fa-' + icon.id"></i></span>
                        </b-tab-item>
                    </b-tabs>
                </div>
                <div class="column is-4">
                    <div class="tile is-vertical">
                        <div class="tile">
                            <sketch-picker v-model="color" @input="changeColor"></sketch-picker>
                        </div>
                        <div class="tile preview-icon" v-show="this.activeIcon">
                            <img :src="iconPath" class="image is-64x64"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">cancel</button>
            <button :disabled="!this.activeIcon" class="is-primary button" @click="$emit('plotIcon',activeIconType,activeIcon,color);$parent.close()"><i class="fas fa-map-marker-alt"></i>&nbsp;plot</button>
        </footer>
    </div>
</template>

<script>
    import { Sketch } from 'vue-color'
    export default {
        mounted: function() {
          this.color = this.defaultColor;
        },
        name: 'IconSelectorModal',
        props: ['icons','defaultColor'],
        components: {
            'sketch-picker': Sketch
        },
        computed: {
            iconPath: function() {
                if (this.activeIcon) {
                    return '/markers/' + this.activeIconType + '/' + this.activeIcon.id + '/' + this.color.replace('#', '') + '.png';
                }
                else {
                    return '';
                }
            }
        },
        methods: {
            changeColor: function(e) {
                let activeElement = this.$el.querySelector('.active');
                if (activeElement) {
                    activeElement.style.backgroundColor = e.hex;
                }
                this.color = e.hex;
            },
            setIcon: function(iconType,icon,event) {
                let activeElement = this.$el.querySelector('.active');
                this.activeIcon = icon
                this.activeIconType = iconType
                if(activeElement) {
                    activeElement.style.backgroundColor = null;
                    activeElement.classList.remove('active');
                }
                event.currentTarget.classList.add('active');
                event.currentTarget.style.backgroundColor = this.color;
            }
        },
        data () {
            return {
                color: '#194d33',
                activeIcon: null,
                activeIconType: null
            }
        }
    }
</script>

<style scoped>
.columns.icons {
    .column {
        position: relative;
        .vc-sketch {
            left: 0;
            right: 0;
            margin: 40px auto;
        }
        .tile {
            &.preview-icon {
                margin: auto;
            }
        }
        height: 600px;
        overflow: scroll;
        span.icon {
            display: inline-block;
            padding: 5px;
            margin: 3px;
            width: 54px;
            height: 54px;
            border: 1px solid #ccc;
            position: relative;
            text-align: center;
            cursor: pointer;
            i {
                display: inline-block;
                left: 0;
                right: 0;
                line-height: 1.3;
                margin: auto;
                vertical-align: middle;
                font-size: 32px;
                color: black;
            }
            &:hover {
                background-color: #2CB696;
                i {
                    color: #fff;
                }
            }
            &.active {
                background-color: red;
                i {
                    color: #fff;
                }
            }
       }
    }
}
</style>