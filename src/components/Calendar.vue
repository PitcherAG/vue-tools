<template>
    <div class="ui calendar" ref="calendar">
        <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input ref="input" type="text" :placeholder="defaultText" v-model="value">
        </div>
    </div>
</template>
<script>
    import { onMounted, onUpdated, ref } from '@vue/composition-api'

    export default {
        props: {
            value: {
                required: true
            },
            type: {
                default: 'datetime',
                validator: function(value) {
                    return ['datetime', 'date', 'time', 'month', 'year'].indexOf(value) !== -1
                }
            },
            today: {
                default: true
            },
            defaultText: {
                default: 'Date/Time'
            },
            action: {
                type: String,
                default: 'activate'
            },
            setting: {
                type: Object
            }
        },

        setup(props, attrs) {
            console.log('setup cal')
            const initCalendar = () => {
                const settings = $.extend({
                    type: props.type,
                    today: props.today,
                    action: props.action,
                    onChange: function(value, text) {
                        console.log('change', attrs)
                        attrs.emit('input', attrs.refs.input.value)
                    },
                    touchReadonly: true,
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return ''
                            //if(props.type==='date') {
                            const yyyy = date.getFullYear().toString()
                            const mm = (date.getMonth() + 1).toString() // getMonth() is zero-based
                            const dd = date.getDate().toString()
                            return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]) // padding
                            /*}else if(props.type==='datetime'){
                                return date.toISOString()
                            }*/

                        }
                    },
                }, props.setting)

                $(attrs.refs.calendar).calendar(settings)
            }
            const val = ref(props.value)
            onMounted(() => {
                setTimeout(() => {initCalendar()}, 10)

            })
            onUpdated(() => {
                initCalendar()
            })
            return { initCalendar }
        }
    }
</script>

<style scoped>
    .default {
        color: rgba(191, 191, 191, .87) !important;
    }
</style>
