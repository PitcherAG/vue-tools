import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar'
import { TranslationPlugin } from '@/'

const localVue = createLocalVue()
localVue.use(CompositionApi)
localVue.use(TranslationPlugin)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

describe('ProgressBar.vue', () => {
    const wrapper = shallowMount(ProgressBar, {
        localVue,
        propsData: {
            value: 10,
            showLabel: false
        }
    })

    // Helper function
    async function updateValue(key, value) {
        wrapper.setProps({
            [key]: value
        })
        await wrapper.vm.$nextTick()
    }

    it('Progress Bar mounts properly', async () => {
        expect(wrapper.find('.ui.progress .progress').exists()).toBe(true)
        expect(wrapper.find('.label').exists()).toBe(false)
        expect(wrapper.vm.exec('get total')).toBe(wrapper.vm.$props.total)
        expect(wrapper.vm.exec('get percent')).toBe(wrapper.vm.$data.percent)
        expect(wrapper.find('.ui.progress .progress').text()).toBe(`${wrapper.vm.$props.value}%`)
    })

    it('Updating Progress Bar works', async () => {
        await updateValue('showLabel', true)
        expect(wrapper.find('.ui.progress .label').exists()).toBe(true)
        expect(wrapper.find('.ui.progress .label').text()).toBe(`${wrapper.vm.$props.value}% completed`)

        await updateValue('value', 15)
        // need to delay 1 sec as it animates the text inside as well
        await delay(1000)
        expect(wrapper.find('.ui.progress .progress').text()).toBe(`${wrapper.vm.$props.value}%`)
    })
})
