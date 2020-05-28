<template>
    <div class="ui toggle checkbox" ref="checkbox">
        <input type="checkbox" tabindex="0" class="hidden" v-model="interValue" >
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
            const interValue = props.value
            onMounted(()=>{
                console.log(ctx)
                $(ctx.refs.checkbox).checkbox('setting', 'onChange', (e) => {
                    console.log(e)
                    ctx.emit('input', !props.value)
                })
            })
            return {interValue}
        }
    }
</script>

<style scoped>

</style>
