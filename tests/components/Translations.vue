<template>
  <div>
    <div>Translations</div>
    <div>{{ $gettext('with gettext in template') }}</div>
    <div>{{ $ngettext('with gettext in template plural', na) }}</div>
    <div>{{ b }}</div>
    <img :title="$gettext('in attribute2')" />
    <img :title="$gettext('in attribute3')" />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties */
import { ref } from '@vue/composition-api'

export default {
  name: 'translations',
  props: {
    title: {
      type: String,
      default: 'hello world'
    },
    subTitle: {
      type: String
    }
  },
  setup() {
    const na = 2
    const asd = 3
    const b = ref($gettext('underscore in js'))
    const c = ref($ngettext('underscore in js', na))
    return { na, asd, b, c }
  }
}
</script>
