<template>
  <div class="mb-4">
    <div v-if="showAddPoint">
      <!-- <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
        >Điểm</label
      >
      <app-input v-model="payload.points" /> -->
      <div>
        <label
          class="d-inline-block mb-3 font-weight-semi-bold"
          for="question-editor"
          >Điểm câu này</label
        >
        <div class="d-flex align-items-center justify-content-start mb-4">
          <app-input
            class="mb-0 w-150 ce-input-with-unit"
            v-model="payload.points"
          >
            <template #unit><span class="text-dark">/10</span> </template>
          </app-input>

          <p class="text-primary ml-4">
            * Một bài tập tự luận hợp lệ phải có
            <strong>tổng điểm các câu hỏi là 10</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- <label class="d-inline-block mb-3 font-weight-semi-bold" for="question-editor"
      >Nội dung câu hỏi</label
    > -->
    <div class="d-flex justify-content-between align-items-center">
      <label class="mb-3 font-weight-semi-bold" for="question-editor"
        >Nội dung câu hỏi</label
      >
      <!-- UI Upload File
      <div v-if="isUpload" class="d-flex align-items-center">
        <div>{{fileRaw.name}}</div>
        <div class="text-sub ml-2" style="font-size: 11px;">{{ fileRaw.size | fileSizeFilter}}</div>
        <button class="ml-2" @click="handleCloseUpload">
          <IconCloseSquare/>
        </button>
      </div>
      <app-upload
        @change="handleUpload"
        class="text-primary"
        style="display: inline-block;"
        :multiple="false"
        v-else
      >
        <div class="d-flex align-items-center">
          <IconCloudDownload24px class="icon fill-opacity-1 body-1 mr-2" />
          Tải lên câu hỏi
        </div>
      </app-upload>
      -->
    </div>
    <app-editor v-model="payload.content" class="mb-4" />

    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="default"
        outline
        class="font-weight-semi-bold mr-4 text-secondary"
        size="md"
        @click="$emit('cancel')"
        >Huỷ</app-button
      >
      <app-button
        color="primary"
        class="font-weight-semi-bold"
        size="md"
        @click="handleAddQuestion"
        >Lưu câu hỏi</app-button
      >
    </div>

    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      title="Tạo câu hỏi"
      description="Bạn có chắc chắn muốn tạo câu hỏi này?"
    />
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconCloudDownload24px from "~/assets/svg/v2-icons/cloud_download_24px.svg?inline";
import IconCloseSquare from "~/assets/svg/icons/close-square.svg?inline";

import CreateAnswerOfQuestion from "~/components/page/course/create/exercise/CreateAnswerOfQuestion";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadQuestion } from "~/models/course/AddCourseNoAnswer";
import { mapState } from "vuex";

export default {
  props: {
    exercise: {
      type: Object,
      default: null,
    },
  },

  components: {
    IconCloudDownload24px,
    IconCloseSquare,
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        exercise_id: get(this, "exercise.id", ""),
        type: "ESSAY",
        content: "",
        points: "",
        answers: [
          {
            correct: false,
            content: "",
          },
        ],
      },
      fileRaw: {
        name: "",
        size: "",
        file: "",
      },
      isUpload: false,
    };
  },

  mounted() {
    console.log(this.exercise);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
    ...mapState("elearning/create", {
      lesson: "lesson",
    }),
    showAddPoint() {
      return (
        get(this, "exercise.category", "") === "TEST" ||
        get(this, "exercise.required", "") === true
      );
    },
  },

  methods: {
    handleAddQuestion() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

      const payload = createPayloadQuestion(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.ADD}`,
        payload
      );

      this.handleCancel();

      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("cancel");
        const lesson_id = get(this, "lesson.id", "");
        this.$store.dispatch("elearning/create/getLesson", lesson_id);

        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancel() {
      (this.showModalConfirm = false), (this.confirmLoading = false);
    },
    handleUpload(data) {
      this.isUpload = true;
      this.fileRaw.name = data[0].name;
      this.fileRaw.size = data[0].size;
    },
    handleCloseUpload() {
      this.isUpload = false;
      this.fileRaw = {};
    },
    get,
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/course/create/_create-question-essay.scss";
</style>
