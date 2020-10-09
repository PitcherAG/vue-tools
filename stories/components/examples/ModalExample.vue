<template>
    <div>
        <button type="button" class="ui button" @click="showModal = true">Show modal</button>
        <Modal v-model="showModal" title="Register" title-icon="user" approve-text="Submit" deny-text="Cancel">
            <form class="ui form">
                <div class="field">
                    <label>First Name</label>
                    <input type="text" name="first-name" placeholder="First Name" />
                </div>
                <div class="field">
                    <label>Last Name</label>
                    <input type="text" name="last-name" placeholder="Last Name" />
                </div>
            </form>
        </Modal>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import Modal from '@/components/Modal.vue'

export default {
    setup() {
        const showModal = ref(false)
        return {
            showModal
        }
    },
    components: {
        Modal
    }
}
</script>
