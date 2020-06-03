<template>
    <div class="pt-4">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <NumpadInput v-model="test" placeholder="test" group="test" />
        <NumpadInput v-model="test2" placeholder="test" group="test" />
    </div>
</template>

<script>
import NumpadInput from '@/components/NumpadInput'
export default {
    components: {
        NumpadInput
    },
    props: {},
    setup() {
        const test = ''
        const test2 = ''

        return { test, test2 }
    }
}
</script>

<style lang="scss">
//
</style>
