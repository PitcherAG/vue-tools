<template>
    <div>
        <button type="button" class="ui button" @click="showSidebar">Show Sidebar</button>
        <Sidebar>
            <div class="item">
                <h2 class="header">{{ data.name }}</h2>
            </div>
            <div class="item">
                {{ data.description }}
            </div>
        </Sidebar>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
    setup() {
        const sidebar = Sidebar.useSidebarStore()
        sidebar.data = {
            ...sidebar.data,
            ...{
                name: 'Pitcher',
                description: 'UI'
            }
        }
        const showSidebar = () => {
            sidebar.show()
        }
        return {
            showSidebar,
            data: sidebar.data
        }
    },
    components: {
        Sidebar
    }
}
</script>
