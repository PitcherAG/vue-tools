import Dropdown from './Dropdown.vue'
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
        }
    },
    args: {
      items: options
    }
};

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

export const Inverted = Template.bind({})
Inverted.args = {
    color: "inverted"
}