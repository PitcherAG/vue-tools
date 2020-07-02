import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Calendar from '../../src/components/Calendar'
import { TranslationPlugin } from '../../src'
const localVue = createLocalVue()
localVue.use(CompositionApi)
localVue.use(TranslationPlugin)
describe('Calendar.vue', () => {
    const wrapper = shallowMount(Calendar, {
        localVue,
        propsData: {
            value: '2002-01-15',
            type: 'date'
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
    it('calendar test', async () => {
        expect(wrapper.find('input').element.value).toBe('2002-01-15')
        await updateValue('2020-01-15')
        expect(wrapper.find('input').element.value).toBe('2020-01-15')

        expect(wrapper.text()).toBe(
            'January 2020SMTWTFS2930311234567891011121314151617181920212223242526272829303112345678Today'
        )
        wrapper.find('input').trigger('click')
        await wrapper.vm.$nextTick()
        wrapper.find('.ui.popup.calendar')
        expect(wrapper.find('td.active + td.link').text()).toBe('16')
        wrapper.find('td.active + td.link').trigger('click')
        /*await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('input').element.value).toBe('2020-01-16')
        expect(wrapper.emitted().input).toStrictEqual([[false], [true]])*/
    })
})
