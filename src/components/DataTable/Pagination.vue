<template>
  <div class="ui pagination menu" :class="size">
    <a class="item icon" :class="{ disabled: pagination.currentPage === 1 }" @click="paginate(1)">
      <i class="icon angle double left" />
    </a>
    <a
      class="item icon"
      :class="{ disabled: pagination.currentPage === 1 }"
      @click="paginate(pagination.currentPage - 1)"
    >
      <i class="icon chevron left" />
    </a>
    <a
      v-for="(p, i) in pagination.pages"
      :key="i"
      class="item"
      :class="{ active: p === pagination.currentPage }"
      @click="paginate(p)"
    >
      {{ p }}
    </a>
    <a
      class="item icon"
      :class="{ disabled: pagination.totalPages === pagination.currentPage }"
      @click="paginate(pagination.currentPage + 1)"
    >
      <i class="icon chevron right" />
    </a>
    <a
      class="item icon"
      :class="{ disabled: pagination.totalPages === pagination.currentPage }"
      @click="paginate(pagination.totalPages)"
    >
      <i class="icon angle double right" />
    </a>
  </div>
</template>

<script>
import has from 'lodash/has'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TablePagination',
  props: {
    pagination: {
      type: Object,
      required: true,
      validator: (item) => {
        const valid =
          has(item, 'currentPage') &&
          has(item, 'totalPages') &&
          has(item, 'startPage') &&
          has(item, 'endPage') &&
          has(item, 'startIndex') &&
          has(item, 'endIndex') &&
          has(item, 'pages')

        if (!valid) {
          console.error('[Vue warn]: Validation error in Pagination.vue!')
          console.error('[Vue warn]: prop.pagination is not valid!')
          throw `
            Expected
            pagination: {
                currentPage: Number,
                totalPages: Number
                startPage: Number
                endPage: Number
                startIndex: Number
                endIndex: Number
                pages: Number
            }
          `
        }

        return valid
      },
    },
    paginate: {
      type: Function,
      validator: (item) => {
        const valid = typeof item === 'function'

        if (!valid) {
          console.error('[Vue warn]: Validation error in Pagination.vue!')
          console.error('[Vue warn]: prop.paginate is not valid!')
          throw `
            Expected
            function paginate(to) { state.pagination.currentPage = to }
          `
        }

        return valid
      },
    },
    size: {
      type: String,
      default: '',
    },
  },
})
</script>
