<template>
    <div class="pt-4 fill-height">
        <h3>Calendar</h3>
        <div class="ui divider" />
        <Calendar v-model="stringDate" v-bind="attrs" @input="val => log('input', val)" />
        <br />
        <div class="ui button" @click="setDate">
            Update value
        </div>
        <div class="ui button" @click="hideToday">
            Hide today
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from '@vue/composition-api'
import Calendar from '@/components/Calendar.vue'
// 2020-08-12T11:20:00.000+0000

export default defineComponent({
    components: {
        Calendar
    },
    setup() {
        const state = reactive({
            // stringDate: '',
            stringDate: '2020-08-12T11:20:00.000+0000',
            attrs: {
                type: 'date',
                showToday: true,
                // disabledDaysOfWeek: [0, 3],
                // eventClass: 'red',
                // eventDates: [{
                //     date: new Date('2020-09-12T11:20:00.000'),
                //     message:'hehehee',
                // }],
                setting: {
                    // minDate: new Date('2020-08-15T11:20:00.000+0000')
                }
            }
        })

        const setDate = () => {
            const newDate = '2020-06-12T11:20:00.000+0000'
            console.log('----------------------------------------')
            console.log('SET DATE')
            console.log(state.stringDate)
            state.stringDate = newDate
            console.log(state.stringDate)
        }

        const hideToday = () => {
            console.log('HIDE TODAY')
            state.attrs.showToday = !state.attrs.showToday
        }

        const log = (type, val) => {
            console.warn(type, val)
        }

        onMounted(() => {
            // console.log(state.stringDate)
        })

        return { ...toRefs(state), setDate, hideToday, log }
    }
})
</script>
