import ProgressBar from '../ProgressBar'


export default {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    argTypes: {},
    args: {
        value: 50,
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { ProgressBar },
    template: '<ProgressBar v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {}
