import Calendar from '../Calendar'


export default {
    title: 'Components/Calendar',
    component: Calendar,
    argTypes: {
        type: { control: { type: 'select', options: ['datetime', 'date', 'time', 'month', 'year'] } },
    },
    args: {}
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Calendar },
    template: '<Calendar v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
    value: new Date()
}

// export const Disabled = Template.bind({})
// Disabled.args = {
//     disabled: true
// }

// export const Slider = Template.bind({})
// Slider.args = {
//     slider: true
// }

// export const Toggle = Template.bind({})
// Toggle.args = {
//     toggle: true
// }

// export const Inverted = Template.bind({})
// Inverted.args = {
//     inverted: true,
//     slider: true
// }