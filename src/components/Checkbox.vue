<template>
    <div class="ui toggle checkbox" ref="checkbox">
        <input type="checkbox" tabindex="0" class="hidden" v-model="innerValue" >
        <label>{{ label }}</label>
    </div>
</template>

<script>
    import { onMounted } from '@vue/composition-api'

    export default {
        name: "Checkbox",
        props:{
            label:{
                type:String,
            },
            value:{
                type:Boolean
            }
        },
        setup(props, ctx){
            const innerValue = props.value
            onMounted(()=>{
                $(ctx.refs.checkbox).checkbox('setting', 'onChange', (e) => {
                    ctx.emit('input', !props.value)
                })
            })
            return {innerValue}
        }
    }
</script>

<style scoped>

</style>
