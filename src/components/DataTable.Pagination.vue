<template>
    <div class="ui pagination menu">
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
            class="item"
            :key="i"
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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        pagination: {
            type: Object,
            required: true
        },
        paginate: {
            type: Function
        }
    }
})
</script>
