<template>
    <div class="pt-4 fill-height">
        <h3>File Card</h3>
        <div class="ui divider" />

        <!-- Container -->
        <FileCardContainer>
            <FileCard
                v-for="f in data"
                :key="f.ID"
                :img-url="f.s3Url"
                :body="f.body"
                :keywords="f.keywords"
                :date="f.startDate.toString()"
                :is-new="f.isNew"
                :is-favorite="f.isFavorite"
                @onClickDownload="test(f)"
            />
        </FileCardContainer>
    </div>
</template>

<script>
import FileCard from '@/components/FileCard/FileCard.vue'
import FileCardContainer from '@/components/FileCard/FileCardContainer.vue'
import { reactive, toRefs } from '@vue/composition-api'
import data from './dummy.filecard.js'

export default {
    components: {
        FileCard,
        FileCardContainer
    },
    props: {},
    setup() {
        const state = reactive({
            data
        })

        const test = i => {
            console.log(i)
        }

        return { ...toRefs(state), test }
    }
}
</script>
