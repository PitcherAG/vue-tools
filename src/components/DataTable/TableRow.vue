<template>
  <tr v-bind="trAttr" @click="emit('click')">
    <!-- If row slot exist, override with a slot -->
    <template v-if="hasSlot.row">
      <slot name="row" />
    </template>

    <!-- Default Row content -->
    <template v-else v-for="f in fields">
      <td :key="f.__colID" :class="f.tdClass">
        <!-- if this field is a slot, get the slot -->
        <template v-if="!!f.slotName">
          <slot :name="f.slotName" />
        </template>
        <!-- otherwise use the prop from data -->
        <template v-else>
          <!-- Transform function, return mapped object, root object & field object -->
          {{ f.transform ? f.transform(mapper(f.dataField, item), item, f) : mapper(f.dataField, item) }}
        </template>
      </td>
    </template>
  </tr>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { mapper } from './table.helpers'

export default defineComponent({
  name: 'table-row',
  props: {
    fields: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    trClass: {
      type: [String, Function],
      default: undefined
    }
  },
  setup(props, ctx) {
    const trAttr = computed(() => ({
      class: typeof props.trClass === 'function' ? props.trClass(props.item) : props.trClass
    }))

    const hasSlot = computed(() => ({
      row: !!ctx.slots.row
    }))

    return { trAttr, emit: ctx.emit, hasSlot, mapper }
  }
})
</script>

<style lang="scss"></style>
