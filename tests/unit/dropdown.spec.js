import CompositionApi from '@vue/composition-api'
import Dropdown from '@/components/Dropdown'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(CompositionApi)

describe('Dropdown.vue', () => {
  const items = [
    { name: 'Hello', value: 'hello', type: 'item hello' },
    { name: 'World', value: 'world', type: 'item world' },
  ]

  const wrapper = shallowMount(Dropdown, {
    localVue,
    propsData: {
      value: '',
      items,
      itemText: 'name',
      itemValue: 'value',
      defaultText: 'select',
    },
  })

  // Helper function
  async function updateValue(key, value) {
    wrapper.setProps({
      [key]: value,
    })
    await wrapper.vm.$nextTick()
  }

  it('Dropdown mounts properly', async () => {
    expect(wrapper.find('.default').text()).toBe(wrapper.vm.$props.defaultText)
    expect(wrapper.find('.custom-text').text()).toBe('')
    expect(wrapper.find('.menu .header').exists()).toBe(false)
    expect(wrapper.find('.menu .divider').exists()).toBe(false)
    expect(wrapper.vm.$props.selection).toBe(true)
  })

  it('Updating dropdown items works', async () => {
    await updateValue('items', [
      { name: 'Test header', type: 'header' },
      { name: 'Test Item', value: 'new-item', type: 'item test' },
      { type: 'divider' },
      ...items,
    ])
    expect(wrapper.find('.menu .item.test').text()).toBe('Test Item')
    expect(wrapper.find('.menu .header').exists()).toBe(true)
    expect(wrapper.find('.menu .divider').exists()).toBe(true)
  })

  it('Dropdown value changes on click', async () => {
    wrapper.find('.item.world').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.find('input[type="hidden"]').element.value).toBe('world')
    expect(wrapper.find('.menu .item.world').text()).toBe('World')
  })
})
