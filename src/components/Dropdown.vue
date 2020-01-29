<template>
    <div :class="classList">
        <input type="hidden" v-model="value">
        <i class="dropdown icon"></i>
        <div class="default text">{{ defaultText }}</div>
        <div class="menu">
            <div class="item" v-for="(option, index) in list" :key="index"
                 :data-value="option.value" :data-text="option.text"
            >{{ option.text }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            addClass: {
                type: String
            },
            value: {
                required: true
            },
            defaultText: {
                required: true
            },

            options: {
                required: true
            },
            textFiled: {
                default: 'text'
            },
            valueFiled: {
                default: 'value'
            },

            action: {
                type: String,
                default: 'activate'
            },
            setting: {
                type: Object
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.initDropdown()
            })
        },

        updated() {
            this.$nextTick(() => {
                this.initDropdown()
            })
        },

        computed: {
            classList: function() {
                let cls = 'ui dropdown '
                if(this.addClass){
                    cls += this.addClass
                }else{
                    cls += 'selection'
                }
                return cls
            },

            list: function() {
                if (!this.options) {
                    console.error('options is null')
                }

                return this.options.map((option) => {
                    if (option.constructor === Object) {
                        return {
                            text: option[this.textFiled],
                            value: option[this.valueFiled]
                        }
                    } else {
                        return {
                            text: option,
                            value: option
                        }
                    }
                })
            }
        },

        methods: {
            initDropdown: function() {
                const self = this,
                    settings = $.extend({
                        action: this.action,
                        onChange: function(value, text) {
                            self.$emit('input', value)
                            self.$emit('dropdown-selected', text)
                        }
                    }, this.setting)

                $(this.$el).dropdown(settings)
            }
        }
    }
</script>
