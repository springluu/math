<template>
  <div
    class="cgi-form-group d-flex justify-content-start align-items-center"
  >
    <h2 class="cgi-form-title heading-6 mr-4">Trình độ</h2>
    <app-select
      style="width: 60%"
      class="cc-select"
      :options="levelOpt"
      placeholder="Chọn lớp"
      @change="handleChangeLevel"
      label="name"
      :value="level && level.id"
    >
      <template slot="placeholder-icon">
        <IconAngleDown class="icon" />
      </template>
    </app-select>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { useEffect } from "~/utils/common";

export default {
  components: {
    IconAngleDown,
  },

  props: {
    defaultValue: {
      default: "",
    },
  },

  data() {
    return {
      level: {},
    };
  },

  mounted() {
    this.$store.dispatch(
      `elearning/public/public-levels/${actionTypes.ELEARNING.LEVEL}`
    );
    useEffect(this, this.handleChangeLevels.bind(this), [
      "defaultValue",
      "levels",
    ]);
  },

  computed: {
    ...mapState("elearning/public/public-levels", {
      levels: "levels",
    }),

    levelOpt() {
      return this.levels.map((item) => ({
        ...item,
        value: item.id,
        text: item.name,
      }));
    },
  },

  methods: {
    get,
    handleChangeLevel(level) {
      this.$emit("handleChangeLevel", level);
    },
    handleChangeLevels() {
      this.level = this.levels.filter(
        (level) => level.id == this.defaultValue
      )[0];
    },
  },
};
</script>
