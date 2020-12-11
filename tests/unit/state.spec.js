import CompositionApi, { computed } from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { createStore } from '../../src/store'

class TestStore {
  id = 'hello'

  state = { state_count: 6 }
  count = 5

  get double() {
    console.log('double')
    return this.count * 2
  }

  get doubleState() {
    return this.state.state_count * 2
  }

  on_count() {
    console.log('count changed')
  }
}

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('state', () => {
  it('obj state', () => {
    const a = {
      id: 'test',
      state: { count: 5 },
      double: computed(() => {
        return a.state.count * 2
      }),
      treble: function() {
        return this.state.count * 3
      }
    }
    const store = createStore(a)
    expect(store.double).toBe(10)
    expect(store.double).toBe(10)
    expect(store.treble()).toBe(15)
    store.state.count = 10
    expect(store.double).toBe(20)
  })
  it('class state', () => {
    const store = createStore(new TestStore())
    expect(store.double).toBe(10)
    expect(store.double).toBe(10)
    expect(store.doubleState).toBe(12)
    store.state.state_count = 10
    expect(store.doubleState).toBe(20)
  })
})
