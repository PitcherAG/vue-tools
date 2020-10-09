<template>
    <div>
        <h3>Numpad Input</h3>
        <div class="ui divider" />
        <template v-for="inp in inputs">
            <div :key="inp.id">
                <span class="mr-4">Group: {{ inp.group }}</span>
                <NumpadInput v-model="inp.val" :group="inp.group" />
                <br />
            </div>
        </template>
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
                group: 'test',
                val: ''
            })
            console.log(NumpadInput.numpadStore.groups)
        }

        const remove = () => {
            state.inputs = state.inputs.filter(i => i.id !== state.inputs.length - 1)
            console.log(NumpadInput.numpadStore.groups)
        }

        return { ...toRefs(state), add, remove }
    }
}
</script>
