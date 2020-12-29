<template>
  <div ref="calendar" class="ui calendar pitcher-calendar">
    <div class="ui input left icon" v-bind="inputAttr">
      <i class="calendar icon" />
      <input ref="input" type="text" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties, vue/no-deprecated-props-default-this */
import { onMounted, reactive, computed, watch, toRefs } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'
import { formatDate, formatTime } from '../i18n/date.js'

export default {
  name: 'calendar',
  props: {
    value: {
      type: [String, Date],
      required: true
    },
    type: {
      default: 'datetime',
      validator: value => {
        return ['datetime', 'date', 'time', 'month', 'year'].indexOf(value) !== -1
      }
    },
    minDate: [String, Date],
    maxDate: [String, Date],
    startMode: {
      default: 'day',
      validator: value => {
        return ['year', 'month', 'day', 'hour', 'minute'].indexOf(value) !== -1
      }
    },
    defaultText: {
      type: String,
      default: 'Date/Time'
    },
    showAmPm: {
      type: Boolean,
      default: false
    },
    showToday: {
      type: Boolean,
      default: true
    },
    showWeekNumbers: {
      type: Boolean,
      default: false
    },
    minTimeGap: {
      type: Number,
      default: 10
    },
    disabledDaysOfWeek: Array,
    disabledDates: Array,
    enabledDates: Array,
    eventDates: Array,
    eventClass: String,
    disableYear: Boolean,
    disableMonth: Boolean,
    disableMinute: Boolean,
    disableValueFormatting: {
      type: Boolean,
      default: false
    },
    valueFormatter: {
      type: Function,
      required: false,
      // must be function instead of array function to be able to reach component instance
      default: function(date) {
        // if date time
        if (this.type.includes('time')) {
          return date.toISOString()
        }

        // if date format
        const yyyy = date.getFullYear().toString()
        const mm = (date.getMonth() + 1).toString()
        const dd = date.getDate().toString()
        return `${yyyy}-${mm[1] ? mm : '0' + mm[0]}-${dd[1] ? dd : '0' + dd[0]}`
      }
    },
    disableInputFormatting: {
      type: Boolean,
      default: false
    },
    // inputFormatter: {
    //   type: Function,
    //   required: false,
    //   default: function(dateTime) {
    //     // if date time
    //     if (this.type.includes('time')) {
    //       const date = formatDate(dateTime)
    //       const time = formatTime(dateTime)
    //       const res = `${date} ${time}`
    //       console.log('----------------------------------------')
    //       console.log(date)
    //       console.log(time)
    //       console.log(res)
    //       console.log('----------------------------------------')
    //       return res
    //     }
    //   }
    // },
    setting: Object,
    action: {
      type: String,
      default: 'activate'
    },
    fluid: Boolean,
    disabled: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    error: Boolean,
    minWidth: {
      type: [Number, String]
    },
    maxWidth: {
      type: [Number, String],
      default: '100%'
    },
    size: {
      type: String,
      validator: val => validateSize(val, 'Calendar.vue')
    }
  },
  emits: ['input', 'onBeforeChange', 'onShow', 'onVisible', 'onHide', 'onHidden', 'onSelect'],

  setup(props, { emit, refs, root }) {
    const state = reactive({
      placeholder: computed(() => (props.defaultText === 'Date/Time' ? $gettext('Date/Time') : props.defaultText))
    })

    const inputAttr = computed(() => ({
      class: {
        fluid: props.fluid,
        loading: props.loading,
        disabled: props.disabled || props.loading,
        error: props.error,
        [props.size]: !!props.size
      },
      style: {
        minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
        maxWidth: parsePxStyle(props.maxWidth)
      }
    }))

    const parseDate = dateString => {
      if (!dateString) return undefined

      // eslint-disable-next-line valid-typeof
      if (typeof dateString === 'Date') {
        return dateString
      }

      const regex = /\+\d{4}/g
      let date = dateString

      if (date.match(regex)) {
        date = date.replace(regex, '')
      }

      return new Date(date)
    }

    const initCalendar = () => {
      const settings = {
        type: props.type,
        minDate: parseDate(props.minDate),
        maxDate: parseDate(props.maxDate),
        initialDate: props.value,
        startMode: props.startMode,
        today: props.showToday,
        ampm: props.showAmPm,
        showWeekNumbers: props.showWeekNumbers,
        disabledDaysOfWeek: props.disabledDaysOfWeek,
        disabledDates: props.disabledDates,
        enabledDates: props.enabledDates,
        eventDates: props.eventDates,
        eventClass: props.eventClass,
        disableYear: props.disableYear,
        disableMonth: props.disableMonth,
        disableMinute: props.disableMinute,
        touchReadonly: true,
        action: props.action,
        minTimeGap: props.minTimeGap,
        on: 'click',
        text: {
          days: $gettext('S,M,T,W,T,F,S').split(','),
          months: [
            $gettext('January'),
            $gettext('February'),
            $gettext('March'),
            $gettext('April'),
            $gettext('May'),
            $gettext('June'),
            $gettext('July'),
            $gettext('August'),
            $gettext('September'),
            $gettext('October'),
            $gettext('November'),
            $gettext('December')
          ],
          monthsShort: [
            $gettext('Jan'),
            $gettext('Feb'),
            $gettext('Mar'),
            $gettext('Apr'),
            $gettext('May'),
            $gettext('Jun'),
            $gettext('Jul'),
            $gettext('Aug'),
            $gettext('Sep'),
            $gettext('Oct'),
            $gettext('Nov'),
            $gettext('Dec')
          ],
          today: $gettext('Today'),
          now: $gettext('Now'),
          am: $gettext('AM'),
          pm: $gettext('PM')
        },
        onChange: date => {
          let result = date

          // if formatting disabled, emit raw value
          if (props.disableValueFormatting) {
            emit('input', result)
          }

          // format
          result = props.valueFormatter(result)
          emit('input', result)
        },
        onBeforeChange: () => emit('onBeforeChange'),
        onShow: () => emit('onShow'),
        onVisible: () => emit('onVisible'),
        onHide: () => emit('onHide'),
        onHidden: () => emit('onHidden'),
        onSelect: () => emit('onSelect'),
        // merge with settings
        ...props.setting
      }

      // add formatter conditionally
      if (!props.disableInputFormatting) {
        settings.formatter = {
          date: internalDate => (internalDate ? formatDate(props.value) : ''),
          time: internalDate => (internalDate ? formatTime(props.value) : '')
        }
      }

      $(refs.calendar).calendar(settings)
    }

    onMounted(() => {
      root.$nextTick(() => {
        initCalendar()
      })
    })

    // props watch list for re-initializing calendar
    const watchList = [
      () => props.value,
      () => props.minDate,
      () => props.maxDate,
      () => props.type,
      () => props.startMode,
      () => props.defaultText,
      () => props.showAmPm,
      () => props.showToday,
      () => props.showWeekNumbers,
      () => props.disabledDaysOfWeek,
      () => props.disabledDates,
      () => props.enabledDates,
      () => props.eventDates,
      () => props.eventClass,
      () => props.disableYear,
      () => props.disableMonth,
      () => props.disableMinute,
      () => props.action,
      () => props.settings,
      () => props.disableValueFormatting,
      () => props.valueFormatter,
      () => props.disableInputFormatting
    ]

    watch(watchList, () => {
      initCalendar()
    })
    return { ...toRefs(state), inputAttr, initCalendar }
  }
}
</script>

<style lang="scss" scoped>
.pitcher-calendar {
  input:hover {
    cursor: pointer;
  }

  ::v-deep {
    input::-ms-clear {
      display: none !important;
    }
  }
}
</style>
