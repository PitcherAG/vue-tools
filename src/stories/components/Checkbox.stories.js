import Checkbox from '../../components/Checkbox'


export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    argTypes: {
        size: { control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'] } },
        color: {
            control: {
                type: 'select',
                options: ['primary', 'inverted']
            }
        }
    },
    args: {}
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Checkbox },
    template: '<Checkbox v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
    value: {}
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

export const Slider = Template.bind({})
Slider.args = {
    slider: true
}

export const SliderInverted = Template.bind({})
SliderInverted.args = {
    inverted: true,
    slider: true
}

export const Toggle = Template.bind({})
Toggle.args = {
    toggle: true
}
