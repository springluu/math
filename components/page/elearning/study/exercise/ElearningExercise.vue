<template>
  <div class="e-exercise">
    <div class="e-exercise-components" v-if="!loadingExercise">
      <ElearningExerciseList v-if="studyMode == studyModeDoExercise" />
<!--      <ElearningExerciseBeforeBegin v-else-if="studyMode == beforeBeginMode" />-->
      <ElearningExerciseDoExercise v-else-if="studyMode == doingMode" />
      <ElearningExerciseResults v-else-if="studyMode == reviewMode" />
    </div>

    <div class="text-center w-100 pt-md" v-if="loadingExercise">
      <app-spin />
    </div>

    <!-- <div class="e-exercise-bottom">
      <button v-if="expand" class="e-exercise-bottom__button" type="button" @click="setExpand(false)">
        <IconCropLandscape class="icon" />
      </button>
      <button v-else class="e-exercise-bottom__button" type="button" @click="setExpand(true)">
        <IconCropFree class="icon" />
      </button>
    </div> -->
  </div>
</template>

<script>
import IconCropLandscape from "~/assets/svg/v2-icons/crop_landscape_24px.svg?inline";
import IconCropFree from "~/assets/svg/v2-icons/crop_free_24px.svg?inline";

import ElearningExerciseList from "~/components/page/elearning/study/exercise/ElearningExerciseList";
// import ElearningExerciseBeforeBegin from "~/components/page/elearning/study/exercise/ElearningExerciseBeforeBegin";
import ElearningExerciseDoExercise from "~/components/page/elearning/study/exercise/ElearningExerciseDoExercise.vue";
import ElearningExerciseResults from "~/components/page/elearning/study/exercise/ElearningExerciseResults";

import { mapState } from "vuex";
import { STUDY_MODE } from "~/utils/constants";
import { ELEARNING_STUDY as ELEARNING_STUDY_MUTATION } from "~/utils/mutation-types";

export default {
  data() {
    return {
      studyModeDoExercise: STUDY_MODE.DO_EXERCISE,
      beforeBeginMode: STUDY_MODE.DO_EXERCISE_BEFORE_BEGIN,
      doingMode: STUDY_MODE.DO_EXERCISE_DOING,
      reviewMode: STUDY_MODE.REVIEW_EXERCISE_RESULT
      // loading: true,
    };
  },

  components: {
    // icons
    IconCropLandscape,
    IconCropFree,
    // components
    ElearningExerciseList,
    // ElearningExerciseBeforeBegin,
    ElearningExerciseDoExercise,
    ElearningExerciseResults
  },

  computed: {
    ...mapState("event", ["studyMode", "loadingExercise"]),
    // ...mapState("elearning/study/study", ["expand"]),
  },

  watch: {
    studyMode(_newVal) {
      console.log("[studyMode] watch", _newVal);
    }
  },

  methods: {
    // setExpand(value) {
    //   this.$store.commit(
    //     `elearning/study/study/${ELEARNING_STUDY_MUTATION.SET_EXPAND}`,
    //     value
    //   );
    // }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise.scss";
</style>
