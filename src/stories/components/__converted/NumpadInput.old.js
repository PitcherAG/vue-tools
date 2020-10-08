import NumpadInput from '../../components/NumpadInput'


export default {
    title: 'Components/NumpadInput',
    component: NumpadInput,
    argTypes: {
        size: { control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'] } },
    },
    args: {
        value: 50,
        group: 'test'
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { NumpadInput },
    template: '<NumpadInput v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {}
