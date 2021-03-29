<template>
  <div>
    <ProgressBar :value="barModel" :color="color" :total="total" @onChange="log" />
    <!-- <ProgressBar :value="barModel" :total="total" :color="color" show-label @onChange="log">
            <template #label="{ percent, value, total }">
                percent: {{ percent }} value: {{ value }} total: {{ total }}
            </template>
        </ProgressBar> -->

    <div class="selectors">
      <button @click="decrease">decrease value</button>
      <button @click="increase">increase value</button>
      <button @click="updateTotal">update total</button>
      <button @click="makeBlue">make blue</button>

      <select v-model="color">
        <option disabled>pick a color</option>
        <option v-for="clr in colors" :key="clr.id">{{ clr }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'ProgressbarEx',
  components: {
    ProgressBar,
  },
  setup() {
    const state = reactive({
      barModel: 15,
      counter: 5,
      total: 100,
      min: 10,
      color: 'blue',
      colors: ['blue', 'purple', 'orange', 'red', 'green', 'black'],
    })

    function decrease() {
      if (state.min + state.counter <= state.barModel) {
        state.barModel = state.barModel - state.counter
      }
    }

    function increase() {
      if (state.total - state.counter >= state.barModel) {
        state.barModel = state.barModel + state.counter
      }
    }

    function updateTotal() {
      state.total = 200
    }

    function makeBlue() {
      state.color = 'blue'
    }

    function log(result) {
      console.log('percent:', result.percent, 'value:', result.value, 'total:', result.total)
    }

    return { ...toRefs(state), increase, decrease, updateTotal, makeBlue, log }
  },
})
</script>

<style lang="scss" scoped>
.selectors {
  margin-top: 30px;
  select:not(:first-child),
  button:not(:first-child) {
    margin-left: 5px;
  }
}
</style>
