<template>
    <div>
        <ProgressBar :value="barModel" :color="color" :total="total" @onChange="log" />
        <!-- <ProgressBar :value="barModel" :total="total" :color="color" show-label @onChange="log">
            <template #label="{ percent, value, total }">
                percent: {{ percent }} value: {{ value }} total: {{ total }}
            </template>
        </ProgressBar> -->
        <br />
        <br />
        <button @click="update">update value</button>
        <button @click="updateTotal">update total</button>
        <button @click="makeBlue">make blue</button>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import ProgressBar from '@/components/ProgressBar'

export default defineComponent({
    components: {
        ProgressBar
    },
    setup() {
        const state = reactive({
            barModel: 15,
            total: 100,
            color: 'blue'
        })

        function update() {
            state.barModel = state.barModel + 5
        }

        function updateTotal() {
            state.total = 200
        }

        function makeBlue() {
            state.color = 'blue'
        }

        function log(result) {
            console.log('percent:', result.percent, 'value:', result.value, 'total:', result.total)
        }

        return { ...toRefs(state), update, updateTotal, makeBlue, log }
    }
})
</script>

<style lang="scss"></style>
