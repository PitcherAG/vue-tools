import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Modal from '@/components/Modal'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('Modal.vue', () => {
  const wrapper = shallowMount(Modal, {
    localVue,
    propsData: {
      value: false
    }
  })

  // Helper function
  async function updateValue(key, value) {
    wrapper.setProps({
      [key]: value
    })
    await wrapper.vm.$nextTick()
  }

  it('Modal mounts properly', async () => {
    expect(wrapper.find('.ui.modal').exists()).toBe(true)
    expect(wrapper.find('.ui.modal').element.className.includes('visible')).toBe(false)

    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.header').exists()).toBe(false)
    expect(wrapper.find('.actions').exists()).toBe(false)

    expect(wrapper.find('.button.negative').exists()).toBe(false)
    expect(wrapper.find('.button.positive').exists()).toBe(false)
  })

  it('Updating Modal props works', async () => {
    await updateValue('title', 'Register')
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.header').text()).toBe('Register')

    await updateValue('titleIcon', 'user')
    expect(wrapper.find('.header i').exists()).toBe(true)

    // close icon exists
    expect(wrapper.find('.icon.times').exists()).toBe(true)
    wrapper.find('.icon.times').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()

    // hiding works
    await updateValue('hideCloseIcon', true)
    expect(wrapper.find('.icon.times').exists()).toBe(false)

    await updateValue('approveText', 'Submit')
    await updateValue('denyText', 'Cancel')
    expect(wrapper.find('.actions').exists()).toBe(true)
    expect(wrapper.find('.button.positive').exists()).toBe(true)
    expect(wrapper.find('.button.positive').text()).toBe('Submit')
    expect(wrapper.find('.button.negative').exists()).toBe(true)
    expect(wrapper.find('.button.negative').text()).toBe('Cancel')
  })
})
