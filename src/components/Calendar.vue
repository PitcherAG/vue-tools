<template>
    <div class="ui calendar" ref="calendar">
        <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input ref="input" type="text" :placeholder="placeholder" v-model="value" />
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
        const placeholder = ref()

        const initCalendar = () => {
            const settings = $.extend(
                {
                    type: props.type,
                    today: props.today,
                    action: props.action,
                    onChange: function() {
                        console.log('change', attrs)
                        attrs.emit('input', attrs.refs.input.value)
                    },
                    touchReadonly: true,
                    formatter: {
                        date: function(date) {
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
                    text: {
                        days: $gettext("'S', 'M', 'T', 'W', 'T', 'F', 'S'").split(','),
                        months: [
                            $gettext('January'),
                            $gettext('February'),
                            $gettext('March'),
                            $gettext('April'),
                            $gettext('May'),
                            $gettext('June'),
                            $gettext('July'),
                            $gettext('August'),
                            $gettext('September'),
                            $gettext('October'),
                            $gettext('November'),
                            $gettext('December')
                        ],
                        monthsShort: [
                            $gettext('Jan'),
                            $gettext('Feb'),
                            $gettext('Mar'),
                            $gettext('Apr'),
                            $gettext('May'),
                            $gettext('Jun'),
                            $gettext('Jul'),
                            $gettext('Aug'),
                            $gettext('Sep'),
                            $gettext('Oct'),
                            $gettext('Nov'),
                            $gettext('Dec')
                        ],
                        today: $gettext('Today'),
                        now: $gettext('Now'),
                        am: $gettext('AM'),
                        pm: $gettext('PM')
                    }
                },
                props.setting
            )

            if (props.defaultText == 'Date/Time') {
                placeholder.value = $gettext('Date/Time')
            } else {
                placeholder.value = props.defaultText
            }

            $(attrs.refs.calendar).calendar(settings)
        }

        onMounted(() => {
            setTimeout(() => {
                initCalendar()
            }, 10)
        })

        onUpdated(() => {
            initCalendar()
        })
        return { initCalendar, placeholder }
    }
}
</script>

<style scoped>
.default {
    color: rgba(191, 191, 191, 0.87) !important;
}
</style>
