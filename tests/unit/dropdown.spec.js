import { shallowMount } from '@vue/test-utils'
import Dropdown from '../../src/components/Dropdown'

describe('Dropdown.vue', () => {
    it('dropdown value changes', async () => {
        const wrapper = shallowMount(Dropdown, {
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
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toBe('select')

        wrapper.setProps({ value: 1 })
        expect(wrapper.props().value).toBe(1)
        /*await wrapper.vm.$nextTick()
        wrapper.trigger('click')
        await wrapper.vm.$nextTick()
        wrapper.findAll('.item').at(0).trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.props().value).toBe(2)*/
    })
})
