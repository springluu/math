<template>
  <label class="app-checkbox">
    <input type="checkbox" class="app-checkbox__input" hidden v-bind="$attrs" :checked="checked" @change="handleChange" />
    <div class="app-checkbox__checkmark">
      <IconCheck class='icon' />
    </div>
    <div class="app-checkbox__text">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>
import IconCheck from '~/assets/svg/design-icons/check.svg?inline';

export default {
  inheritAttrs: false,

  components: {
    IconCheck
  },

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: {
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleChange(e) {
      this.$emit("change", e.target.checked);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-checkbox.scss";
</style>