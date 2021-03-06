<template>
  <!-- <VclFacebook v-if="loading"></VclFacebook> -->
  <div>
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h4 class="cc-panel__heading">Bài tập</h4>
      </div>

      <div class="px-4">
        <app-alert type="info" class="mt-4" show-close>
          Bạn có thể tạo bài tập cho bài giảng/ khóa học của bạn tại đây. Nếu
          bài giảng/ khóa học của bạn không yêu cầu làm bài tập, bạn có thể bỏ
          qua phần này và tiến hành gửi lên để được xét duyệt.
        </app-alert>

        <h5 v-if="get(general, 'type', '') === 'COURSE'" class="mb-3 mt-4">
          Chọn bài học liên quan
        </h5>

        <SelectLesson
          :class="{ 'pb-3': isShowButtonCreate }"
          v-if="get(general, 'type', '') === 'COURSE'"
        />
      </div>

      <div v-if="lesson" class="pb-3">
        <ButtonCreateExercise
          v-if="isShowButtonCreate"
          @handleClick="handleShowFormAdd"
          :category="category"
        />

        <AddExercise
          v-if="isShowFormAdd"
          @cancel="handleCancelAddCreate"
          :lesson="lesson"
          :category="category"
        />

        <ExerciseList
          v-for="(exercise, index) in get(lesson, 'exercises', [])"
          :key="exercise.id"
          :lesson="lesson"
          :index="index"
          :exercise="exercise"
        />
      </div>
    </div>

    <div class="create-action pt-5">
      <div class="create-action__right d-flex align-items-center">
        <app-button class="create-action__btn mr-4" @click="handleNextStep"
          ><Forward class="mr-2" /> Lưu & Tiếp tục</app-button
        >
      </div>
    </div>
    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="false"
      @ok="handleOk"
      @cancel="handleCancel"
      title="Xác nhận"
      description="Bạn có chắc chắn là đã hoàn thành việc tạo bài tập?"
    />
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import IconEditAlt from "~/assets/svg/design-icons/edit-alt.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconAlignCenterAlt from "~/assets/svg/design-icons/align-center-alt.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconClipboardNotes from "~/assets/svg/design-icons/clipboard-notes.svg?inline";
import IconPlus2 from "~/assets/svg/icons/plus2.svg?inline";
import IconDelete from "~/assets/svg/v2-icons/delete_sweep_2.svg?inline";
import IconSave from "~/assets/svg/v2-icons/save_24px.svg?inline";
import Forward from "~/assets/svg/v2-icons/forward_2.svg?inline";
import { VclFacebook } from "vue-content-loading";
import ButtonCreateExercise from "~/components/page/course/create/exercise/ButtonCreateExercise";
import AddExercise from "~/components/page/course/create/exercise/AddExercise";
import ExerciseList from "~/components/page/course/create/exercise/ExerciseList";
import SelectLesson from "~/components/page/course/create/exercise/SelectLesson";
import CreateAction from "~/components/page/course/create/common/CreateAction";
import * as actionTypes from "~/utils/action-types";
import { getParamQuery, useEffect } from "~/utils/common";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    IconInfoCircle,
    IconAngleDown,
    IconEditAlt,
    IconTrashAlt,
    IconAlignCenterAlt,
    IconFileCheck,
    IconClipboardNotes,
    CreateAction,
    ButtonCreateExercise,
    AddExercise,
    ExerciseList,
    SelectLesson,
    IconPlus2,
    IconAngleDown,
    IconDelete,
    IconDelete,
    Forward,
    IconSave,
    VclFacebook,
  },

  mounted() {
    useEffect(this, this.handleChangeGeneral.bind(this), [
      "general",
      "lessons",
    ]);
  },

  data() {
    return {
      isShowButtonCreate: true,
      isShowFormAdd: false,
      category: "EXERCISE",
      loading: false,
      showModalConfirm: false,
    };
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
      lessons: "lessons",
      progress: "progress",
    }),
    disabled_all() {
      return this.$store.getters["elearning/create/disabled_all"];
    },
    name() {
      return get(this, "general.type", "") === "COURSE"
        ? "khoá học"
        : "bài giảng";
    },
  },

  methods: {
    handleCancel() {
      if (this.disabled_all) return;
      this.showModalConfirm = false;
    },

    handleOk() {
      if (this.disabled_all) return;
      this.showModalConfirm = false;
      this.$emit("nextStep", "exam");
    },

    async handleChangeGeneral() {
      if (get(this, "general.type", "") === "LECTURE") {
        this.loading = true;
        const lesson_id = get(this, "lessons.0.id", "");
        await this.$store.dispatch("elearning/create/getLesson", lesson_id);
        this.loading = false;
        return;
      }
      this.$store.dispatch("elearning/create/getLesson", "");
    },

    handleShowFormAdd() {
      if (this.disabled_all) return;
      this.isShowButtonCreate = false;
      this.isShowFormAdd = true;
    },

    handleCancelAddCreate() {
      if (this.disabled_all) return;
      this.isShowButtonCreate = true;
      this.isShowFormAdd = false;
    },

    handleNextStep() {
      if (this.disabled_all) {
        this.$toasted.error(`${this.name} đã đăng, không được phép sửa`);
        return;
      }
      this.showModalConfirm = true;
    },

    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-exercise.scss";
</style>
