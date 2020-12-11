import CompositionApi from '@vue/composition-api'
import { mount, createLocalVue } from '@vue/test-utils'
import FileCard from '@/components/FileCard/FileCard'
import { TranslationPlugin } from '@/'

const localVue = createLocalVue()
localVue.use(CompositionApi)
localVue.use(TranslationPlugin)

describe('FileCard.vue', () => {
    const item = {
        body: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        imgUrl: 'https://btocpitcher.s3.amazonaws.com/thumbs/1450100793180_153693233.png',
        keywords: 'p:Edoxaban, Sys:AllowDownload',
        date: '23 Sept',
        isNew: true,
        isFavorite: false,
        newText: 'NewText',
        shareText: 'Share',
        downloadText: 'Download',
        showFileOptions: false
    }

    const wrapper = mount(FileCard, {
        localVue,
        propsData: {
            ...item
        }
    })

    // Helper function
    async function updateValue(key, value) {
        wrapper.setProps({
            [key]: value
        })
        await wrapper.vm.$nextTick()
    }

    it('FileCard mounts properly', async () => {
        expect(wrapper.find('.ui.red.mini.label').exists()).toBe(true)
        expect(wrapper.find('.ui.red.mini.label').text()).toBe(item.newText)

        expect(wrapper.find('.file-card__file-name').text()).toBe(item.body)
        expect(wrapper.find('.file-card__keywords').text()).toBe(item.keywords)

        expect(wrapper.find('.option-button').exists()).toBe(false)
        expect(wrapper.find('.file-card__stacked.left.bottom').exists()).toBe(true)
    })

    it('Updating FileCard props works', async () => {
        await updateValue('newText', 'New')
        expect(wrapper.find('.ui.red.mini.label').text()).toBe('New')

        await updateValue('isNew', false)
        expect(wrapper.find('.ui.red.mini.label').exists()).toBe(false)

        await updateValue('showFileOptions', true)
        expect(wrapper.find('.pitcher-dropdown').exists()).toBe(true)
        expect(wrapper.find('.option-button').exists()).toBe(true)
        expect(wrapper.find('.pitcher-dropdown .menu').element.childElementCount).toBe(2)
    })

    it('FileCard click emits works', async () => {
        wrapper.find('.file-card__stacked.button.left').trigger('click')
        expect(wrapper.emitted().onClickFavorite).toBeTruthy()

        wrapper.find('.file-card__content--image').trigger('click')
        expect(wrapper.emitted().onClickImage).toBeTruthy()

        // click options to expand menu
        wrapper.find('.option-button').trigger('click')
        wrapper.find('.pitcher-dropdown .item:nth-child(1)').trigger('click')
        wrapper.find('.pitcher-dropdown .item:nth-child(2)').trigger('click')
        expect(wrapper.emitted().onClickDownload).toBeTruthy()
        expect(wrapper.emitted().onClickShare).toBeTruthy()
    })
})
