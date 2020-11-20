<template>
    <div>
        <h3>Numpad Input</h3>
        <div class="ui divider" />
        <div
            v-for="(inp, i) in inputs"
            :key="inp.id"
            class="mr-4 mb-1"
            :class="{ 'mt-5': inputs[i - 1] && inputs[i - 1].group !== inp.group }"
        >
                <span class="mr-4">Group: {{ inp.group }}</span>
                <NumpadInput v-model="inp.val" :group="inp.group" />
            </div>
        <br />
        <button @click="add">add</button>
        <button @click="remove">remove</button>
    </div>
</template>

<script>
import NumpadInput from '@/components/NumpadInput'
import { reactive, toRefs } from '@vue/composition-api'

export default {
    components: {
        NumpadInput
    },
    props: {},
    setup() {
        const state = reactive({
            inputs: [
                {
                    id: 0,
                    group: 'test',
                    val: '55.55'
                },
                {
                    id: 1,
                    group: 'test',
                    val: ''
                },
                {
                    id: 2,
                    group: 'test2',
                    val: ''
                },
                {
                    id: 3,
                    group: 'test2',
                    val: ''
                }
            ]
        })

        const add = () => {
            state.inputs.push({
                id: state.inputs.length,
                group: 'test3',
                val: ''
            })
        }

        const remove = () => {
            state.inputs = state.inputs.filter(i => i.id !== state.inputs.length - 1)
        }

        return { ...toRefs(state), add, remove }
    }
}
</script>
