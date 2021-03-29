<template>
  <div class="pt-4 fill-height">
    <h3>File Card</h3>
    <div class="ui divider" />

    <!-- Container -->
    <FileCardContainer>
      <FileCard
        v-for="f in data"
        :key="f.ID"
        :imgUrl="f.s3Url"
        :body="f.body"
        :keywords="f.keywords"
        :date="f.startDate.toString()"
        :isNew="f.isNew"
        :isFavorite="f.isFavorite"
        @onClickDownload="test(f)"
      />
    </FileCardContainer>
  </div>
</template>

<script>
import FileCard from '@/components/FileCard/FileCard.vue'
import FileCardContainer from '@/components/FileCard/FileCardContainer.vue'
import data from './dummy.filecard.js'
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'FilecardEx',
  components: {
    FileCard,
    FileCardContainer,
  },
  props: {},
  setup() {
    const state = reactive({
      data,
    })

    const test = (i) => {
      console.log(i)
    }

    return { ...toRefs(state), test }
  },
}
</script>
