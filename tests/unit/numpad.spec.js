import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import NumpadInput from '@/components/NumpadInput.vue'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('NumpadInput.vue', () => {
    const wrapper = shallowMount(NumpadInput, {
        localVue,
        propsData: {
            value: '0.00',
            decimals: 2,
            group: 'foo',
            max: 1000000
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
    it('Numpad is visible on input focus', async () => {
        wrapper.find('input').trigger('focus')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.numpad').exists()).toBe(true)
    })

    it('Numpad Input emits value changes', async () => {
        // get first number input button & click
        wrapper.find('.row--number').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().input).toBeTruthy()
    })

    it('Updated props value updates input value', async () => {
        // const currentVal = wrapper.find('input').element.value
        const value = '250.00'
        await updateValue(value)
        expect(wrapper.find('input').element.value).toBe(value)
    })

    it('incDec function increase value', async () => {
        const oldValue = parseInt(wrapper.find('input').element.value)
        wrapper.vm.incDec('inc')
        expect(wrapper.emitted().input).toBeTruthy()
        await updateValue(wrapper.emitted().input[1][0])
        expect(parseInt(wrapper.find('input').element.value)).toBeGreaterThan(oldValue)
    })

    it('incDec function decrease value', async () => {
        const oldValue = parseInt(wrapper.find('input').element.value)
        wrapper.vm.incDec('dec')
        expect(wrapper.emitted().input).toBeTruthy()
        await updateValue(wrapper.emitted().input[2][0])
        expect(parseInt(wrapper.find('input').element.value)).toBeLessThan(oldValue)
    })

    it('Backspace removes last char', async () => {
        const oldValueLength = wrapper.find('input').element.value.length
        wrapper.vm.backspace()
        expect(wrapper.emitted().input).toBeTruthy()
        await updateValue(wrapper.emitted().input[3][0])
        expect(wrapper.find('input').element.value.length).toBeLessThan(oldValueLength)
    })

    it('Clear function sets input value to zero', async () => {
        wrapper.vm.reset()
        expect(wrapper.emitted().input).toBeTruthy()
        await updateValue(wrapper.emitted().input[4][0])
        expect(wrapper.find('input').element.value).toBe(wrapper.emitted().input[4][0])
    })
})
