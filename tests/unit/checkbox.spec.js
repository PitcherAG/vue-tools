import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue'
const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('Checkbox.vue', () => {
    const wrapper = shallowMount(Checkbox, {
        localVue,
        propsData: {
            value: true,
            label: 'hello'
        }
    })

    // Helper function
    async function updateValue(value) {
        wrapper.setProps({
            value
        })
        await wrapper.vm.$nextTick()
    }

    // Tests
    it('checkbox test', async () => {
        expect(wrapper.find('input').element.checked).toBe(true)
        wrapper.find('.ui.toggle.checkbox').trigger('click')
        await updateValue(false)

        wrapper.find('.ui.toggle.checkbox').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toBe('hello')
        expect(wrapper.emitted().input).toStrictEqual([[false], [true]])
    })
})
