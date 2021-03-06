<template>
  <div class="post">
    <div class="post__top">
      <n-link to class="post__avatar-wrapper">
        <app-avatar
          class="post__avatar"
          :src="get(post, 'author.avatar', null)"
          :size="55"
        ></app-avatar>
      </n-link>

      <div class="post__title">
        <div class="post__title-row mb-2">
          <h5 class="post__name">
            <n-link
              :to="`/account/${get(post, 'author.id', null)}`"
            >{{ get(post, 'author.full_name', '') }}</n-link>

            <span v-if="post.label" class="font-weight-normal">
              cảm thấy {{ post.label.icon }}
              <b class="text-base">{{ post.label.des }}</b>
            </span>

            <PostTags v-if="post.tags && post.tags.length" :tags="post.tags || []" />
          </h5>
        </div>

        <div class="post__title-row">
          <n-link class="post__time" to>{{ post.created_at | moment('from') }}</n-link>
          <span class="post__share-for" :title="post.privacy ? post.privacy.desc : ''">
            <img :src="post.privacy ? post.privacy.image : ''" alt />
            <!-- <IconGlobe class="icon" /> -->
          </span>
        </div>
      </div>

      <app-dropdown
        v-if="showMenuDropdown"
        class="post__menu-dropdown"
        position="right"
        open-on-click
        v-model="menuDropdown"
      >
        <button slot="activator" slot-scope="{ on }" v-on="on" class="post__menu-dropdown__btn">
          <IconDots class="icon" />
        </button>

        <ul class="post__menu-dropdown__list">
          <li>
            <a href @click.prevent="$emit('edit', post)">Chỉnh sửa bài viết</a>
          </li>
          <li>
            <a href @click.prevent="handleClickDelete">Xoá</a>
          </li>
        </ul>
      </app-dropdown>
    </div>

    <div class="post__post">
      <div v-if="!checkEditorEmpty(post.text)" v-html="post.text" class="post__post-desc"></div>
      <!-- <a href @click.prevent class="post__post-readmore">Xem thêm</a> -->

      <slot name="media-content" :link="testJSON(post.link)  ? JSON.parse(post.link) : null" />

      <slot />
    </div>

    <div class="post__interactive">
      <div class="post__count">
        <div class="post__count-like">
          <IconFavorite class="icon heading-3 mr-3 color-primary fill-opacity-1" />
          {{ get(post, 'counter.reaction', 0) }} lượt thích
        </div>

        <div>
          <span class="post__count-comment">{{ get(post, 'counter.comment', 0) }} bình luận</span>
          <span>{{ get(post, 'counter.share', 0) }} lượt chia sẻ</span>
        </div>
      </div>

      <app-divider class="mt-3 mb-0" />

      <div class="post__actions">
        <button
          class="post__button"
          :class="{ 'active': post.is_like }"
          :disabled="btnLikeLoading"
          @click="handleClickLike"
        >
          <IconHeart class="icon" width="2.1rem" height="1.8rem" />Thích
        </button>

        <button
          class="post__button"
          :disabled="isFetchingComment"
          @click="!isCommentFetched && getComment()"
        >
          <IconBubble class="icon" width="2.1rem" height="2rem" />Bình luận
        </button>

        <button class="post__button" @click="$emit('share', post)">
          <IconShare class="icon" width="2.1rem" height="2.1rem" />Chia sẻ
        </button>
      </div>

      <template v-if="isCommentFetched">
        <app-divider class="mt-0 mb-3" />

        <div class="post__comment-list">
          <slot name="comment" v-bind="{ commentTree }"></slot>

          <div class="text-center" v-if="isFetchingComment">
            <app-spin />
          </div>

          <div class="text-center">
            <a
              v-if="commentTree.page && commentTree.page.last === false"
              href
              class="post__comment-more"
              @click.prevent="getComment"
            >Xem thêm {{ numOfViewMoreParentComment }} bình luận ...</a>
          </div>

          <div
            v-if="commentTree.comments && !commentTree.comments.length"
            class="post__comment-empty text-center text-sub"
          >Bài viết chưa có bình luận.</div>
        </div>

        <CommentEditor class="post__comment-editor my-3" @submit="postComment" />
      </template>

      <div class="text-center" v-else-if="isFetchingComment">
        <app-spin />
      </div>
    </div>
  </div>
</template>

<script>
import { get, uniqWith } from "lodash";
import CommentService from "~/services/social/comments";
import {
  BASE as ACTION_TYPE_BASE,
  SOCIAL as ACTION_TYPE_SOCIAL
} from "~/utils/action-types";
import { checkEditorEmpty } from "~/utils/validations";
import { testJSON } from "~/utils/common";
import { createComment } from "~/models/social/Comment";

const PostTags = () => import("~/components/page/timeline/post/PostTags.vue");
const CommentItem = () =>
  import("~/components/page/timeline/comment/CommentItem");
const CommentItemReplied = () =>
  import("~/components/page/timeline/comment/CommentItemReplied");
const CommentEditor = () =>
  import("~/components/page/timeline/comment/CommentEditor");

import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBubble from "~/assets/svg/icons/bubble.svg?inline";
import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconFavorite from '~/assets/svg/v2-icons/favorite_24px.svg?inline';

export default {
  components: {
    PostTags,
    CommentItem,
    CommentItemReplied,
    CommentEditor,
    IconGlobe,
    IconHeart,
    IconBubble,
    IconShare,
    IconDots,
    IconFavorite
  },

  props: {
    showMenuDropdown: Boolean,
    showComment: Boolean,
    post: {
      type: Object,
      default: () => ({
        $commentTree: {}
      }),
      validator: value =>
        [
          "id",
          "author",
          "created_at",
          "counter",
          "text",
          "type",
        ].every(key => key in value)
    }
  },

  data() {
    return {
      menuDropdown: false,
      btnLikeLoading: false,
      isFetchingComment: false,
      isCommentFetched: false,
      shareWith: 0,
      shareWithOpts: [
        { value: 0, text: "Công khai" },
        { value: 1, text: "Bạn bè" },
        { value: 3, text: "Chỉ mình tôi" }
      ]
    };
  },

  computed: {
    numOfViewMoreParentComment() {
      const { page = {} } = this.commentTree;
      return page.total_pages - page.number === 1
        ? page.total_elements - page.size * page.number
        : page.size;
    },

    commentTree() {
      return this.post.$commentTree || {};
    }
  },

  created() {
    this.showComment && this.getComment();
  },

  methods: {
    checkEditorEmpty,
    get,
    testJSON,

    handleClickDelete() {
      this.$emit("delete", this.post.post_id);
    },

    handleClickLike() {
      const cb = () => {
        this.btnLikeLoading = false;
      };
      this.$emit("like", this.post.post_id, cb);
      this.btnLikeLoading = true;
    },

    setIsFetchingComment(value = false) {
      this.isFetchingComment = value;
    },

    setIsCommentFetched(value = false) {
      this.isCommentFetched = value;
    },

    getComment() {
      this.$emit(
        "get-comment",
        this.post.post_id,
        get(this.commentTree, "page.number", 0) + 1,
        this.setIsFetchingComment,
        this.setIsCommentFetched
      );
    },

    postComment(...args) {
      this.$emit("post-comment", this.post.post_id, ...args);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post.scss";
</style>