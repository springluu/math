<template>
  <div class="the-header" v-sticky :sticky-z-index="100">
    <div class="the-header__content">
      <div class="the-header__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>

      <app-search class="the-header__search" v-model="valueInput" @submit="handleInput" :button-props="{ color: 'default' }" bordered placeholder="Nhập để tìm kiếm" />

      <ul class="the-header__menu">
        <li>
          <n-link to="/coming-soon">Dòng thời gian</n-link>
        </li>
        <li>
          <n-link to="/elearning">E-learning</n-link>
        </li>
        <li>
          <n-link to="/school">Trường học</n-link>
        </li>
      </ul>
      <div v-if="isAuthenticated" class="the-header__user">
        <study-space />

        <n-link class="item" to="/coming-soon">
          <IconCommentAltMessage />
          <!-- <span class="number">9</span> -->
        </n-link>
        <n-link class="item" to="/payment/cart">
          <IconShoppingCart24px class="fill-gray" />
          <span
            v-if="get(cartCheckout, 'orders.length', 0)"
            class="number"
          >{{ get(cartCheckout, "orders.length", 0) }}</span>
        </n-link>
        <!--
        <app-dropdown
          position="right"
          v-model="dropdownNotify"
          :content-width="'580px'"
          open-on-click
          class="link--dropdown link--dropdown-auth item p-0"
          @visible-change="handleVisibleChange"
        >
          <button class="item" slot="activator" slot-scope="{ on }" v-on="on">
            <IconNotifications24px class="fill-gray" />
            <span class="number" v-if="notiUnread > 0">{{ notiUnread }}</span>
          </button>
          <div class="link--dropdown__content">
            <ul>
              <li>
                <div class="d-flex">
                  <h6>Thông báo</h6>
                  <div class="ml-auto">
                    <n-link
                      class="text-primary"
                      to
                      @click.native="unreadAll"
                    >Đánh dấu tất cả đã đọc</n-link>
                    <n-link class="ml-3 text-primary" to="/account/info/setting">Cài đặt</n-link>
                  </div>
                </div>
              </li>
            </ul>
            <ul style="overflow-y: auto; max-height:400px" id="ul-noti" ref="ulNoti">
              <li
                v-for="(item, index) in notis && notis.listNotification
                  ? notis.listNotification
                  : []"
                :key="index"
                class="p-0"
              >
                <n-link to>
                  <div :class="item && item.is_read == 1 ? 'readed' : ''">
                    <div class="wrapitemnotify">
                      <app-avatar
                        :src="
                          item && item.image && item.image.low
                            ? item.image.low
                            : 'https://picsum.photos/60/60'
                        "
                      />
                      <div class="text-gray ml-3">
                        <p>{{ item && item.meta_data }}</p>
                        <p>{{ item && item.created_at | moment("from") }}</p>
                      </div>
                      <div class="d-flex flex-column align-items-center pl-3 ml-auto btn-hover">
                        <button
                          class="cc-box__btn cc-box__btn-edit"
                          v-tooltip.bottom="{
                            content: 'Xóa thông báo',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconTrashAlt class="icon fill-disabled" />
                        </button>
                        <button
                          class="cc-box__btn cc-box__btn-edit mt-2"
                          v-if="item && item.is_read == 0"
                          @click.prevent="handleReadNotify(item.id)"
                          v-tooltip.bottom="{
                            content: 'Đánh dấu đã đọc',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconEllipse class="d-block fill-gray" />
                        </button>
                        <button
                          class="cc-box__btn cc-box__btn-edit mt-2"
                          v-else
                          @click.prevent="handleReadNotify(item.id)"
                          v-tooltip.bottom="{
                            content: 'Đánh dấu chưa đọc',
                            classes: ['tooltipAnnouncenment'],
                          }"
                        >
                          <IconEllipseAlt class="d-block fill-gray" />
                        </button>
                      </div>
                    </div>
                  </div>
                </n-link>
              </li>
              <client-only>
                <infinite-loading v-if="dropdownNotify" @infinite="notiInfiniteHandler">
                  <template slot="no-more">Không còn thông báo.</template>
                </infinite-loading>
              </client-only>
            </ul>
          </div>
        </app-dropdown>
        -->
        <notification/>
        <user-header />
      </div>

      <div v-else class="d-flex">
        <app-button size="sm" color="white" nuxt to="/auth/signup" class="btn-signup__header">Đăng ký</app-button>
        <app-button size="sm" nuxt to="/auth/signin" class="btn-signin__header">Đăng nhập</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconGlobeNoti from "~/assets/svg/icons/globe-noti.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconNotifications24px from "~/assets/svg/v2-icons/notifications_24px.svg?inline";
import IconShoppingCart24px from "~/assets/svg/v2-icons/shopping_cart_24px.svg?inline";
import IconCommentAltMessage from "~/assets/svg/design-icons/comment-alt-message.svg?inline";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import AnnoucementItem from "~/components/page/account/Info/AnnouncementItem";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconEllipseAlt from "~/assets/svg/icons/ellipse-alt.svg?inline";
import IconEllipse from "~/assets/svg/icons/ellipse.svg?inline";
import Notifications from "~/services/notification/notifications";
import * as actionTypes from "~/utils/action-types";
import { get, isEmpty } from "lodash";
import { UPDATE_NOTI, USER_ROLES } from "~/utils/constants";
import { detectBrowser } from "~/utils/common";
import { PARAM_CHECK, FETCH_SIZE, SOCIAL, ELEARNING } from "../../../utils/config";

export default {
  components: {
    Logo,
    IconSearch,
    IconGlobeNoti,
    IconCaretDown,
    IconNotifications24px,
    IconShoppingCart24px,
    IconCommentAltMessage,
    AnnoucementItem,
    IconTrashAlt,
    IconEllipseAlt,
    IconEllipse
  },

  data: () => ({
    valueInput: '',
    showLogin: false,
    dropdownAuth: false,
    dropdownCourse: false,
    dropdownNotify: false,
    readAnnouncenment: true,
    read: false,
    notiList: [],
    infiniteId: +new Date(),
    checkPayload: false
  }),
  computed: {
    ...mapState("notifications", ["notis", "notiUnread"]),
    ...mapGetters("auth", ["isAuthenticated", "isStudentRole"]),
    ...mapGetters("cart", ["cartCheckout"]),
    ...mapState("keyword", ["keywordSearchHeader", "checkRouteClearKeyword"]),
    ...mapState("elearning/study/notifications", [
      "countNotiElearning",
      "countNotiSocial",
    ]),
  },
  watch: {
    keywordSearchHeader(newValue){
      if(!newValue){
        this.valueInput = '';
      }else{
        const paramCheck = this.$route.path;
        if(paramCheck == PARAM_CHECK.SCHOOL){
          this.$router.push(`/school/search`)
        }else if(paramCheck != PARAM_CHECK.ELEARNING_SEARCH && paramCheck != PARAM_CHECK.SOCIAL && paramCheck != PARAM_CHECK.SCHOOL_SEARCH){
          this.$router.push(`/elearning/search?subject=&type=&sort=`)
        }
      }
    },
    checkRouteClearKeyword(newValue){
      if(newValue != PARAM_CHECK.ELEARNING_SEARCH && newValue != PARAM_CHECK.SOCIAL && newValue != PARAM_CHECK.SCHOOL_SEARCH){
        this.valueInput = '';
      }
    },
  },
  mounted() {
    if(this.checkRouteClearKeyword == PARAM_CHECK.ELEARNING_SEARCH){
      this.valueInput = this.keywordSearchHeader;
    }
    this.$fireMess && this.$fireMess.onMessage(payload => {
      console.log("Message received. ", payload);
      // const data = {
      //   ...payload.data,
      //   is_read: 0,
      //   meta_data: payload.notification.body
      // };
      // this.reviceNoti(data);
      // payload.data.service_type && this.checkSumCountNoti(payload.data.service_type);
      // this.socialNotifications({
      //   params: {
      //     page: 1,
      //     payloadCheck: "check"
      //   }
      // });
      // this.checkPayload = true;
    });
    console.log("detectBrowser", detectBrowser());
    this.isAuthenticated && this.cartList();
  },
  created() {
    // this.isAuthenticated && this.getNotiUnread();
    this.isAuthenticated && this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: ELEARNING
    });
    this.isAuthenticated && this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: SOCIAL
    });
    this.isAuthenticated && this.getCountNotifications({
        service_type: ELEARNING
    });
    this.isAuthenticated && this.getCountNotifications({
        service_type: SOCIAL
    });
  },
  methods: {
    get,
    ...mapActions('elearning/study/notifications', ['getNotifications', 'getCountNotifications']),
    ...mapMutations("auth", ["removeToken"]),
    ...mapMutations('keyword', ['searchHeader']),
    ...mapMutations("notifications", ["reviceNoti", "commitNotiUnread"]),
    ...mapActions("notifications", [
      "socialNotifications",
      "readNotification",
      "getNotiUnread"
    ]),
    ...mapMutations("elearning/study/notifications", [
      "setCountNotiElearning",
      "setCountNotiSocial",
      "setCheckFireBase"
    ]),
    ...mapActions("cart", ["cartList"]),
    handleInput(_value){
      this.valueInput = _value;
      this.searchHeader(_value);
    },
    redirectSignin() {
      this.$router.push("/auth/signin");
    },
    handleLogout() {
      this.removeToken();
      this.redirectSignin();
    },
    // Handle read/unread 1 noti
    handleReadNotify(id) {
      const params = {
        update: UPDATE_NOTI.ONLY_ONE,
        notification_id: id
      };
      this.readNotification(params).then(result => {
        if (result.success == true) {
        }
      });
    },
    // Handle unread all noti
    unreadAll() {
      const params = {
        update: UPDATE_NOTI.ALL
      };
      this.readNotification(params).then(result => {
        if (result.success == true) {
        }
      });
    },
    handleVisibleChange(isvisible) {
      // console.log("this.$refs", this.$refs);
      if (isvisible && this.checkPayload) {
        this.$refs.ulNoti.scrollTop = 0;
        this.checkPayload = false;
      }

      // if isvisible noti == true and number noti > 0
      if (isvisible && this.notiUnread > 0) {
        this.commitNotiUnread(0);
      }
    },
    async notiInfiniteHandler($state) {
      const getData = await this.$store.dispatch(
        `notifications/${actionTypes.SOCIAL_NOTIFICATIONS.LIST}`,
        {
          params: {
            page: get(this, "notis.page.number", 0) + 1
          }
        }
      );
      console.log("getData", getData);
      if (getData.success && !isEmpty(getData.data)) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    checkSumCountNoti(_type){
      this.setCheckFireBase(true);
      if(_type == SOCIAL){
          const countSocial = parseInt(this.countNotiSocial) + 1
          this.setCountNotiSocial(countSocial)
      }else{
          const countElearning = parseInt(this.countNotiElearning) + 1
          this.setCountNotiElearning(countElearning)
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/the-header/_the-header.scss";
@import "~/assets/scss/components/account/_account-info-announcement-item.scss";
</style>
