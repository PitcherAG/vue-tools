<template>
    <div>
        <h3>Numpad Input</h3>
        <div class="ui divider" />
        <NumpadInput v-model="test" placeholder="test" group="test" />
        <!-- <NumpadInput v-model="test2" placeholder="test" group="test" /> -->
        <br />
        <br />
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
            test: '55.55',
            test2: '',
            recordTypeSaved: 'test1',
            recordTypes: [
                {
                    text: 'test 1',
                    value: 'test1'
                },
                {
                    text: 'test 2',
                    value: 'test2'
                },
                {
                    text: 'test 3',
                    value: 'test3'
                }
            ]
        })

        return { ...toRefs(state) }
    }
}
</script>
