<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Icon Select</p>
        </header>
        <section class="modal-card-body">
            <div class="columns icons">
                <div class="column is-8">
                    <span v-for="icon in icons" class="icon" @click="setIcon(icon,$event)"><i :class="'fas fa-' + icon.id"></i></span>
                </div>
                <div class="column is-4">
                    <sketch-picker v-model="color" @input="changeColor"></sketch-picker>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button :disabled="!this.activeIcon" class="button is-primary" @click="$emit('plotIcon',activeIcon,color);$parent.close()"><i class="fa fa-marker-alt"></i>  Plot</button>
        </footer>
    </div>
</template>

<script>
    import { Sketch } from 'vue-color'
    export default {
        name: "IconSelectorModal",
        props: ['icons'],
        components: {
            'sketch-picker': Sketch
        },
        methods: {
            changeColor: function(e) {
                let activeElement = document.querySelector(".active");
                if (activeElement) {
                    activeElement.style.backgroundColor = e.hex;
                }
                this.color = e.hex;
            },
            setIcon: function(icon,event) {
                let activeElement = document.querySelector(".active");
                this.activeIcon = icon
                if(activeElement) {
                    activeElement.style.backgroundColor = null;
                    activeElement.classList.remove("active");
                }
                event.currentTarget.classList.add('active');
                event.currentTarget.style.backgroundColor = this.color;
            }
        },
        data () {
            return {
                color: '#194d33',
                activeIcon: null
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
            position: absolute;
            margin: auto;
        }
        height: 400px;
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