import CompositionApi from '@vue/composition-api'
import Sidebar from '@/components/Sidebar.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(CompositionApi)

describe('Sidebar.vue', () => {
  const wrapper = shallowMount(Sidebar, {
    localVue,
  })

  it('sidebar test', async () => {
    const store = Sidebar.useSidebarStore()

    store.show()
    const sidebar = wrapper.find('.ui.sidebar')

    expect(sidebar.exists()).toBe(true)
  })
})
