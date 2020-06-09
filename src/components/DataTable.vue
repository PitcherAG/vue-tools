<template>
    <div class="pb-12">
        <table class="ui table celled" :class="tableClasses">
            <thead>
                <tr v-if="!hideHeader">
                    <!-- If heading-row slot exist, override with a slot -->
                    <template v-if="hasHeadingRowSlot">
                        <!-- map only visible fields, return rawData as well -->
                        <slot name="heading-row" :rowData="fields.filter(f => !f.hide)" :raw="fields" />
                    </template>
                    <template v-else v-for="f in fields">
                        <!-- default table heading -->
                        <th v-if="!f.hide" :key="f.name" :class="f.dataClass">
                            {{ f.title }}
                        </th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, dKey) in data" :key="dKey">
                    <!-- If row slot exist, override with a slot -->
                    <template v-if="hasRowSlot">
                        <!-- map only visible fields, return rawData as well -->
                        <slot name="row" :rowData="getFilteredData(item)" :raw="item" />
                    </template>

                    <!-- Default Row content -->
                    <template v-else v-for="(f, fKey) in fields">
                        <td v-if="!f.hide" :key="fKey" :class="f.contentClass">
                            <!-- if this field is a slot, get the slot -->
                            <template v-if="f.dataField.includes('__slot:')">
                                <slot :name="f.dataField.replace('__slot:', '')" :data="item" />
                            </template>
                            <!-- otherwise use the prop from data -->
                            <template v-else>
                                {{ item[f.dataField] }}
                            </template>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        hideHeader: {
            type: Boolean,
            default: false
        },
        sortable: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        const tableClasses = {
            sortable: props.sortable
        }

        const slotChecks = {
            hasRowSlot: !!slots.row,
            hasHeadingRowSlot: !!slots['heading-row']
        }

        // filtered data thru fields
        function getFilteredData(item) {
            const filtered = []
            props.fields.forEach(f => {
                if (!f.hide && !f.dataField.includes('__slot:')) {
                    filtered.push(item[f.dataField])
                }
            })
            return filtered
        }

        return { tableClasses, ...slotChecks, getFilteredData }
    }
})
</script>

<style lang="scss" scoped></style>
