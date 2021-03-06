<template>
  <div class="post-editor" :class="classes" @click="showOverlay && setActive(true)">
    <div v-if="showOverlay" class="post-editor__overlay" @click.stop="localActive = false"></div>
    <div class="post-editor__components" @click.self="editor.focus()">
      <app-avatar
        class="post-editor__avatar"
        :src="avatarUser && avatarUser.low ? avatarUser.low : null"
        :size="55"
      />

      <div class="post-editor__right">
        <client-only>
          <div class="post-editor__editor editor">
            <editor-content :editor="editor" />

            <div class="suggestion-list" v-show="hasResults" ref="suggestions">
              <div
                v-for="(user, index) in mentionList"
                :key="user.id"
                class="suggestion-list__item"
                :class="{ 'is-selected': mentionNavigatedIndex === index }"
                @click="selectUser(user)"
              >
                <app-avatar
                  class="mr-3"
                  :size="32"
                  :src="(user.avatar && user.avatar.low) ? user.avatar.low : null"
                />
                {{ user.fullname }}
              </div>

              <infinite-loading :identifier="mentionInfiniteId" @infinite="mentionInfiniteHandler">
                <div slot="no-more" class="text-sub py-3">Không còn dữ liệu</div>
                <div
                  slot="no-results"
                  class="text-sub py-3"
                >Không tìm thấy "{{ mentionQuery.name }}"</div>
              </infinite-loading>
            </div>
          </div>
        </client-only>

        <PostEditorUpload
          v-show="fileList.length"
          :mode="mode"
          :fileList="fileList"
          :previewList="previewList"
          @remove-item="removeUploadItem"
          @change="handleUploadChange"
        />

        <div class="post-editor__tagger-summary">
          <!-- LABEL -->
          <template v-if="label !== null">
            cảm thấy
            <b>{{ getLabelText() }}</b>
          </template>
          <!-- END LABEL -->

          <!-- TAG -->
          <template v-if="listTag.length">
            cùng với
            <n-link
              class="font-weight-bold"
              :to="`/account/${listTag[0].id}`"
            >{{ selectedTags[0].text }}</n-link>

            <template v-if="listTag.length > 1">
              và
              <n-link
                v-if="listTag.length === 2"
                class="font-weight-bold"
                :to="`/account/${listTag[1].id}`"
              >{{ selectedTags[1].text }}</n-link>

              <app-dropdown v-else>
                <b slot="activator">{{ listTag.slice(1).length }} người khác.</b>
                <div
                  v-for="item in selectedTags.slice(1)"
                  :key="item.value"
                  class="px-3 py-2"
                  style="white-space: nowrap;"
                >
                  <a :href="`/account/${item.id}`" target="_blank">{{ item.text }}</a>
                </div>
              </app-dropdown>
            </template>
          </template>
          <!-- END TAG -->

          <!-- CHECK IN -->
          <template v-if="checkin !== null">
            tại
            <b>
              <n-link to>{{ selectedCheckin }}</n-link>
            </b>
          </template>
          <!-- END CHECK IN -->
        </div>

        <div v-if="linkDataFetching" class="text-center text-sub caption py-5">
          <template v-if="linkDataFetchError">Không thể tải bản xem trước.</template>
          <template v-else>Đang tìm nạp bản xem trước</template>
        </div>
        <div v-else-if="!linkDataFetching && linkDataFetched" class="post-editor__preview-link">
          <a href class="post-editor__preview-link__remove" @click.prevent="removePreviewLink">
            <IconTimes class="icon" />
          </a>

          <app-content-box
            tag="a"
            target="_blank"
            class="mb-4"
            size="md"
            :href="link.url"
            :image="link.image"
            :title="link.title"
            :desc="link.description"
            :meta-footer="link.siteName"
          />
        </div>

        <div v-show="showTags">
          <app-select
            mode="tags"
            class="post-editor__select"
            placeholder="Cùng với ai?"
            style="width: 100%"
            :emptyMessage="null"
            :options="tagOptions"
            v-model="listTag"
            @visible-change="handleFriendsVisibleChange"
            @search="searchFriends"
          >
            <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
              <app-avatar
                :src="option.avatar && option.avatar.low ? option.avatar.low : null"
                size="sm"
                class="mr-3"
              ></app-avatar>
              {{ option.text }}
            </div>

            <client-only slot="options-append">
              <infinite-loading :identifier="friendsInfiniteId" @infinite="friendsInfiniteHandler">
                <div slot="no-more" class="text-sub py-3">Không còn dữ liệu</div>
              </infinite-loading>
            </client-only>
          </app-select>
          <app-divider class="ma-0" />
        </div>

        <div class="post-editor__toolbar">
          <button class="post-editor__toolbar-button image" @click="handleClickUploadImage">
            <IconAddPhotoAlternate class="icon" />
            <span>Ảnh / Video</span>
          </button>
          <button class="post-editor__toolbar-button tag" @click="showTags = !showTags">
            <IconGroup class="icon" />
            <span>Gắn thẻ bạn bè</span>
          </button>
          <app-dropdown class="post-editor__label-dropdown" open-on-click v-model="labelDropdrown">
            <button
              slot="activator"
              slot-scope="{ on }"
              class="post-editor__toolbar-button emoji"
              v-on="on"
            >
              <IconSentimentSatisfied class="icon" />
              <span>Cảm xúc / Hoạt động</span>
            </button>

            <ul class="post-editor__status-list">
              <li
                v-for="item in labelList"
                :key="item.id"
                :class="{ 'active': label === item.id }"
                @click="handleClickLabel(item.id)"
              >
                <i class="mr-4">{{ item.icon }}</i>
                <span>{{ item.des }}</span>
              </li>
            </ul>
          </app-dropdown>
        </div>

        <div class="post-editor__privacy">
          <span class="post-editor__privacy-label">Chế độ đăng tin</span>
          <app-select
            v-model="privacy"
            bordered
            class="post-editor__select-private"
            :options="configPrivacyLevels.map(item => ({
              ...item,
              text: item.name
            }))"
            size="sm"
          >
            <template slot="prepend" slot-scope="{ selected }">
              <img class="d-block" :src="selected.image" />
            </template>
          </app-select>
        </div>

        <app-button
          class="post-editor__submit"
          :disabled="!submitable"
          full-width
          square
          @click.stop="submit"
        >Đăng tin</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import tippy from "tippy.js";
import "tippy.js/themes/light.css";
import { isEmpty, debounce, uniqWith } from "lodash";
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent, Extension } from "tiptap";
import { Placeholder, Mention, HardBreak, History } from "tiptap-extensions";

import { getBase64, isValidUrl } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { checkEditorEmpty } from "~/utils/validations";
import { PasteHandler } from "~/utils/tiptap-plugins";
import { createPostLink } from "~/models/post/PostLink";
import FriendService from "~/services/social/friend";
import ScraperService from "~/services/social/scraper";

import PostEditorUpload from "~/components/page/timeline/postEditor/PostEditorUpload";
import IconTimes from "~/assets/svg/design-icons/times.svg?inline";

import IconAddPhotoAlternate from "~/assets/svg/v2-icons/add_photo_alternate_24px.svg?inline";
import IconGroup from "~/assets/svg/v2-icons/group_24px.svg?inline";
import IconSentimentSatisfied from "~/assets/svg/v2-icons/sentiment_satisfied_24px.svg?inline";

export default {
  components: {
    PostEditorUpload,
    IconAddPhotoAlternate,
    IconGroup,
    IconSentimentSatisfied,
    IconTimes,
    EditorContent
  },

  props: {
    active: Boolean,
    prefetch: Boolean,
    showOverlay: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    initialValues: {
      post_id: Number,
      content: String,
      link: String,
      post_image: Array,
      list_tag: Array,
      check_in: Object,
      privacy: Number,
      label_id: Number,
      default: () => ({
        post_id: null,
        content: "",
        link: "",
        post_image: [],
        list_tag: [],
        check_in: null,
        privacy: 8,
        label_id: null
      })
    }
  },

  data() {
    return {
      editor: null,
      showTags: false,
      previewList: this.initialValues.post_image.map(item =>
        item.link && item.link.low ? item.link.low : null
      ),
      labelDropdrown: false,
      localActive: false,
      friendsInfiniteId: +new Date(),
      friendsListQuery: {
        page: 1
      },
      friendsList: [],
      tmpTagOptions: [],

      // Form submit data
      content: this.initialValues.content,
      link: this.initialValues.link
        ? JSON.parse(this.initialValues.link)
        : null,
      fileList: this.initialValues.post_image,
      listTag: this.initialValues.list_tag,
      checkin: this.initialValues.check_in,
      privacy: this.initialValues.privacy,
      label: this.initialValues.label_id,

      // Submit edit data
      deleteImgId: [],

      // Fetch link data
      linkDataFetching: false,
      linkDataFetched: false,
      linkDataFetchError: false,

      // Mention data
      mentionQuery: {
        page: 1,
        name: null
      },
      mentionList: [],
      mentionNavigatedIndex: 0,
      mentionPopup: null,
      mentionSuggestionRange: null,
      insertMention: () => {},
      mentionInfiniteId: +new Date() + 9999
    };
  },

  computed: {
    ...mapState("social", { labelList: "labels" }),
    ...mapGetters("social", ["configPrivacyLevels"]),
    ...mapGetters("auth", ["avatarUser"]),

    classes() {
      return {
        active: this.localActive,
        "post-editor--has-overlay": this.showOverlay
      };
    },

    selectedTags() {
      return this.listTag.map(item => {
        const [resultItem = {}] = this.tmpTagOptions.filter(
          i => i.value === item
        );
        return resultItem;
      });
    },

    tagOptions() {
      return this.friendsList.map(item => ({
        ...item,
        value: item.id,
        text: item.fullname
      }));
    },

    submitable() {
      const conditions = [
        !checkEditorEmpty(this.content),
        this.fileList.length > 0,
        this.label !== null,
        this.checkin !== null
      ];
      return conditions.find(c => !!c) ? true : false;
    },

    hasResults() {
      return this.mentionList && this.mentionList.length
        ? this.mentionList.length
        : 0;
    }
  },

  created() {
    this.prefetch && this.getFriends();
  },

  mounted() {
    if (process.server) return;

    this.editor = new Editor({
      content: this.content,
      extensions: [
        new HardBreak(),
        // Make press enter = insert hard break
        new (class extends Extension {
          keys() {
            return {
              Enter(state, dispatch, view) {
                const { schema, doc, tr } = view.state;

                const hard_break = schema.nodes.hard_break;
                const transaction = tr
                  .replaceSelectionWith(hard_break.create())
                  .scrollIntoView();
                view.dispatch(transaction);
                return true;
              }
            };
          }
        })(),
        new History(),
        new Placeholder({
          showOnlyCurrent: true,
          showOnlyWhenEditable: true,
          emptyNodeText: "Đăng bài viết..."
        }),
        new PasteHandler({
          onPaste: this.handleEditorPaste
        }),
        new Mention({
          // a list of all suggested items
          items: this.friendsList,
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            this.mentionQuery.name = query;
            this.mentionSuggestionRange = range;
            this.renderPopup(virtualNode);
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            this.insertMention = command;
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            this.mentionQuery.name = query;
            this.mentionSuggestionRange = range;
            this.mentionNavigatedIndex = 0;
            !this.mentionPopup && this.renderPopup(virtualNode);
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            this.mentionQuery = {
              page: 1,
              name: null
            };
            this.mentionList = [];
            //
            this.mentionSuggestionRange = null;
            this.mentionNavigatedIndex = 0;
            this.destroyPopup();
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            // pressing up arrow
            if (event.key === "ArrowUp") {
              this.upHandler();
              return true;
            }
            // pressing down arrow
            if (event.key === "ArrowDown") {
              this.downHandler();
              return true;
            }
            // pressing enter
            if (event.key === "Enter") {
              this.enterHandler();
              return true;
            }
            return false;
          }
          // is called when a suggestion has changed
          // this function is optional because there is basic filtering built-in
          // you can overwrite it if you prefer your own filtering
          // onFilter: (items, query) => {
          // }
        })
      ],
      onUpdate: ({ getHTML }) => {
        this.content = getHTML();
      }
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  watch: {
    active(newValue) {
      this.localActive = newValue;
    },

    localActive(newValue) {
      this.$emit("active-change", newValue);
    },

    "mentionQuery.name": debounce(async function(newValue) {
      this.mentionList = [];
      this.mentionQuery.page = 1;

      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.mentionQuery
      });
      if (data.listFriend && data.listFriend.length) {
        newValue !== null && (this.mentionInfiniteId += 1);
        this.mentionQuery.page += 1;
        this.mentionList = this.mentionList.concat(data.listFriend);
      } else {
        this.$toasted.error(data.message);
      }
    }, 300),

    tagOptions(newValue) {
      if (!newValue.length) return;
      const tmp = this.tmpTagOptions.concat(newValue);
      this.tmpTagOptions = uniqWith(tmp, (a, b) => a.value === b.value);
    }
  },

  methods: {
    setActive(value) {
      this.localActive = value;
    },

    getLabelText() {
      const [labelObj = {}] = this.labelList.filter(
        item => item.id === this.label
      );

      return "icon" in labelObj && "des" in labelObj
        ? `${labelObj.icon} ${labelObj.des}`
        : "";
    },

    removeUploadItem(index, image) {
      this.fileList = this.fileList
        .slice(0, index)
        .concat(this.fileList.slice(index + 1, this.fileList.length));
      this.previewList = this.previewList
        .slice(0, index)
        .concat(this.previewList.slice(index + 1, this.previewList.length));

      if (this.mode === "edit") {
        const isInitialImage = ["file_id", "link", "post_id"].every(
          key => key in image
        );
        isInitialImage &&
          (this.deleteImgId = [...this.deleteImgId, image.post_id]);
      }
    },

    handleUploadChange(event) {
      // push to list
      Array.from(event.target.files).forEach(file => {
        if (this.fileList.length >= 6) {
          this.$toasted.error("1 bài viết chỉ cho phép tối đa 6 ảnh.");
          return;
        }
        // if is preview a link -> remove that. Post prefer image than link
        !isEmpty(this.link) && this.removePreviewLink();

        this.fileList = [...this.fileList, file];
        getBase64(file, fileSrc => {
          this.previewList.push(fileSrc);
        });
      });
    },

    handleClickUploadImage() {
      this.$children[0].handleClickControl();
    },

    handleClickLabel(id) {
      this.label === id ? (this.label = null) : (this.label = id);
      this.labelDropdrown = false;
    },

    async getFriends(name = "") {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: {
          ...this.friendsListQuery,
          name
        }
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
      } else {
        this.$toasted.error(data.message);
      }
    },

    async friendsInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.friendsListQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    searchFriends: debounce(async function(name) {
      this.friendsList = [];
      this.friendsListQuery.page = 1;
      await this.getFriends(name);
    }, 300),

    handleFriendsVisibleChange(isVisible) {
      if (isVisible) {
        this.friendsList = [];
        this.friendsInfiniteId += 1;
      } else {
        this.friendsListQuery.page = 1;
      }
    },

    /**
     * Submit data
     */
    submit() {
      const params = {
        content: this.editor.getHTML(),
        link: !isEmpty(this.link) ? JSON.stringify(this.link) : null,
        post_image: this.fileList.filter(file =>
          ["link", "post_id", "file_id"].every(key => key in file)
            ? false
            : true
        ),
        list_tag: this.listTag.filter(
          item => !this.initialValues.list_tag.includes(item)
        ),
        check_in: this.checkin,
        privacy: this.privacy,
        label_id: this.label
      };

      if (this.mode === "edit") {
        params.post_id = this.initialValues.post_id;
        params.delete_img_id = this.deleteImgId;
        params.list_tag_del = this.initialValues.list_tag.filter(
          item => !this.listTag.includes(item)
        );
      }

      this.$emit("submit", params, this.clear);
    },

    /**
     * Clear editor data after emit 'submit' event
     */
    clear() {
      this.editor.setContent("");
      this.removePreviewLink();
      this.fileList = [];
      this.previewList = [];
      this.listTag = [];
      this.checkin = null;
      this.privacy = 15;
      this.label = null;
    },

    /**
     * Paste handler
     */
    handleEditorPaste(view, event, slice) {
      const { clipboardData } = event;

      if (clipboardData.files && clipboardData.files.length) {
        // Handle paste file here
        return;
      }

      // Handle paste text
      const text = clipboardData.getData("text");
      const isUrl = isValidUrl(text);

      // If paste text is a string url
      if (isUrl) {
        // If no image in post and had not been fetched any link
        !this.fileList.length && !this.linkDataFetched && this.fetchLink(text);
      }
    },

    async fetchLink(url) {
      try {
        this.linkDataFetching = true;

        const getInfo = await new ScraperService(this.$axios)[
          ACTION_TYPE_BASE.ADD
        ]({
          link: url
        });

        this.linkDataFetching = false;
        this.linkDataFetched = true;

        if (getInfo.success) {
          if (getInfo.data && getInfo.data.success) {
            const {
              ogTitle,
              ogType,
              ogUrl,
              ogSiteName,
              ogDescription,
              ogImage = {},
              ogVideo = {}
            } = getInfo.data.data;
            const linkModel = createPostLink({
              type: ogType,
              url: ogUrl,
              siteName: ogSiteName,
              title: ogTitle,
              description: ogDescription,
              updatedTime: null,
              image: ogImage.url,
              imageWidth: ogImage.width,
              imageHeight: ogImage.height,
              videoUrl: ogVideo.url,
              videoSecureUrl: ogVideo.secureUrl,
              videoType: ogVideo.type,
              videoWidth: ogVideo.width,
              videoHeight: ogVideo.height,
              videoTag: ogVideo.tag
            });
            this.link = linkModel;
          }
        }
      } catch (error) {
        this.linkDataFetchError = true;
      }
    },

    removePreviewLink() {
      this.linkDataFetchError = false;
      this.linkDataFetched = false;
      this.link = null;
    },

    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.mentionNavigatedIndex =
        (this.mentionNavigatedIndex + this.mentionList.length - 1) %
        this.mentionList.length;
    },

    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.mentionNavigatedIndex =
        (this.mentionNavigatedIndex + 1) % this.mentionList.length;
    },

    enterHandler() {
      const user = this.mentionList[this.mentionNavigatedIndex];
      if (user) {
        this.selectUser(user);
      }
    },

    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.insertMention({
        range: this.mentionSuggestionRange,
        attrs: {
          id: user.id,
          label: user.fullname
        }
      });
      this.editor.focus();
    },

    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.mentionPopup) {
        return;
      }
      this.mentionPopup = tippy(node, {
        content: this.$refs.suggestions,
        trigger: "mouseenter",
        interactive: true,
        theme: "light",
        placement: "bottom-start",
        inertia: true,
        duration: [400, 200],
        showOnInit: true,
        arrow: true,
        // arrowType: "round",
        onHidden: instance => {
          this.destroyPopup();
        }
      });
      // we have to update tippy whenever the DOM is updated
      if (MutationObserver) {
        this.observer = new MutationObserver(() => {
          this.mentionPopup.popperInstance.scheduleUpdate();
        });
        this.observer.observe(this.$refs.suggestions, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    },

    destroyPopup() {
      if (this.mentionPopup) {
        this.mentionPopup.destroy();
        this.mentionPopup = null;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    },

    async mentionInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.mentionQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.mentionQuery.page += 1;
        this.mentionList = this.mentionList.concat(data.listFriend);
        $state.loaded();
      } else if (this.mentionList.length) {
        $state.loaded();
        $state.complete();
      } else {
        $state.complete();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/timeline/_suggestion-list.scss";
@import "~/assets/scss/components/post-editor/_post-editor.scss";
</style>