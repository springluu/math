<template>
  <label class="app-checkbox">
    <input
      type="checkbox"
      class="app-checkbox__input"
      hidden
      v-bind="$attrs"
      v-on="inputListeners"
      v-model="localChecked"
    />
    <span class="app-checkbox__checkmark">
      <IconCheckBox class="app-checkbox__icon app-checkbox__icon--checked icon fill-opacity-1 fill-primary" />
      <IconCheckBoxOutlineBlank
        class="app-checkbox__icon app-checkbox__icon--unchecked icon fill-opacity-1"
      />
    </span>
    <span v-if="label || $slots.default" class="app-checkbox__text" :class="{'text-primary': checked && isChangeLabelColor}">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
const IconCheckBox = () =>
  import("~/assets/svg/v2-icons/check_box_24px.svg?inline");
const IconCheckBoxOutlineBlank = () =>
  import("~/assets/svg/v2-icons/check_box_outline_blank_24px.svg?inline");

export default {
  inheritAttrs: false,

  components: {
    IconCheckBox,
    IconCheckBoxOutlineBlank
  },

  model: {
    prop: "checked",
    event: "change"
  },

  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    isChangeLabelColor: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localChecked: this.checked
    }
  },

  computed: {
    inputListeners: function() {
      const vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          change: (event) => this.handleChange(event),
        }
      );
    },
  },

  watch: {
    checked(newValue) {
      this.localChecked = newValue
    },

    localChecked(newValue) {
      this.$emit("change", newValue)
    }
  },

  methods: {
    handleChange(e) {
      this.localChecked = e.target.checked;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-checkbox.scss";
</style>