import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dropdown from '@/components/Dropdown'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('Dropdown.vue', () => {
    const wrapper = shallowMount(Dropdown, {
        localVue,
        propsData: {
            options: [
                { name: 'hello', value: 1 },
                { name: 'world', value: 2 }
            ],
            textField: 'name',
            valueField: 'value',
            defaultText: 'select',
            value: null
        }
    })
    it('dropdown value changes', async () => {
        expect(wrapper.find('.default').text()).toBe(`select`)
        expect(wrapper.find('.text').text()).toBe(``)

        wrapper.setProps({ value: 1 })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.text').text()).toBe('hello')
    })
})
