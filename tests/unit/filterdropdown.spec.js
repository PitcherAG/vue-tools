import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FilterDropdown from '@/components/FilterDropdown'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('FilterDropdown.vue', () => {
    const items = [
        { name: 'Hello', value: 'hello', type: 'item hello' },
        { name: 'World', value: 'world', type: 'item world' }
    ]

    const wrapper = shallowMount(FilterDropdown, {
        localVue,
        propsData: {
            value: [],
            items,
            itemText: 'name',
            itemValue: 'value',
            title: 'FilterTestTitle',
            icon: 'filter',
            hideSearch: false
        }
    })

    // Helper function
    async function updateValue(key, value) {
        wrapper.setProps({
            [key]: value
        })
        await wrapper.vm.$nextTick()
    }

    it('FilterDropdown mounts properly', async () => {
        expect(wrapper.find('.button-text').text()).toBe(wrapper.vm.$props.title)
        expect(wrapper.find(`.icon.${wrapper.vm.$props.icon}`).exists()).toBe(true)

        expect(wrapper.find('.h-container .ui.header').text()).toBe(wrapper.vm.$props.title)
        expect(wrapper.vm.$data.buttonText).toBe(wrapper.vm.$props.title)

        expect(wrapper.find('.sub-menu').exists()).toBe(true)
        expect(wrapper.find('.sub-menu').element.childElementCount).toBe(wrapper.vm.$props.items.length)

        expect(wrapper.find('.item.hello').text()).toBe(items[0].name)
        expect(wrapper.find('.item.world').text()).toBe(items[1].name)

        expect(wrapper.find('.s-container input').exists()).toBe(true)

        wrapper.find('.ui.buttons button').trigger('click')
    })

    it('Updating FilterDropdown items works', async () => {
        await updateValue('items', [
            ...items,
            { name: 'Test Item', value: 'new-item', type: 'item test' },
            { name: 'Test header', type: 'header' },
            { type: 'divider' }
        ])
        expect(wrapper.find('.item.test').text()).toBe('Test Item')
        expect(wrapper.find('.menu .header').exists()).toBe(true)
        expect(wrapper.find('.menu .divider').exists()).toBe(true)
    })

    it('FilterDropdown search works', async () => {
        await updateValue('hideSearch', false)
        expect(wrapper.find('.s-container input').exists()).toBe(true)

        wrapper.vm.$data.searchKey = 'Hello'
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.s-container input').element.value).toBe('Hello')
        expect(wrapper.find('.sub-menu').element.childElementCount).toBe(1)
    })

    it('FilterDropdown reset works', async () => {
        wrapper.vm.$data.reset()
        await wrapper.vm.$nextTick()
        wrapper.vm.$data.searchKey = ''
        expect(wrapper.find('.s-container input').element.value).toBe('')
    })

    it('FilterDropdown value changes', async () => {
        // click item
        wrapper.find('.item.hello').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().input).toBeTruthy()

        await updateValue('value', ['hello', 'world'])
        expect(wrapper.vm.$data.buttonText).toBe('Hello, World')
    })
})
