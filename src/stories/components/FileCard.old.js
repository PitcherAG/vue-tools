import FileCard from '../../components/FileCard/FileCard'

export default {
    title: 'Components/FileCard',
    component: FileCard,
    argTypes: {},
    args: {
        body: 'very long name of the file',
        category: 'presentation',
        imgUrl: 'https://btocpitcher.s3.amazonaws.com/thumbs/249549_1509373331.png',
        keywords: '',
        date: new Date().toDateString(),
        isNew: true,
        isFavorite: false
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FileCard },
    template: '<FileCard v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
    fileOptionsItems: []
}
