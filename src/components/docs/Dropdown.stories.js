import Dropdown from '../Dropdown'
import { options } from './data.dropdown'


export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    argTypes: {
        size: { control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'] } },
        color: {
            control: {
                type: 'select',
                options: ['primary', 'inverted']
            }
        },
        value: { control: { disable: true } },
        itemText: { control: { disable: true } },
        itemValue: { control: { disable: true } },
        action: { control: { disable: true } }
    },
    args: {
        items: options
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Dropdown },
    template: '<Dropdown v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
    value: {}
}

export const Small = Template.bind({})
Small.args = {
    size: 'small'
}

export const Large = Template.bind({})
Large.args = {
    size: 'large'
}

export const Compact = Template.bind({})
Compact.args = {
    compact: true
}

export const Multiselect = Template.bind({})
Multiselect.args = {
    multiple: true
}

export const Inverted = Template.bind({})
Inverted.args = {
    color: 'inverted'
}