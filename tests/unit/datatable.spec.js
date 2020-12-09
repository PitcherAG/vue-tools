import CompositionApi from '@vue/composition-api'
import { mount, createLocalVue } from '@vue/test-utils'
import DataTable from '@/components/DataTable/DataTable.vue'
import data from '../helpers/table-dummy-data'

const localVue = createLocalVue()
localVue.use(CompositionApi)

const options = {
    searchFor: '',
    searchFields: ['title'],
    noHeader: false,
    noPagination: false,
    noDataText: 'No data!',
    fixedHeader: false,
    width: '50%',
    perPage: 5
}

const fields = [
    {
        title: 'Id',
        dataField: 'id',
        hide: true
    },
    {
        title: 'Title',
        dataField: 'title',
        icon: 'cog',
        sortable: true,
        thClass: 'center aligned th_find_me',
        tdClass: 'center aligned td_find_me'
    },
    {
        title: 'Url',
        dataField: 'url',
        transform: val => `url: ${val}`
    },
    {
        title: 'Created Date',
        dataField: 'createdDate'
    },
    {
        title: 'Actions',
        dataField: '__slot:actions'
    }
]

describe('DataTable.vue', () => {
    const wrapper = mount(DataTable, {
        localVue,
        propsData: {
            fields,
            data,
            ...options
        }
    })

    // Helper function
    async function updateValue(key, value) {
        wrapper.setProps({
            [key]: value
        })
        await wrapper.vm.$nextTick()
    }

    // Tests
    it('DataTable mounts properly', async () => {
        // match row count to options
        expect(wrapper.find('tbody').element.childElementCount).toBe(options.perPage)
        // check heading is there
        expect(wrapper.find('thead').exists()).toBe(true)
        // check pagination is there
        expect(wrapper.find('.ui.pagination.menu').exists()).toBe(true)
        // check table width
        expect(wrapper.find('table').element.style.width).toBe(options.width)

        // th class added
        expect(wrapper.find('.th_find_me').exists()).toBe(true)
        // th icon exist
        expect(wrapper.find('.icon.cog').exists()).toBe(true)
        // th class added
        expect(wrapper.find('.td_find_me').exists()).toBe(true)
    })

    it('Updating props value effects table view', async () => {
        // update perPage
        // when perPage is higher than the data amount, pagination should not exist
        await updateValue('perPage', 500)
        expect(wrapper.find('.ui.pagination.menu').exists()).toBe(false)
        await updateValue('perPage', 30)
        expect(wrapper.find('.ui.pagination.menu').exists()).toBe(true)
        expect(wrapper.find('tbody').element.childElementCount).toBe(30)

        // update fixed header
        await updateValue('fixedHeader', true)
        expect(wrapper.find('table').element.classList.contains('fixed-header')).toBe(true)

        // update noHeading
        await updateValue('noHeader', true)
        expect(wrapper.find('thead').exists()).toBe(false)

        // update table width
        await updateValue('width', '100%')
        expect(wrapper.find('table').element.style.width).toBe('100%')

        // no data
        await updateValue('data', [])
        expect(wrapper.find('table').exists()).toBe(false)
        expect(wrapper.find('span').text()).toBe(options.noDataText)

        // reset changes
        await updateValue('data', data)
        await updateValue('fixedHeader', false)
        await updateValue('noHeader', false)
        await updateValue('perPage', 5)
    })

    it('Search is working', async () => {
        // searching should give 1 result
        await updateValue('searchFor', 'searchMe')
        expect(wrapper.find('tbody').element.childElementCount).toBe(1)

        // resetting should set all to default
        await updateValue('searchFor', '')
        expect(wrapper.find('tbody').element.childElementCount).toBe(5)

        // nested search should give 1 result
        await updateValue('searchFields', ['nested.test'])
        await updateValue('searchFor', 'nestedSearchMe')
        expect(wrapper.find('tbody').element.childElementCount).toBe(1)

        // reset changes
        await updateValue('searchFields', ['title'])
        await updateValue('searchFor', 'nestedSearchMe')
    })
})
